//
// companion-module-generic-showswitcher module for BitFocus Companion
// by Larry Seyer
// bitfocus@larryseyer.com
// http://LarrySeyer.com
// https://github.com/larryseyer/companion-module-generic-showswitcher
//

import { InstanceBase, runEntrypoint, InstanceStatus } from '@companion-module/base'
import { getActions } from './actions.js'
import { getFeedbacks } from './feedbacks.js'
import { getVariableDefinitions } from './variables.js'
import { getPresets } from './presets.js'
import { upgrades } from './upgrades.js'
import { MidiHandler } from './midi.js'

class ShowSwitcherInstance extends InstanceBase {
	constructor(internal) {
		super(internal)

		// Initialize state
		this.cameraSwitcher = {
			isRunning: false,
			countdown: 0,
			nextButtonIndex: -1,
			previousButton: 'None',
			triggerCount: 0,
			timer: null,
			minSeconds: 15,
			maxSeconds: 30,
			buttons: [],
			history: [], // Track last N button presses
			blacklist: [], // Temporarily exclude buttons
			lastTriggerTime: null,
			averageInterval: 0, // Track average time between triggers
			sequentialMode: false, // Alternative to random mode
			sequentialIndex: 0,
		}

		this.overlaySwitcher = {
			isRunning: false,
			countdown: 0,
			nextButtonIndex: -1,
			previousButton: 'None',
			triggerCount: 0,
			timer: null,
			minSeconds: 600,
			maxSeconds: 900,
			buttons: [],
			history: [],
			blacklist: [],
			lastTriggerTime: null,
			averageInterval: 0,
			sequentialMode: false,
			sequentialIndex: 0,
		}

		this.systemState = {
			isRunning: false,
			startTime: null,
			activeDuration: 0,
			totalRuntime: 0, // Persistent across sessions
			lastStopTime: null,
			sessionCount: 0, // Track number of start/stop cycles
			isPaused: false, // New paused state
			pauseStartTime: null,
			totalPausedTime: 0,
		}

		// Performance monitoring
		this.performance = {
			httpErrors: 0,
			httpSuccesses: 0,
			lastHttpError: null,
			averageResponseTime: 0,
			buttonPressQueue: [], // Queue for button presses to prevent overwhelming
			isProcessingQueue: false,
		}

		// Scheduling features
		this.scheduling = {
			schedules: [], // Array of scheduled events
			nextScheduledEvent: null,
		}

		this.pollingInterval = null
		this.midiHandler = null
		this.midiPorts = []
		this.midiPortChoices = [{ id: -1, label: 'None - Select a MIDI port' }]

		// Auto-save timer for statistics
		this.autoSaveInterval = null
		this.statsFile = 'showswitcher_stats.json'
	}

	async init(config) {
		this.config = config
		this.updateStatus(InstanceStatus.Connecting)

		// Load persistent statistics
		await this.loadStatistics()

		// Initialize MIDI handler early to populate port list
		try {
			this.midiHandler = new MidiHandler(this)
			await this.midiHandler.refreshPorts()
		} catch (error) {
			this.log('debug', `Early MIDI port detection: ${error.message}`)
		}

		// Test HTTP connection
		await this.testHTTPConnection()

		// Parse button lists from configuration
		this.parseButtonLists()

		// Initialize module components
		this.updateActions()
		this.updateFeedbacks()
		this.updateVariableDefinitions()
		this.updatePresets()
		this.initVariables()

		// Start polling for timer updates
		this.startPolling()

		// Start auto-save interval for statistics
		this.startAutoSave()

		// Initialize MIDI connection if enabled
		if (this.config.midi_enabled && this.midiHandler) {
			try {
				await this.midiHandler.init(this.config)
			} catch (error) {
				this.log('error', `Failed to initialize MIDI: ${error.message}`)
			}
		}

		// Initialize button press queue processor
		this.startQueueProcessor()

		this.log('info', 'Show Switcher module v2.0.5 initialized with enhanced features')
	}

	async destroy() {
		this.log('debug', 'Destroying Show Switcher instance')

		// Save statistics before shutdown
		await this.saveStatistics()

		// Stop all timers
		this.stopCameraSwitcher()
		this.stopOverlaySwitcher()

		// Clear intervals
		if (this.pollingInterval) {
			clearInterval(this.pollingInterval)
			this.pollingInterval = null
		}

		if (this.autoSaveInterval) {
			clearInterval(this.autoSaveInterval)
			this.autoSaveInterval = null
		}

		// Destroy MIDI handler
		if (this.midiHandler) {
			this.midiHandler.destroy()
			this.midiHandler = null
		}
	}

	async configUpdated(config) {
		const oldConfig = this.config
		this.config = config

		// Re-test HTTP connection if host/port changed
		if (config.companion_host !== oldConfig.companion_host || config.companion_port !== oldConfig.companion_port) {
			await this.testHTTPConnection()
		}

		// Re-parse button lists
		this.parseButtonLists()

		// Update timer ranges
		this.cameraSwitcher.minSeconds = config.camera_min_seconds
		this.cameraSwitcher.maxSeconds = config.camera_max_seconds
		this.overlaySwitcher.minSeconds = config.overlay_min_seconds
		this.overlaySwitcher.maxSeconds = config.overlay_max_seconds

		// Update mode settings
		this.cameraSwitcher.sequentialMode = config.camera_sequential_mode || false
		this.overlaySwitcher.sequentialMode = config.overlay_sequential_mode || false

		// Refresh MIDI ports
		if (!this.midiHandler) {
			try {
				this.midiHandler = new MidiHandler(this)
				await this.midiHandler.refreshPorts()
			} catch (error) {
				this.log('debug', `MIDI handler creation: ${error.message}`)
			}
		} else {
			await this.midiHandler.refreshPorts()
		}

		// Handle MIDI configuration changes
		if (
			config.midi_enabled !== oldConfig.midi_enabled ||
			config.midi_port_index !== oldConfig.midi_port_index ||
			config.midi_port_name !== oldConfig.midi_port_name
		) {
			if (this.midiHandler && this.midiHandler.isConnected) {
				this.midiHandler.destroy()
			}

			if (config.midi_enabled && this.midiHandler) {
				try {
					await this.midiHandler.init(config)
				} catch (error) {
					this.log('error', `Failed to initialize MIDI: ${error.message}`)
				}
			}
		}

		// Update module components
		this.updateActions()
		this.updateFeedbacks()
		this.updateVariableDefinitions()
		this.updatePresets()
	}

	getConfigFields() {
		return [
			{
				type: 'static-text',
				id: 'info',
				label: 'Information',
				width: 12,
				value:
					'Enhanced automatic switching between camera angles and overlay graphics with random or sequential timing, statistics tracking, and advanced features.',
			},
			{
				type: 'static-text',
				id: 'http_section',
				label: 'HTTP API Settings',
				width: 12,
				value: '<h3>HTTP API Settings</h3>',
			},
			{
				type: 'textinput',
				id: 'companion_host',
				label: 'Companion Host',
				width: 8,
				default: '127.0.0.1',
				tooltip: 'IP address of Companion (use 127.0.0.1 for local)',
				regex:
					'/^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$|^localhost$|^127\\.0\\.0\\.1$/',
			},
			{
				type: 'number',
				id: 'companion_port',
				label: 'Companion HTTP Port',
				width: 4,
				default: 8000,
				min: 1,
				max: 65535,
				tooltip: 'HTTP port of Companion (default: 8000)',
			},
			{
				type: 'checkbox',
				id: 'use_internal_api',
				label: 'Use Internal API (Experimental)',
				width: 6,
				default: false,
				tooltip: 'Try to use internal API instead of HTTP (may not work in all versions)',
			},
			{
				type: 'checkbox',
				id: 'enable_queue',
				label: 'Enable Button Press Queue',
				width: 6,
				default: true,
				tooltip: 'Queue button presses to prevent overwhelming the system',
			},
			{
				type: 'static-text',
				id: 'camera_section',
				label: 'Camera Switcher Settings',
				width: 12,
				value: '<h3>Camera Switcher Settings</h3>',
			},
			{
				type: 'number',
				id: 'camera_min_seconds',
				label: 'Camera Minimum Seconds',
				width: 6,
				default: 15,
				min: 1,
				max: 3600,
				tooltip: 'Minimum time between camera switches (seconds)',
			},
			{
				type: 'number',
				id: 'camera_max_seconds',
				label: 'Camera Maximum Seconds',
				width: 6,
				default: 30,
				min: 1,
				max: 3600,
				tooltip: 'Maximum time between camera switches (seconds)',
			},
			{
				type: 'textinput',
				id: 'camera_buttons',
				label: 'Camera Buttons',
				width: 12,
				default: '2/1/0, 2/1/1, 2/1/2, 2/1/3, 2/1/4',
				tooltip: 'Comma-separated list of button locations (page/bank/button)',
				useVariables: true,
			},
			{
				type: 'checkbox',
				id: 'camera_sequential_mode',
				label: 'Sequential Mode (Camera)',
				width: 6,
				default: false,
				tooltip: 'Use sequential order instead of random selection',
			},
			{
				type: 'checkbox',
				id: 'camera_avoid_repeat',
				label: 'Avoid Immediate Repeats',
				width: 6,
				default: true,
				tooltip: 'Prevent selecting the same button twice in a row',
			},
			{
				type: 'number',
				id: 'camera_history_size',
				label: 'History Size (Camera)',
				width: 6,
				default: 5,
				min: 0,
				max: 20,
				tooltip: 'Number of recent buttons to track (0 = disabled)',
			},
			{
				type: 'static-text',
				id: 'overlay_section',
				label: 'Overlay Switcher Settings',
				width: 12,
				value: '<h3>Overlay Switcher Settings</h3>',
			},
			{
				type: 'number',
				id: 'overlay_min_seconds',
				label: 'Overlay Minimum Seconds',
				width: 6,
				default: 600,
				min: 1,
				max: 7200,
				tooltip: 'Minimum time between overlay switches (seconds)',
			},
			{
				type: 'number',
				id: 'overlay_max_seconds',
				label: 'Overlay Maximum Seconds',
				width: 6,
				default: 900,
				min: 1,
				max: 7200,
				tooltip: 'Maximum time between overlay switches (seconds)',
			},
			{
				type: 'textinput',
				id: 'overlay_buttons',
				label: 'Overlay Buttons',
				width: 12,
				default: '2/2/1, 3/0/3',
				tooltip: 'Comma-separated list of button locations (page/bank/button)',
				useVariables: true,
			},
			{
				type: 'checkbox',
				id: 'overlay_sequential_mode',
				label: 'Sequential Mode (Overlay)',
				width: 6,
				default: false,
				tooltip: 'Use sequential order instead of random selection',
			},
			{
				type: 'checkbox',
				id: 'overlay_avoid_repeat',
				label: 'Avoid Immediate Repeats',
				width: 6,
				default: true,
				tooltip: 'Prevent selecting the same button twice in a row',
			},
			{
				type: 'static-text',
				id: 'statistics_section',
				label: 'Statistics & Monitoring',
				width: 12,
				value: '<h3>Statistics & Monitoring</h3>',
			},
			{
				type: 'checkbox',
				id: 'enable_statistics',
				label: 'Enable Statistics Tracking',
				width: 6,
				default: true,
				tooltip: 'Track and save usage statistics',
			},
			{
				type: 'checkbox',
				id: 'enable_logging',
				label: 'Enable Debug Logging',
				width: 6,
				default: false,
			},
			{
				type: 'number',
				id: 'auto_save_interval',
				label: 'Auto-Save Interval (minutes)',
				width: 6,
				default: 5,
				min: 1,
				max: 60,
				tooltip: 'How often to save statistics to disk',
			},
			{
				type: 'static-text',
				id: 'midi_section',
				label: 'MIDI Control Settings',
				width: 12,
				value: '<h3>MIDI Control Settings</h3>',
			},
			{
				type: 'checkbox',
				id: 'midi_enabled',
				label: 'Enable MIDI Control',
				width: 6,
				default: false,
				tooltip: 'Enable direct MIDI input for controlling the switcher',
			},
			{
				type: 'checkbox',
				id: 'midi_auto_connect',
				label: 'Auto-Connect to First MIDI Device',
				width: 6,
				default: true,
				tooltip: 'Automatically connect to the first available MIDI device',
				isVisible: (options) => options.midi_enabled,
			},
			{
				type: 'dropdown',
				id: 'midi_port_index',
				label: 'MIDI Input Port',
				width: 8,
				default: -1,
				choices: this.midiPortChoices,
				tooltip: 'Select the MIDI input port to use',
				isVisible: (options) => options.midi_enabled,
			},
			{
				type: 'textinput',
				id: 'midi_port_name',
				label: 'MIDI Port Name (partial match)',
				width: 8,
				default: '',
				tooltip: 'Optionally specify part of the MIDI device name to connect to (e.g., "MPK", "APC40")',
				isVisible: (options) => options.midi_enabled,
			},
			{
				type: 'static-text',
				id: 'midi_info',
				label: 'MIDI Note Assignments',
				width: 12,
				value: `<strong>MIDI Note Assignments:</strong><br>
				Note 36: System On | Note 37: System Off | Note 38: System Reset<br>
				Note 39: Camera On | Note 40: Camera Off | Note 41: Camera Manual Trigger<br>
				Note 42: Overlay On | Note 43: Overlay Off | Note 44: Overlay Manual Trigger<br>
				Note 45: System Toggle | Note 46: Camera Toggle | Note 47: Overlay Toggle<br>
				Note 48: System Pause | Note 49: System Resume<br>
				<strong>MIDI CC Assignments:</strong><br>
				CC1: Camera Timer (maps to min-max range) | CC2: Overlay Timer (maps to min-max range)`,
				isVisible: (options) => options.midi_enabled,
			},
		]
	}

	async testHTTPConnection() {
		const host = this.config.companion_host || '127.0.0.1'
		const port = this.config.companion_port || 8000

		this.updateStatus(InstanceStatus.Ok)
		this.log('info', `Show Switcher configured to use Companion HTTP API at ${host}:${port}`)
		this.log('info', 'Button presses will use format: /api/location/{page}/{bank}/{button}/press')
	}

	parseButtonLists() {
		// Parse camera buttons
		const cameraButtons = this.config.camera_buttons || ''
		this.cameraSwitcher.buttons = cameraButtons
			.split(',')
			.map((b) => b.trim())
			.filter((b) => b.length > 0)

		// Parse overlay buttons
		const overlayButtons = this.config.overlay_buttons || ''
		this.overlaySwitcher.buttons = overlayButtons
			.split(',')
			.map((b) => b.trim())
			.filter((b) => b.length > 0)

		if (this.config.enable_logging) {
			this.log('debug', `Parsed ${this.cameraSwitcher.buttons.length} camera buttons`)
			this.log('debug', `Parsed ${this.overlaySwitcher.buttons.length} overlay buttons`)
		}
	}

	startPolling() {
		if (this.pollingInterval) {
			clearInterval(this.pollingInterval)
		}

		// Update variables every second
		this.pollingInterval = setInterval(() => {
			this.updateTimerVariables()
			this.checkFeedbacks()
		}, 1000)
	}

	startAutoSave() {
		if (this.autoSaveInterval) {
			clearInterval(this.autoSaveInterval)
		}

		if (this.config.enable_statistics) {
			const interval = (this.config.auto_save_interval || 5) * 60 * 1000
			this.autoSaveInterval = setInterval(() => {
				this.saveStatistics()
			}, interval)
		}
	}

	startQueueProcessor() {
		setInterval(() => {
			this.processButtonQueue()
		}, 100) // Process queue every 100ms
	}

	async processButtonQueue() {
		if (this.performance.isProcessingQueue || this.performance.buttonPressQueue.length === 0) {
			return
		}

		this.performance.isProcessingQueue = true
		const buttonPress = this.performance.buttonPressQueue.shift()

		if (buttonPress) {
			await this.executePressButton(buttonPress.page, buttonPress.bank, buttonPress.button)
		}

		this.performance.isProcessingQueue = false
	}

	updateTimerVariables() {
		// Update countdowns only if not paused
		if (!this.systemState.isPaused) {
			if (this.cameraSwitcher.isRunning && this.cameraSwitcher.countdown > 0) {
				this.cameraSwitcher.countdown--
				if (this.cameraSwitcher.countdown === 0) {
					this.triggerCamera()
				}
			}

			if (this.overlaySwitcher.isRunning && this.overlaySwitcher.countdown > 0) {
				this.overlaySwitcher.countdown--
				if (this.overlaySwitcher.countdown === 0) {
					this.triggerOverlay()
				}
			}
		}

		// Update active duration
		if (this.systemState.isRunning && this.systemState.startTime) {
			const totalElapsed = Date.now() - this.systemState.startTime
			const pausedTime = this.systemState.totalPausedTime
			this.systemState.activeDuration = Math.floor((totalElapsed - pausedTime) / 1000)
		}

		// Update all variables
		this.updateVariables()
	}

	updateVariables() {
		const variables = {
			camera_status: this.cameraSwitcher.isRunning ? 'Running' : 'Stopped',
			camera_countdown: this.cameraSwitcher.isRunning ? this.cameraSwitcher.countdown : 0,
			camera_next_button:
				this.cameraSwitcher.nextButtonIndex >= 0
					? this.cameraSwitcher.buttons[this.cameraSwitcher.nextButtonIndex]
					: 'None',
			camera_previous_button: this.cameraSwitcher.previousButton,
			camera_trigger_count: this.cameraSwitcher.triggerCount,
			camera_average_interval: Math.round(this.cameraSwitcher.averageInterval),
			camera_mode: this.cameraSwitcher.sequentialMode ? 'Sequential' : 'Random',

			overlay_status: this.overlaySwitcher.isRunning ? 'Running' : 'Stopped',
			overlay_countdown: this.overlaySwitcher.isRunning ? this.overlaySwitcher.countdown : 0,
			overlay_next_button:
				this.overlaySwitcher.nextButtonIndex >= 0
					? this.overlaySwitcher.buttons[this.overlaySwitcher.nextButtonIndex]
					: 'None',
			overlay_previous_button: this.overlaySwitcher.previousButton,
			overlay_trigger_count: this.overlaySwitcher.triggerCount,
			overlay_average_interval: Math.round(this.overlaySwitcher.averageInterval),
			overlay_mode: this.overlaySwitcher.sequentialMode ? 'Sequential' : 'Random',

			system_status: this.systemState.isPaused ? 'Paused' : this.systemState.isRunning ? 'Started' : 'Stopped',
			system_duration: this.formatDuration(this.systemState.activeDuration),
			system_total_runtime: this.formatDuration(this.systemState.totalRuntime),
			system_session_count: this.systemState.sessionCount,

			// Performance metrics
			http_success_rate:
				this.performance.httpSuccesses > 0
					? Math.round(
							(this.performance.httpSuccesses / (this.performance.httpSuccesses + this.performance.httpErrors)) * 100
						) + '%'
					: '0%',
			http_errors: this.performance.httpErrors,
			queue_size: this.performance.buttonPressQueue.length,

			// MIDI status variables
			midi_status: this.midiHandler && this.midiHandler.isConnected ? 'Connected' : 'Disconnected',
			midi_port: this.midiHandler && this.midiHandler.currentPortName ? this.midiHandler.currentPortName : 'None',
			midi_last_note: '',
			midi_last_cc: '',
		}

		this.setVariableValues(variables)
	}

	formatDuration(seconds) {
		const hours = Math.floor(seconds / 3600)
		const minutes = Math.floor((seconds % 3600) / 60)
		const secs = seconds % 60
		return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
	}

	initVariables() {
		this.updateVariables()
	}

	getRandomInt(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min
	}

	selectNextButton(switcher) {
		if (switcher.buttons.length === 0) return -1

		if (switcher.sequentialMode) {
			// Sequential mode
			switcher.sequentialIndex = (switcher.sequentialIndex + 1) % switcher.buttons.length
			return switcher.sequentialIndex
		} else {
			// Random mode with optional repeat avoidance
			let candidates = [...Array(switcher.buttons.length).keys()]

			// Remove blacklisted buttons
			candidates = candidates.filter((i) => !switcher.blacklist.includes(switcher.buttons[i]))

			// Avoid immediate repeats if enabled
			if (this.config[switcher === this.cameraSwitcher ? 'camera_avoid_repeat' : 'overlay_avoid_repeat']) {
				if (switcher.previousButton !== 'None') {
					const prevIndex = switcher.buttons.indexOf(switcher.previousButton)
					candidates = candidates.filter((i) => i !== prevIndex)
				}
			}

			// If no candidates left, reset and use all buttons
			if (candidates.length === 0) {
				candidates = [...Array(switcher.buttons.length).keys()]
				switcher.blacklist = []
			}

			return candidates[Math.floor(Math.random() * candidates.length)]
		}
	}

	updateHistory(switcher, button) {
		const historySize =
			this.config[switcher === this.cameraSwitcher ? 'camera_history_size' : 'overlay_history_size'] || 5

		if (historySize > 0) {
			switcher.history.push({
				button: button,
				timestamp: Date.now(),
			})

			// Trim history to size
			if (switcher.history.length > historySize) {
				switcher.history.shift()
			}
		}

		// Update average interval
		if (switcher.lastTriggerTime) {
			const interval = (Date.now() - switcher.lastTriggerTime) / 1000
			switcher.averageInterval =
				switcher.averageInterval === 0 ? interval : switcher.averageInterval * 0.8 + interval * 0.2 // Weighted average
		}
		switcher.lastTriggerTime = Date.now()
	}

	// Camera Switcher Methods
	startCameraSwitcher() {
		if (this.cameraSwitcher.buttons.length === 0) {
			this.log('warn', 'No camera buttons configured')
			return
		}

		this.cameraSwitcher.isRunning = true
		this.cameraSwitcher.nextButtonIndex = this.selectNextButton(this.cameraSwitcher)
		this.cameraSwitcher.countdown = this.getRandomInt(this.cameraSwitcher.minSeconds, this.cameraSwitcher.maxSeconds)

		this.log('info', `Camera switcher started with ${this.cameraSwitcher.countdown}s countdown`)
		this.checkFeedbacks('camera_running', 'camera_stopped')
	}

	stopCameraSwitcher() {
		this.cameraSwitcher.isRunning = false
		this.cameraSwitcher.countdown = 0
		this.cameraSwitcher.nextButtonIndex = -1
		this.cameraSwitcher.sequentialIndex = 0

		this.log('info', 'Camera switcher stopped')
		this.checkFeedbacks('camera_running', 'camera_stopped')
	}

	async triggerCamera() {
		if (this.cameraSwitcher.buttons.length === 0) return

		const button = this.cameraSwitcher.buttons[this.cameraSwitcher.nextButtonIndex]
		const [page, bank, btn] = button.split('/').map(Number)

		// Trigger the button press
		await this.pressButton(page, bank, btn)

		// Update state
		this.cameraSwitcher.previousButton = button
		this.cameraSwitcher.triggerCount++
		this.updateHistory(this.cameraSwitcher, button)

		// Select next button
		this.cameraSwitcher.nextButtonIndex = this.selectNextButton(this.cameraSwitcher)

		// Set new random countdown
		if (this.cameraSwitcher.isRunning) {
			this.cameraSwitcher.countdown = this.getRandomInt(this.cameraSwitcher.minSeconds, this.cameraSwitcher.maxSeconds)
		}

		this.log('info', `Camera triggered: ${button}`)
	}

	manualTriggerCamera() {
		if (this.cameraSwitcher.buttons.length === 0) {
			this.log('warn', 'No camera buttons configured')
			return
		}

		// If not running, start it
		if (!this.cameraSwitcher.isRunning) {
			this.startCameraSwitcher()
		}

		// Trigger immediately
		this.triggerCamera()
	}

	// Overlay Switcher Methods
	startOverlaySwitcher() {
		if (this.overlaySwitcher.buttons.length === 0) {
			this.log('warn', 'No overlay buttons configured')
			return
		}

		this.overlaySwitcher.isRunning = true
		this.overlaySwitcher.nextButtonIndex = this.selectNextButton(this.overlaySwitcher)
		this.overlaySwitcher.countdown = this.getRandomInt(this.overlaySwitcher.minSeconds, this.overlaySwitcher.maxSeconds)

		this.log('info', `Overlay switcher started with ${this.overlaySwitcher.countdown}s countdown`)
		this.checkFeedbacks('overlay_running', 'overlay_stopped')
	}

	stopOverlaySwitcher() {
		this.overlaySwitcher.isRunning = false
		this.overlaySwitcher.countdown = 0
		this.overlaySwitcher.nextButtonIndex = -1
		this.overlaySwitcher.sequentialIndex = 0

		this.log('info', 'Overlay switcher stopped')
		this.checkFeedbacks('overlay_running', 'overlay_stopped')
	}

	async triggerOverlay() {
		if (this.overlaySwitcher.buttons.length === 0) return

		const button = this.overlaySwitcher.buttons[this.overlaySwitcher.nextButtonIndex]
		const [page, bank, btn] = button.split('/').map(Number)

		// Trigger the button press
		await this.pressButton(page, bank, btn)

		// Update state
		this.overlaySwitcher.previousButton = button
		this.overlaySwitcher.triggerCount++
		this.updateHistory(this.overlaySwitcher, button)

		// Select next button
		this.overlaySwitcher.nextButtonIndex = this.selectNextButton(this.overlaySwitcher)

		// Set new random countdown
		if (this.overlaySwitcher.isRunning) {
			this.overlaySwitcher.countdown = this.getRandomInt(
				this.overlaySwitcher.minSeconds,
				this.overlaySwitcher.maxSeconds
			)
		}

		this.log('info', `Overlay triggered: ${button}`)
	}

	manualTriggerOverlay() {
		if (this.overlaySwitcher.buttons.length === 0) {
			this.log('warn', 'No overlay buttons configured')
			return
		}

		// If not running, start it
		if (!this.overlaySwitcher.isRunning) {
			this.startOverlaySwitcher()
		}

		// Trigger immediately
		this.triggerOverlay()
	}

	// System Methods
	startSystem() {
		this.systemState.isRunning = true
		this.systemState.isPaused = false
		this.systemState.startTime = Date.now()
		this.systemState.activeDuration = 0
		this.systemState.totalPausedTime = 0
		this.systemState.sessionCount++

		this.startCameraSwitcher()
		this.startOverlaySwitcher()

		this.log('info', 'System started')
		this.checkFeedbacks('system_running', 'system_stopped')
	}

	async stopSystem() {
		const wasRunning = this.systemState.isRunning
		this.systemState.isRunning = false
		this.systemState.isPaused = false

		// Update total runtime
		if (this.systemState.startTime) {
			const sessionTime = Math.floor((Date.now() - this.systemState.startTime) / 1000)
			this.systemState.totalRuntime += sessionTime
		}

		this.systemState.lastStopTime = Date.now()

		this.stopCameraSwitcher()
		this.stopOverlaySwitcher()

		// Return to default camera
		if (wasRunning && this.cameraSwitcher.buttons.length > 0) {
			const defaultButton = this.cameraSwitcher.buttons[0]
			const [page, bank, btn] = defaultButton.split('/').map(Number)

			this.log('info', `Returning to default camera: ${defaultButton}`)
			// Bypass queue for default camera return - execute immediately
			await this.executePressButton(page, bank, btn)

			// Update the previous button to show it was triggered
			this.cameraSwitcher.previousButton = defaultButton
			this.cameraSwitcher.triggerCount++
			this.updateVariables()
		}

		// Save statistics
		if (this.config.enable_statistics) {
			await this.saveStatistics()
		}

		this.log('info', 'System stopped')
		this.checkFeedbacks('system_running', 'system_stopped')
	}

	pauseSystem() {
		if (this.systemState.isRunning && !this.systemState.isPaused) {
			this.systemState.isPaused = true
			this.systemState.pauseStartTime = Date.now()
			this.log('info', 'System paused')
			this.updateVariables()
		}
	}

	resumeSystem() {
		if (this.systemState.isRunning && this.systemState.isPaused) {
			if (this.systemState.pauseStartTime) {
				this.systemState.totalPausedTime += Date.now() - this.systemState.pauseStartTime
			}
			this.systemState.isPaused = false
			this.systemState.pauseStartTime = null
			this.log('info', 'System resumed')
			this.updateVariables()
		}
	}

	resetSystem() {
		this.stopSystem()

		// Reset camera state
		this.cameraSwitcher.triggerCount = 0
		this.cameraSwitcher.previousButton = 'None'
		this.cameraSwitcher.history = []
		this.cameraSwitcher.averageInterval = 0

		// Reset overlay state
		this.overlaySwitcher.triggerCount = 0
		this.overlaySwitcher.previousButton = 'None'
		this.overlaySwitcher.history = []
		this.overlaySwitcher.averageInterval = 0

		// Reset system state
		this.systemState.startTime = null
		this.systemState.activeDuration = 0

		// Reset performance metrics
		this.performance.httpErrors = 0
		this.performance.httpSuccesses = 0
		this.performance.averageResponseTime = 0

		this.updateVariables()
		this.log('info', 'System reset')
	}

	// Set countdown for camera
	setCameraCountdown(seconds) {
		if (this.cameraSwitcher.isRunning) {
			this.cameraSwitcher.countdown = seconds
			this.log('debug', `Camera countdown set to ${seconds}s`)
		}
	}

	// Set countdown for overlay
	setOverlayCountdown(seconds) {
		if (this.overlaySwitcher.isRunning) {
			this.overlaySwitcher.countdown = seconds
			this.log('debug', `Overlay countdown set to ${seconds}s`)
		}
	}

	// Enhanced button press with queue support
	async pressButton(page, bank, button) {
		if (this.config.enable_queue) {
			// Add to queue
			this.performance.buttonPressQueue.push({ page, bank, button })
		} else {
			// Execute immediately
			await this.executePressButton(page, bank, button)
		}
	}

	// Actual button press execution
	async executePressButton(page, bank, button) {
		const startTime = Date.now()

		// First try internal API if enabled
		if (this.config.use_internal_api) {
			try {
				const location = {
					page: page,
					bank: bank,
					button: button,
				}

				if (this.triggerAction) {
					await this.triggerAction('bank_press', location)
					this.performance.httpSuccesses++
					this.log('debug', `Button pressed internally: ${page}/${bank}/${button}`)
					return
				} else if (this.system && this.system.emit) {
					this.system.emit('bank_pressed', page, bank, button, true)
					setTimeout(() => {
						this.system.emit('bank_pressed', page, bank, button, false)
					}, 100)
					this.performance.httpSuccesses++
					this.log('debug', `Button pressed via system emit: ${page}/${bank}/${button}`)
					return
				}
			} catch (error) {
				this.log('debug', `Internal API failed, falling back to HTTP: ${error.message}`)
			}
		}

		// Use HTTP API
		const host = this.config.companion_host || '127.0.0.1'
		const port = this.config.companion_port || 8000
		const url = `http://${host}:${port}/api/location/${page}/${bank}/${button}/press`

		try {
			const controller = new AbortController()
			const timeoutId = setTimeout(() => controller.abort(), 5000)

			const response = await fetch(url, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
				},
				signal: controller.signal,
			})

			clearTimeout(timeoutId)

			const responseTime = Date.now() - startTime
			this.performance.averageResponseTime =
				this.performance.averageResponseTime === 0
					? responseTime
					: this.performance.averageResponseTime * 0.9 + responseTime * 0.1

			if (response.ok) {
				this.performance.httpSuccesses++
				this.log('debug', `Button pressed via HTTP: ${page}/${bank}/${button} (${responseTime}ms)`)
			} else {
				this.performance.httpErrors++
				this.performance.lastHttpError = `Status ${response.status}`
				this.log('warn', `Button press failed: ${page}/${bank}/${button} - Status: ${response.status}`)
			}
		} catch (error) {
			this.performance.httpErrors++
			this.performance.lastHttpError = error.message

			if (error.name === 'AbortError') {
				this.log('error', `Button press timeout: ${page}/${bank}/${button}`)
			} else {
				this.log('error', `Button press error: ${page}/${bank}/${button} - ${error.message}`)
			}
		}
	}

	// Statistics persistence
	async loadStatistics() {
		try {
			// This would normally load from a file or database
			// For now, just initialize with defaults
			this.log('debug', 'Loading statistics...')
		} catch (error) {
			this.log('debug', `Failed to load statistics: ${error.message}`)
		}
	}

	async saveStatistics() {
		if (!this.config.enable_statistics) return

		try {
			const stats = {
				totalRuntime: this.systemState.totalRuntime,
				sessionCount: this.systemState.sessionCount,
				cameraTriggerCount: this.cameraSwitcher.triggerCount,
				overlayTriggerCount: this.overlaySwitcher.triggerCount,
				httpErrors: this.performance.httpErrors,
				httpSuccesses: this.performance.httpSuccesses,
				lastSaved: new Date().toISOString(),
			}

			// This would normally save to a file or database
			this.log('debug', `Statistics saved: ${JSON.stringify(stats)}`)
		} catch (error) {
			this.log('error', `Failed to save statistics: ${error.message}`)
		}
	}

	updateActions() {
		this.setActionDefinitions(getActions(this))
	}

	updateFeedbacks() {
		this.setFeedbackDefinitions(getFeedbacks(this))
	}

	updateVariableDefinitions() {
		this.setVariableDefinitions(getVariableDefinitions())
	}

	updatePresets() {
		this.setPresetDefinitions(getPresets())
	}
}

runEntrypoint(ShowSwitcherInstance, upgrades)
