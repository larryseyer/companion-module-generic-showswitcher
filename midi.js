// MIDI Handler for Show Switcher Module using JZZ
import { createRequire } from 'module'
const require = createRequire(import.meta.url)

// Try to load JZZ
let JZZ = null
try {
	JZZ = require('jzz')
} catch (error) {
	console.warn('JZZ MIDI library not available:', error.message)
}

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
			3: 'camera_min_timer', // New - adjust minimum timer
			4: 'camera_max_timer', // New - adjust maximum timer
			5: 'overlay_min_timer', // New - adjust minimum timer
			6: 'overlay_max_timer', // New - adjust maximum timer
		}
	}

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
			// Initialize JZZ
			await JZZ().or('Cannot start MIDI engine!')

			// Get available MIDI input ports
			await this.refreshPorts()

			// Try to connect to configured port
			if (config.midi_port_name) {
				// Try to find port by name
				const port = this.availablePorts.find((p) => p.name.toLowerCase().includes(config.midi_port_name.toLowerCase()))
				if (port) {
					await this.openPort(port.index)
				} else {
					this.instance.log('warn', `MIDI port "${config.midi_port_name}" not found`)
				}
			} else if (
				config.midi_port_index !== undefined &&
				config.midi_port_index >= 0 &&
				config.midi_port_index < this.availablePorts.length
			) {
				// Open by index
				await this.openPort(config.midi_port_index)
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

	async refreshPorts() {
		if (!JZZ) {
			this.instance.log('debug', 'JZZ not available for port refresh')
			return
		}

		try {
			// Initialize JZZ first
			const jazz = await JZZ().or('Cannot start MIDI engine!')
			const info = await jazz.info()

			this.availablePorts = []

			// Get input ports
			if (info.inputs && info.inputs.length > 0) {
				info.inputs.forEach((port) => {
					// Filter out virtual/internal ports but be less restrictive
					const portName = port.name || 'Unknown MIDI Device'
					if (!portName.includes('Midi Through')) {
						this.availablePorts.push({
							index: this.availablePorts.length,
							name: portName,
							id: port.id || portName,
						})
						this.instance.log('info', `Found MIDI Port ${this.availablePorts.length - 1}: ${portName}`)
					}
				})
			}

			// Also check if there are any other ways to get ports
			if (this.availablePorts.length === 0) {
				// Try alternative method
				const inputs = jazz.info().inputs
				if (inputs) {
					this.instance.log('debug', `Raw inputs: ${JSON.stringify(inputs)}`)
				}
			}

			this.instance.log('info', `Total MIDI input ports found: ${this.availablePorts.length}`)

			// Store available ports for UI
			this.instance.midiPorts = this.availablePorts

			// Update the dropdown choices for the instance
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

	async openPort(portIndex) {
		if (!JZZ) {
			this.instance.log('warn', 'MIDI support not available')
			return
		}

		try {
			// Close existing port if open
			if (this.midiIn) {
				this.midiIn.close()
				this.midiIn = null
				this.isConnected = false
			}

			// Check if port index is valid
			if (portIndex < 0 || portIndex >= this.availablePorts.length) {
				this.instance.log('error', `Invalid MIDI port index: ${portIndex}`)
				return
			}

			const port = this.availablePorts[portIndex]
			this.currentPortName = port.name

			// Open the MIDI input port
			this.midiIn = await JZZ().openMidiIn(port.name).or(`Cannot open MIDI port: ${port.name}`)

			// Set up message handler
			this.midiIn.connect((msg) => {
				this.handleMidiMessage(msg)
			})

			this.isConnected = true
			this.instance.log('info', `Connected to MIDI port ${portIndex}: ${port.name}`)

			// Update variables
			this.instance.setVariableValues({
				midi_status: 'Connected',
				midi_port: port.name,
			})
		} catch (error) {
			this.instance.log('error', `Failed to open MIDI port ${portIndex}: ${error.message || error}`)
			this.isConnected = false
			this.instance.setVariableValues({
				midi_status: 'Error',
				midi_port: 'None',
			})
		}
	}

	handleMidiMessage(msg) {
		if (!msg || (!msg.isNoteOn && !msg.isNoteOff && !msg.isControlChange)) return

		try {
			// Note On message
			if (msg.isNoteOn() && msg.getVelocity() > 0) {
				const note = msg.getNote()
				const velocity = msg.getVelocity()

				// Update last note variable
				this.instance.setVariableValues({
					midi_last_note: `Note ${note} (vel: ${velocity})`,
				})

				// Log MIDI activity if debug logging is enabled
				if (this.instance.config.enable_logging) {
					this.instance.log('debug', `MIDI Note On: Note=${note}, Velocity=${velocity}, Channel=${msg.getChannel()}`)
				}

				// Look up command for this note
				const mappedCommand = this.noteMap[note]
				if (mappedCommand) {
					this.instance.log('info', `MIDI Note ${note} -> ${mappedCommand}`)
					this.handleCommand(mappedCommand, velocity)
				}
			}

			// Note Off message
			if (msg.isNoteOff() || (msg.isNoteOn() && msg.getVelocity() === 0)) {
				if (this.instance.config.enable_logging) {
					this.instance.log('debug', `MIDI Note Off: Note=${msg.getNote()}, Channel=${msg.getChannel()}`)
				}
			}

			// Control Change message
			if (msg.isControlChange()) {
				const cc = msg.getController()
				const value = msg.getValue()

				// Update last CC variable
				this.instance.setVariableValues({
					midi_last_cc: `CC${cc}: ${value}`,
				})

				// Log MIDI activity if debug logging is enabled
				if (this.instance.config.enable_logging) {
					this.instance.log('debug', `MIDI CC: Controller=${cc}, Value=${value}, Channel=${msg.getChannel()}`)
				}

				const ccFunction = this.ccMap[cc]

				if (ccFunction === 'camera_timer') {
					// Map CC value (0-127) to seconds range
					const minSeconds = this.instance.config.camera_min_seconds || 15
					const maxSeconds = this.instance.config.camera_max_seconds || 30
					const seconds = Math.round((value / 127) * (maxSeconds - minSeconds) + minSeconds)
					this.instance.setCameraCountdown(seconds)
					this.instance.log('info', `Camera timer set to ${seconds}s via MIDI CC${cc}`)
				} else if (ccFunction === 'overlay_timer') {
					// Map CC value (0-127) to seconds range
					const minSeconds = this.instance.config.overlay_min_seconds || 600
					const maxSeconds = this.instance.config.overlay_max_seconds || 900
					const seconds = Math.round((value / 127) * (maxSeconds - minSeconds) + minSeconds)
					this.instance.setOverlayCountdown(seconds)
					this.instance.log('info', `Overlay timer set to ${seconds}s via MIDI CC${cc}`)
				} else if (ccFunction === 'camera_min_timer') {
					// Adjust camera minimum timer
					const seconds = Math.round((value / 127) * 60) + 1 // 1-60 seconds
					this.instance.cameraSwitcher.minSeconds = seconds
					this.instance.log('info', `Camera min timer set to ${seconds}s via MIDI CC${cc}`)
				} else if (ccFunction === 'camera_max_timer') {
					// Adjust camera maximum timer
					const seconds = Math.round((value / 127) * 300) + 10 // 10-310 seconds
					this.instance.cameraSwitcher.maxSeconds = seconds
					this.instance.log('info', `Camera max timer set to ${seconds}s via MIDI CC${cc}`)
				} else if (ccFunction === 'overlay_min_timer') {
					// Adjust overlay minimum timer
					const seconds = Math.round((value / 127) * 1200) + 60 // 60-1260 seconds
					this.instance.overlaySwitcher.minSeconds = seconds
					this.instance.log('info', `Overlay min timer set to ${seconds}s via MIDI CC${cc}`)
				} else if (ccFunction === 'overlay_max_timer') {
					// Adjust overlay maximum timer
					const seconds = Math.round((value / 127) * 1800) + 300 // 300-2100 seconds
					this.instance.overlaySwitcher.maxSeconds = seconds
					this.instance.log('info', `Overlay max timer set to ${seconds}s via MIDI CC${cc}`)
				}
			}
		} catch (error) {
			this.instance.log('error', `Error handling MIDI message: ${error.message}`)
		}
	}

	handleCommand(command, velocity = 127) {
		switch (command) {
			case 'system_on':
				this.instance.startSystem()
				break
			case 'system_off':
				this.instance.stopSystem()
				break
			case 'system_reset':
				this.instance.resetSystem()
				break
			case 'system_toggle':
				if (this.instance.systemState.isRunning) {
					this.instance.stopSystem()
				} else {
					this.instance.startSystem()
				}
				break
			case 'system_pause':
				this.instance.pauseSystem()
				break
			case 'system_resume':
				this.instance.resumeSystem()
				break
			case 'camera_on':
				this.instance.startCameraSwitcher()
				break
			case 'camera_off':
				this.instance.stopCameraSwitcher()
				break
			case 'camera_manual':
				this.instance.manualTriggerCamera()
				break
			case 'camera_toggle':
				if (this.instance.cameraSwitcher.isRunning) {
					this.instance.stopCameraSwitcher()
				} else {
					this.instance.startCameraSwitcher()
				}
				break
			case 'camera_mode_toggle':
				this.instance.cameraSwitcher.sequentialMode = !this.instance.cameraSwitcher.sequentialMode
				this.instance.log(
					'info',
					`Camera mode: ${this.instance.cameraSwitcher.sequentialMode ? 'Sequential' : 'Random'}`
				)
				this.instance.updateVariables()
				break
			case 'overlay_on':
				this.instance.startOverlaySwitcher()
				break
			case 'overlay_off':
				this.instance.stopOverlaySwitcher()
				break
			case 'overlay_manual':
				this.instance.manualTriggerOverlay()
				break
			case 'overlay_toggle':
				if (this.instance.overlaySwitcher.isRunning) {
					this.instance.stopOverlaySwitcher()
				} else {
					this.instance.startOverlaySwitcher()
				}
				break
			case 'overlay_mode_toggle':
				this.instance.overlaySwitcher.sequentialMode = !this.instance.overlaySwitcher.sequentialMode
				this.instance.log(
					'info',
					`Overlay mode: ${this.instance.overlaySwitcher.sequentialMode ? 'Sequential' : 'Random'}`
				)
				this.instance.updateVariables()
				break
			default:
				this.instance.log('warn', `Unknown MIDI command: ${command}`)
		}
	}

	getMidiPorts() {
		return this.availablePorts.map((port) => ({
			id: port.index,
			label: port.name,
		}))
	}

	destroy() {
		if (this.midiIn) {
			try {
				// Remove all listeners first
				this.midiIn.removeAllListeners()
				// Close the port
				this.midiIn.close()
				this.instance.log('info', 'MIDI port closed')
			} catch (error) {
				this.instance.log('error', `Error closing MIDI port: ${error.message}`)
			}
			this.midiIn = null
		}

		// Force cleanup JZZ if it exists
		if (JZZ) {
			try {
				// Close all MIDI connections
				JZZ().close()
			} catch (error) {
				// Ignore errors during cleanup
			}
		}

		this.isConnected = false
		this.currentPortName = null
		this.availablePorts = []
		this.instance.setVariableValues({
			midi_status: 'Disconnected',
			midi_port: 'None',
		})
	}
}
