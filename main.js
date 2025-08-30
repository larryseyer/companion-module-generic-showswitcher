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
		}

		this.systemState = {
			isRunning: false,
			startTime: null,
			activeDuration: 0,
		}

		this.pollingInterval = null
		this.midiHandler = null
		this.midiPorts = []
		this.midiPortChoices = [{ id: -1, label: 'None - Select a MIDI port' }]
	}

	async init(config) {
		this.config = config
		this.updateStatus(InstanceStatus.Connecting)

		// Initialize MIDI handler early to populate port list
		// This ensures ports are available for config dropdowns
		try {
			this.midiHandler = new MidiHandler(this)
			// Always try to refresh ports for the dropdown
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

		// Now properly initialize MIDI connection if enabled
		if (this.config.midi_enabled && this.midiHandler) {
			try {
				await this.midiHandler.init(this.config)
			} catch (error) {
				this.log('error', `Failed to initialize MIDI: ${error.message}`)
			}
		}

		this.log('info', 'Show Switcher module v1.0.1 initialized with MIDI support')
	}

	async destroy() {
		this.log('debug', 'Destroying Show Switcher instance')

		// Stop all timers
		this.stopCameraSwitcher()
		this.stopOverlaySwitcher()

		// Clear polling interval
		if (this.pollingInterval) {
			clearInterval(this.pollingInterval)
			this.pollingInterval = null
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

		// Always refresh MIDI ports when config is updated
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
					'This module provides automatic switching between camera angles and overlay graphics with random timing.',
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
				id: 'enable_logging',
				label: 'Enable Debug Logging',
				width: 6,
				default: false,
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
				<strong>MIDI CC Assignments:</strong><br>
				CC1: Camera Timer (maps to min-max range) | CC2: Overlay Timer (maps to min-max range)`,
				isVisible: (options) => options.midi_enabled,
			},
		]
	}

	async testHTTPConnection() {
		// Skip actual connection test - just validate configuration
		const host = this.config.companion_host || '127.0.0.1'
		const port = this.config.companion_port || 8000

		// Simply set status to OK and log the configuration
		this.updateStatus(InstanceStatus.Ok)
		this.log('info', `Show Switcher configured to use Companion HTTP API at ${host}:${port}`)
		this.log('info', 'Button presses will use format: /api/location/{page}/{bank}/{button}/press')

		// Note: Actual connection errors will be reported when buttons are pressed
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

	updateTimerVariables() {
		// Update countdowns
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

		// Update active duration
		if (this.systemState.isRunning && this.systemState.startTime) {
			this.systemState.activeDuration = Math.floor((Date.now() - this.systemState.startTime) / 1000)
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

			overlay_status: this.overlaySwitcher.isRunning ? 'Running' : 'Stopped',
			overlay_countdown: this.overlaySwitcher.isRunning ? this.overlaySwitcher.countdown : 0,
			overlay_next_button:
				this.overlaySwitcher.nextButtonIndex >= 0
					? this.overlaySwitcher.buttons[this.overlaySwitcher.nextButtonIndex]
					: 'None',
			overlay_previous_button: this.overlaySwitcher.previousButton,
			overlay_trigger_count: this.overlaySwitcher.triggerCount,

			system_status: this.systemState.isRunning ? 'Started' : 'Stopped',
			system_duration: this.formatDuration(this.systemState.activeDuration),

			// MIDI status variables
			midi_status: this.midiHandler && this.midiHandler.isConnected ? 'Connected' : 'Disconnected',
			midi_port:
				this.midiHandler && this.midiHandler.isConnected && this.midiHandler.input
					? this.midiHandler.input.getPortName(this.config.midi_port_index || 0)
					: 'None',
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

	// Camera Switcher Methods
	startCameraSwitcher() {
		if (this.cameraSwitcher.buttons.length === 0) {
			this.log('warn', 'No camera buttons configured')
			return
		}

		this.cameraSwitcher.isRunning = true
		this.cameraSwitcher.nextButtonIndex = Math.floor(Math.random() * this.cameraSwitcher.buttons.length)
		this.cameraSwitcher.countdown = this.getRandomInt(this.cameraSwitcher.minSeconds, this.cameraSwitcher.maxSeconds)

		this.log('info', `Camera switcher started with ${this.cameraSwitcher.countdown}s countdown`)
		this.checkFeedbacks('camera_running', 'camera_stopped')
	}

	stopCameraSwitcher() {
		this.cameraSwitcher.isRunning = false
		this.cameraSwitcher.countdown = 0
		this.cameraSwitcher.nextButtonIndex = -1

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

		// Select next random button
		this.cameraSwitcher.nextButtonIndex = Math.floor(Math.random() * this.cameraSwitcher.buttons.length)

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
		this.overlaySwitcher.nextButtonIndex = Math.floor(Math.random() * this.overlaySwitcher.buttons.length)
		this.overlaySwitcher.countdown = this.getRandomInt(this.overlaySwitcher.minSeconds, this.overlaySwitcher.maxSeconds)

		this.log('info', `Overlay switcher started with ${this.overlaySwitcher.countdown}s countdown`)
		this.checkFeedbacks('overlay_running', 'overlay_stopped')
	}

	stopOverlaySwitcher() {
		this.overlaySwitcher.isRunning = false
		this.overlaySwitcher.countdown = 0
		this.overlaySwitcher.nextButtonIndex = -1

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

		// Select next random button
		this.overlaySwitcher.nextButtonIndex = Math.floor(Math.random() * this.overlaySwitcher.buttons.length)

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
		this.systemState.startTime = Date.now()
		this.systemState.activeDuration = 0

		this.startCameraSwitcher()
		this.startOverlaySwitcher()

		this.log('info', 'System started')
		this.checkFeedbacks('system_running', 'system_stopped')
	}

	stopSystem() {
		this.systemState.isRunning = false

		this.stopCameraSwitcher()
		this.stopOverlaySwitcher()

		this.log('info', 'System stopped')
		this.checkFeedbacks('system_running', 'system_stopped')
	}

	resetSystem() {
		this.stopSystem()

		// Reset camera state
		this.cameraSwitcher.triggerCount = 0
		this.cameraSwitcher.previousButton = 'None'

		// Reset overlay state
		this.overlaySwitcher.triggerCount = 0
		this.overlaySwitcher.previousButton = 'None'

		// Reset system state
		this.systemState.startTime = null
		this.systemState.activeDuration = 0

		this.updateVariables()
		this.log('info', 'System reset')
	}

	// Set countdown for camera (used for CC control simulation)
	setCameraCountdown(seconds) {
		if (this.cameraSwitcher.isRunning) {
			this.cameraSwitcher.countdown = seconds
			this.log('debug', `Camera countdown set to ${seconds}s`)
		}
	}

	// Set countdown for overlay (used for CC control simulation)
	setOverlayCountdown(seconds) {
		if (this.overlaySwitcher.isRunning) {
			this.overlaySwitcher.countdown = seconds
			this.log('debug', `Overlay countdown set to ${seconds}s`)
		}
	}

	// Helper method to press a button
	async pressButton(page, bank, button) {
		// First try internal API if enabled
		if (this.config.use_internal_api) {
			try {
				// Try to trigger action internally
				// This uses Companion's internal structure - may vary by version
				const location = {
					page: page,
					bank: bank,
					button: button,
				}

				// Try different internal methods based on Companion version
				if (this.triggerAction) {
					// Companion 3.x method
					await this.triggerAction('bank_press', location)
					this.log('debug', `Button pressed internally: ${page}/${bank}/${button}`)
					return
				} else if (this.system && this.system.emit) {
					// Try event emission (may work in some versions)
					this.system.emit('bank_pressed', page, bank, button, true)
					setTimeout(() => {
						this.system.emit('bank_pressed', page, bank, button, false)
					}, 100)
					this.log('debug', `Button pressed via system emit: ${page}/${bank}/${button}`)
					return
				}
			} catch (error) {
				this.log('debug', `Internal API failed, falling back to HTTP: ${error.message}`)
			}
		}

		// Use HTTP API as fallback or primary method
		const host = this.config.companion_host || '127.0.0.1'
		const port = this.config.companion_port || 8000
		const url = `http://${host}:${port}/api/location/${page}/${bank}/${button}/press`

		try {
			// Use fetch to trigger the button
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

			if (response.ok) {
				this.log('debug', `Button pressed via HTTP: ${page}/${bank}/${button}`)
			} else {
				this.log('warn', `Button press failed: ${page}/${bank}/${button} - Status: ${response.status}`)
				this.log('warn', `Make sure HTTP service is enabled in Companion settings on port ${port}`)
			}
		} catch (error) {
			if (error.name === 'AbortError') {
				this.log('error', `Button press timeout: ${page}/${bank}/${button}`)
			} else {
				this.log('error', `Button press error: ${page}/${bank}/${button} - ${error.message}`)
				this.log('error', `Check that Companion HTTP service is enabled and running on ${host}:${port}`)
			}
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
