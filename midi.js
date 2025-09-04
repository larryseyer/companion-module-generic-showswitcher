// MIDI Handler for Show Switcher Module using JZZ

// Import JZZ directly - webpack will bundle it properly
import JZZ from 'jzz'

export class MidiHandler {
	// Static method to check if JZZ is available
	static getJZZ() {
		return JZZ
	}
	constructor(instance) {
		this.instance = instance
		this.midiIn = null
		this.isConnected = false
		this.availablePorts = []
		this.currentPortName = null
		this.isToggling = false // Prevent race conditions in toggle operations
		this.lastCommandTime = {} // Track last command time for debouncing

		// MIDI note mappings (enhanced from original ShowSwitcher)
		this.noteMap = {
			36: 'system_on',
			37: 'system_off',
			38: 'system_reset',
			39: 'camera_on',
			40: 'camera_off',
			41: 'camera_manual',
			42: 'overlay_on',
			43: 'overlay_off',
			44: 'overlay_manual',
			45: 'system_toggle',
			46: 'camera_toggle',
			47: 'overlay_toggle',
			48: 'system_pause', // New
			49: 'system_resume', // New
			50: 'camera_mode_toggle', // New
			51: 'overlay_mode_toggle', // New
		}

		// Control Change mappings
		this.ccMap = {
			1: 'camera_timer',
			2: 'overlay_timer',
			3: 'camera_min_timer',
			4: 'camera_max_timer',
			5: 'overlay_min_timer',
			6: 'overlay_max_timer',
		}
	}

	// Initialize MIDI connection
	async init(config) {
		if (!config.midi_enabled) {
			this.instance.log('debug', 'MIDI disabled in configuration')
			return
		}

		if (!JZZ) {
			this.instance.log('warn', 'MIDI support not available - JZZ library not loaded')
			this.instance.setVariableValues({
				midi_status: 'Not Available',
				midi_port: 'None',
			})
			return
		}

		try {
			// Initialize JZZ MIDI engine
			await JZZ().or('Cannot start MIDI engine!')

			// Refresh port list
			await this.refreshPorts()

			// Auto-connect logic
			if (config.midi_port_name) {
				// Try to find port by name (partial match)
				const port = this.availablePorts.find((p) => p.name.toLowerCase().includes(config.midi_port_name.toLowerCase()))
				if (port) {
					await this.openPort(port.index)
				} else {
					this.instance.log('warn', `MIDI port "${config.midi_port_name}" not found`)
				}
			} else if (config.midi_port_index !== undefined && config.midi_port_index >= 0) {
				// Use specific port index
				if (config.midi_port_index < this.availablePorts.length) {
					await this.openPort(config.midi_port_index)
				}
			} else if (this.availablePorts.length > 0 && config.midi_auto_connect) {
				// Auto-connect to first available port
				await this.openPort(0)
			}
		} catch (error) {
			this.instance.log('error', `MIDI initialization error: ${error.message || error}`)
			this.instance.setVariableValues({
				midi_status: 'Error',
				midi_port: 'None',
			})
		}
	}

	// Refresh available MIDI ports
	async refreshPorts() {
		if (!JZZ) {
			this.instance.log('debug', 'JZZ not available for port refresh')
			return
		}

		try {
			const midi = await JZZ().or('Cannot start MIDI engine!')
			const info = await midi.info()

			this.availablePorts = []

			// Get input ports
			if (info.inputs && info.inputs.length > 0) {
				info.inputs.forEach((port) => {
					const name = port.name || 'Unknown MIDI Device'
					// Filter out internal/virtual ports
					if (!name.includes('Midi Through')) {
						this.availablePorts.push({
							index: this.availablePorts.length,
							name: name,
							id: port.id || name,
						})
						this.instance.log('info', `Found MIDI Port ${this.availablePorts.length - 1}: ${name}`)
					}
				})
			}

			// Log raw port info if no ports found
			if (this.availablePorts.length === 0) {
				const rawInputs = midi.info().inputs
				if (rawInputs) {
					this.instance.log('debug', `Raw inputs: ${JSON.stringify(rawInputs)}`)
				}
			}

			this.instance.log('info', `Total MIDI input ports found: ${this.availablePorts.length}`)

			// Update instance properties for UI
			this.instance.midiPorts = this.availablePorts

			// Create choices array for dropdown
			this.instance.midiPortChoices = [{ id: -1, label: 'None - Select a MIDI port' }]
			this.availablePorts.forEach((port, index) => {
				this.instance.midiPortChoices.push({
					id: index,
					label: port.name || `Port ${index}`,
				})
			})
		} catch (error) {
			this.instance.log('error', `Failed to get MIDI ports: ${error.message || error}`)
			this.availablePorts = []
		}
	}

	// Open a specific MIDI port
	async openPort(portIndex) {
		if (!JZZ) {
			this.instance.log('debug', 'JZZ not available for opening port')
			return
		}

		try {
			// Close existing connection
			if (this.midiIn) {
				this.midiIn.close()
				this.midiIn = null
				this.isConnected = false
			}

			if (portIndex < 0 || portIndex >= this.availablePorts.length) {
				this.instance.log('error', `Invalid MIDI port index: ${portIndex}`)
				return
			}

			const port = this.availablePorts[portIndex]
			this.currentPortName = port.name

			// Open the MIDI input port
			this.midiIn = await JZZ().openMidiIn(port.name).or(`Cannot open MIDI port: ${port.name}`)

			// Connect message handler
			this.midiIn.connect((msg) => {
				this.handleMidiMessage(msg)
			})

			this.isConnected = true
			this.instance.log('info', `Connected to MIDI port ${portIndex}: ${port.name}`)

			// Update Companion variables
			this.instance.setVariableValues({
				midi_status: 'Connected',
				midi_port: port.name,
			})
		} catch (error) {
			this.instance.log('error', `Failed to open MIDI port: ${error.message || error}`)
			this.isConnected = false
			this.instance.setVariableValues({
				midi_status: 'Error',
				midi_port: 'None',
			})
		}
	}

	// Handle incoming MIDI messages
	handleMidiMessage(msg) {
		if (!msg || msg.length < 3) return

		const status = msg[0]
		const data1 = msg[1]
		const data2 = msg[2]

		const channel = (status & 0x0f) + 1
		const messageType = status & 0xf0

		// Check if this channel should be processed
		const config = this.instance.config
		if (config.midi_channel_filter && config.midi_channel !== channel) {
			return // Ignore messages on other channels
		}

		const now = Date.now()

		// Note On message (0x90)
		if (messageType === 0x90 && data2 > 0) {
			const action = this.noteMap[data1]
			if (action) {
				// Debounce check (prevent rapid repeated triggers)
				const lastTime = this.lastCommandTime[`note_${data1}`] || 0
				if (now - lastTime < 100) {
					return // Ignore if triggered within 100ms
				}
				this.lastCommandTime[`note_${data1}`] = now

				this.instance.log(
					'info',
					`MIDI Note On: ${data1} (velocity: ${data2}) on channel ${channel} -> Action: ${action}`
				)
				this.executeAction(action)

				// Update MIDI activity variable
				this.instance.setVariableValues({
					midi_last_note: data1,
					midi_last_velocity: data2,
					midi_last_channel: channel,
				})
			}
		}
		// Note Off message (0x80 or Note On with velocity 0)
		else if (messageType === 0x80 || (messageType === 0x90 && data2 === 0)) {
			// We don't need to do anything for note off in this implementation
			this.instance.log('debug', `MIDI Note Off: ${data1} on channel ${channel}`)
		}
		// Control Change message (0xB0)
		else if (messageType === 0xb0) {
			const ccAction = this.ccMap[data1]
			if (ccAction) {
				// Debounce check for CC
				const lastTime = this.lastCommandTime[`cc_${data1}`] || 0
				if (now - lastTime < 50) {
					return // Ignore if triggered within 50ms
				}
				this.lastCommandTime[`cc_${data1}`] = now

				this.instance.log('info', `MIDI CC: ${data1} value: ${data2} on channel ${channel} -> Action: ${ccAction}`)
				this.executeCCAction(ccAction, data2)

				// Update MIDI activity variable
				this.instance.setVariableValues({
					midi_last_cc: data1,
					midi_last_cc_value: data2,
					midi_last_channel: channel,
				})
			}
		}
	}

	// Execute action based on MIDI note
	executeAction(action) {
		const actions = {
			system_on: () => {
				this.instance.startSystem()
			},
			system_off: () => {
				this.instance.stopSystem()
			},
			system_reset: () => {
				this.instance.resetSystem()
			},
			system_toggle: () => {
				if (!this.isToggling) {
					this.isToggling = true
					if (this.instance.systemState.isRunning) {
						this.instance.stopSystem()
					} else {
						this.instance.startSystem()
					}
					setTimeout(() => {
						this.isToggling = false
					}, 100)
				}
			},
			system_pause: () => {
				this.instance.pauseSystem()
			},
			system_resume: () => {
				this.instance.resumeSystem()
			},
			camera_on: () => {
				this.instance.startCameraSwitcher()
			},
			camera_off: () => {
				this.instance.stopCameraSwitcher()
			},
			camera_manual: () => {
				this.instance.manualTriggerCamera()
			},
			camera_toggle: () => {
				if (this.instance.cameraSwitcher.isRunning) {
					this.instance.stopCameraSwitcher()
				} else {
					this.instance.startCameraSwitcher()
				}
			},
			camera_mode_toggle: () => {
				this.instance.cameraSwitcher.sequentialMode = !this.instance.cameraSwitcher.sequentialMode
				this.instance.cameraSwitcher.sequentialIndex = 0
				const mode = this.instance.cameraSwitcher.sequentialMode ? 'sequential' : 'random'
				this.instance.log('info', `Camera mode toggled to ${mode} via MIDI`)
				this.instance.updateVariables()
			},
			overlay_on: () => {
				this.instance.startOverlaySwitcher()
			},
			overlay_off: () => {
				this.instance.stopOverlaySwitcher()
			},
			overlay_manual: () => {
				this.instance.manualTriggerOverlay()
			},
			overlay_toggle: () => {
				if (this.instance.overlaySwitcher.isRunning) {
					this.instance.stopOverlaySwitcher()
				} else {
					this.instance.startOverlaySwitcher()
				}
			},
			overlay_mode_toggle: () => {
				this.instance.overlaySwitcher.sequentialMode = !this.instance.overlaySwitcher.sequentialMode
				this.instance.overlaySwitcher.sequentialIndex = 0
				const mode = this.instance.overlaySwitcher.sequentialMode ? 'sequential' : 'random'
				this.instance.log('info', `Overlay mode toggled to ${mode} via MIDI`)
				this.instance.updateVariables()
			},
		}

		const handler = actions[action]
		if (handler) {
			handler()
		} else {
			this.instance.log('warn', `Unknown MIDI action: ${action}`)
		}
	}

	// Execute action based on MIDI CC value
	executeCCAction(action, value) {
		// Map 0-127 to appropriate timer range
		const mapToRange = (val, min, max) => {
			return Math.round(min + (val / 127) * (max - min))
		}

		const actions = {
			camera_timer: () => {
				// Map to configured camera timer range
				const minSeconds = this.instance.config.camera_min_seconds || 15
				const maxSeconds = this.instance.config.camera_max_seconds || 30
				const seconds = mapToRange(value, minSeconds, maxSeconds)
				this.instance.setCameraCountdown(seconds)
				this.instance.log('info', `Camera timer set to ${seconds} seconds via MIDI CC`)
			},
			overlay_timer: () => {
				// Map to configured overlay timer range
				const minSeconds = this.instance.config.overlay_min_seconds || 600
				const maxSeconds = this.instance.config.overlay_max_seconds || 900
				const seconds = mapToRange(value, minSeconds, maxSeconds)
				this.instance.setOverlayCountdown(seconds)
				this.instance.log('info', `Overlay timer set to ${seconds} seconds via MIDI CC`)
			},
			camera_min_timer: () => {
				// Map to 1-30 seconds
				const seconds = mapToRange(value, 1, 30)
				this.instance.cameraSwitcher.minSeconds = seconds
				this.instance.log('info', `Camera min timer set to ${seconds} seconds via MIDI CC`)
			},
			camera_max_timer: () => {
				// Map to 2-120 seconds
				const seconds = mapToRange(value, 2, 120)
				this.instance.cameraSwitcher.maxSeconds = seconds
				this.instance.log('info', `Camera max timer set to ${seconds} seconds via MIDI CC`)
			},
			overlay_min_timer: () => {
				// Map to 1-30 seconds for testing, normally would be higher
				const seconds = mapToRange(value, 60, 600)
				this.instance.overlaySwitcher.minSeconds = seconds
				this.instance.log('info', `Overlay min timer set to ${seconds} seconds via MIDI CC`)
			},
			overlay_max_timer: () => {
				// Map to appropriate overlay range
				const seconds = mapToRange(value, 120, 1200)
				this.instance.overlaySwitcher.maxSeconds = seconds
				this.instance.log('info', `Overlay max timer set to ${seconds} seconds via MIDI CC`)
			},
		}

		const handler = actions[action]
		if (handler) {
			handler()
		} else {
			this.instance.log('warn', `Unknown MIDI CC action: ${action}`)
		}
	}

	// Close MIDI connections
	destroy() {
		if (this.midiIn) {
			try {
				this.midiIn.close()
			} catch (error) {
				this.instance.log('debug', `Error closing MIDI port: ${error.message || error}`)
			}
			this.midiIn = null
		}
		this.isConnected = false
		this.currentPortName = null
	}
}
