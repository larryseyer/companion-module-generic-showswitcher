export function getActions(self) {
	return {
		// System Actions
		system_on: {
			name: 'System ON',
			options: [],
			callback: async () => {
				self.startSystem()
			},
		},
		system_off: {
			name: 'System OFF',
			options: [],
			callback: async () => {
				await self.stopSystem()
			},
		},
		system_reset: {
			name: 'System Reset',
			options: [],
			callback: async () => {
				self.resetSystem()
			},
		},
		system_toggle: {
			name: 'System Toggle',
			options: [],
			callback: async () => {
				if (self.systemState.isRunning) {
					await self.stopSystem()
				} else {
					self.startSystem()
				}
			},
		},
		system_pause: {
			name: 'System Pause',
			options: [],
			callback: async () => {
				self.pauseSystem()
			},
		},
		system_resume: {
			name: 'System Resume',
			options: [],
			callback: async () => {
				self.resumeSystem()
			},
		},

		// Camera Actions
		camera_on: {
			name: 'Camera ON',
			options: [],
			callback: async () => {
				self.startCameraSwitcher()
			},
		},
		camera_off: {
			name: 'Camera OFF',
			options: [],
			callback: async () => {
				self.stopCameraSwitcher()
			},
		},
		camera_manual: {
			name: 'Camera Manual Trigger',
			options: [],
			callback: async () => {
				self.manualTriggerCamera()
			},
		},
		camera_toggle: {
			name: 'Camera Toggle',
			options: [],
			callback: async () => {
				if (self.cameraSwitcher.isRunning) {
					self.stopCameraSwitcher()
				} else {
					self.startCameraSwitcher()
				}
			},
		},
		camera_set_timer: {
			name: 'Set Camera Timer',
			options: [
				{
					type: 'number',
					label: 'Seconds',
					id: 'seconds',
					default: 30,
					min: 1,
					max: 3600,
					useVariables: true,
				},
			],
			callback: async (action) => {
				const seconds = await self.parseVariablesInString(action.options.seconds)
				self.setCameraCountdown(parseInt(seconds))
			},
		},
		camera_set_range: {
			name: 'Set Camera Timer Range',
			options: [
				{
					type: 'number',
					label: 'Minimum Seconds',
					id: 'min_seconds',
					default: 15,
					min: 1,
					max: 3600,
					useVariables: true,
				},
				{
					type: 'number',
					label: 'Maximum Seconds',
					id: 'max_seconds',
					default: 30,
					min: 1,
					max: 3600,
					useVariables: true,
				},
			],
			callback: async (action) => {
				const min = await self.parseVariablesInString(action.options.min_seconds)
				const max = await self.parseVariablesInString(action.options.max_seconds)
				self.cameraSwitcher.minSeconds = parseInt(min)
				self.cameraSwitcher.maxSeconds = parseInt(max)
				self.log('info', `Camera timer range set to ${min}-${max} seconds`)
			},
		},
		camera_set_mode: {
			name: 'Set Camera Selection Mode',
			options: [
				{
					type: 'dropdown',
					label: 'Mode',
					id: 'mode',
					default: 'random',
					choices: [
						{ id: 'random', label: 'Random' },
						{ id: 'sequential', label: 'Sequential' },
					],
				},
			],
			callback: async (action) => {
				self.cameraSwitcher.sequentialMode = action.options.mode === 'sequential'
				self.cameraSwitcher.sequentialIndex = 0
				self.log('info', `Camera mode set to ${action.options.mode}`)
				self.updateVariables()
			},
		},
		// NEW: Camera Mode Toggle action for simplified preset
		camera_mode_toggle: {
			name: 'Toggle Camera Mode',
			options: [],
			callback: async () => {
				self.cameraSwitcher.sequentialMode = !self.cameraSwitcher.sequentialMode
				self.cameraSwitcher.sequentialIndex = 0
				const mode = self.cameraSwitcher.sequentialMode ? 'sequential' : 'random'
				self.log('info', `Camera mode toggled to ${mode}`)
				self.updateVariables()
			},
		},

		// Overlay Actions
		overlay_on: {
			name: 'Overlay ON',
			options: [],
			callback: async () => {
				self.startOverlaySwitcher()
			},
		},
		overlay_off: {
			name: 'Overlay OFF',
			options: [],
			callback: async () => {
				self.stopOverlaySwitcher()
			},
		},
		overlay_manual: {
			name: 'Overlay Manual Trigger',
			options: [],
			callback: async () => {
				self.manualTriggerOverlay()
			},
		},
		overlay_toggle: {
			name: 'Overlay Toggle',
			options: [],
			callback: async () => {
				if (self.overlaySwitcher.isRunning) {
					self.stopOverlaySwitcher()
				} else {
					self.startOverlaySwitcher()
				}
			},
		},
		overlay_set_timer: {
			name: 'Set Overlay Timer',
			options: [
				{
					type: 'number',
					label: 'Seconds',
					id: 'seconds',
					default: 600,
					min: 1,
					max: 7200,
					useVariables: true,
				},
			],
			callback: async (action) => {
				const seconds = await self.parseVariablesInString(action.options.seconds)
				self.setOverlayCountdown(parseInt(seconds))
			},
		},
		overlay_set_range: {
			name: 'Set Overlay Timer Range',
			options: [
				{
					type: 'number',
					label: 'Minimum Seconds',
					id: 'min_seconds',
					default: 600,
					min: 1,
					max: 7200,
					useVariables: true,
				},
				{
					type: 'number',
					label: 'Maximum Seconds',
					id: 'max_seconds',
					default: 900,
					min: 1,
					max: 7200,
					useVariables: true,
				},
			],
			callback: async (action) => {
				const min = await self.parseVariablesInString(action.options.min_seconds)
				const max = await self.parseVariablesInString(action.options.max_seconds)
				self.overlaySwitcher.minSeconds = parseInt(min)
				self.overlaySwitcher.maxSeconds = parseInt(max)
				self.log('info', `Overlay timer range set to ${min}-${max} seconds`)
			},
		},
		overlay_set_mode: {
			name: 'Set Overlay Selection Mode',
			options: [
				{
					type: 'dropdown',
					label: 'Mode',
					id: 'mode',
					default: 'random',
					choices: [
						{ id: 'random', label: 'Random' },
						{ id: 'sequential', label: 'Sequential' },
					],
				},
			],
			callback: async (action) => {
				self.overlaySwitcher.sequentialMode = action.options.mode === 'sequential'
				self.overlaySwitcher.sequentialIndex = 0
				self.log('info', `Overlay mode set to ${action.options.mode}`)
				self.updateVariables()
			},
		},
		// NEW: Overlay Mode Toggle action for simplified preset
		overlay_mode_toggle: {
			name: 'Toggle Overlay Mode',
			options: [],
			callback: async () => {
				self.overlaySwitcher.sequentialMode = !self.overlaySwitcher.sequentialMode
				self.overlaySwitcher.sequentialIndex = 0
				const mode = self.overlaySwitcher.sequentialMode ? 'sequential' : 'random'
				self.log('info', `Overlay mode toggled to ${mode}`)
				self.updateVariables()
			},
		},

		// Button Management Actions
		camera_add_button: {
			name: 'Add Camera Button',
			options: [
				{
					type: 'textinput',
					label: 'Button Location (page/bank/button)',
					id: 'button',
					default: '2/1/0',
					useVariables: true,
				},
			],
			callback: async (action) => {
				const button = await self.parseVariablesInString(action.options.button)
				if (!self.cameraSwitcher.buttons.includes(button)) {
					self.cameraSwitcher.buttons.push(button)
					self.log('info', `Added camera button: ${button}`)
				}
			},
		},
		camera_remove_button: {
			name: 'Remove Camera Button',
			options: [
				{
					type: 'textinput',
					label: 'Button Location (page/bank/button)',
					id: 'button',
					default: '2/1/0',
					useVariables: true,
				},
			],
			callback: async (action) => {
				const button = await self.parseVariablesInString(action.options.button)
				const index = self.cameraSwitcher.buttons.indexOf(button)
				if (index > -1) {
					self.cameraSwitcher.buttons.splice(index, 1)
					self.log('info', `Removed camera button: ${button}`)
				}
			},
		},
		camera_blacklist_button: {
			name: 'Temporarily Blacklist Camera Button',
			options: [
				{
					type: 'textinput',
					label: 'Button Location (page/bank/button)',
					id: 'button',
					default: '2/1/0',
					useVariables: true,
				},
				{
					type: 'number',
					label: 'Duration (seconds, 0 = until reset)',
					id: 'duration',
					default: 60,
					min: 0,
					max: 3600,
					useVariables: true,
				},
			],
			callback: async (action) => {
				const button = await self.parseVariablesInString(action.options.button)
				const duration = parseInt(await self.parseVariablesInString(action.options.duration))

				if (!self.cameraSwitcher.blacklist.includes(button)) {
					self.cameraSwitcher.blacklist.push(button)
					self.log('info', `Blacklisted camera button: ${button}`)

					if (duration > 0) {
						setTimeout(() => {
							const idx = self.cameraSwitcher.blacklist.indexOf(button)
							if (idx > -1) {
								self.cameraSwitcher.blacklist.splice(idx, 1)
								self.log('info', `Removed blacklist for camera button: ${button}`)
							}
						}, duration * 1000)
					}
				}
			},
		},
		// NEW: Clear camera blacklist action
		camera_blacklist_clear: {
			name: 'Clear Camera Blacklist',
			options: [],
			callback: async () => {
				self.cameraSwitcher.blacklist = []
				self.log('info', 'Camera blacklist cleared')
			},
		},
		overlay_add_button: {
			name: 'Add Overlay Button',
			options: [
				{
					type: 'textinput',
					label: 'Button Location (page/bank/button)',
					id: 'button',
					default: '2/2/1',
					useVariables: true,
				},
			],
			callback: async (action) => {
				const button = await self.parseVariablesInString(action.options.button)
				if (!self.overlaySwitcher.buttons.includes(button)) {
					self.overlaySwitcher.buttons.push(button)
					self.log('info', `Added overlay button: ${button}`)
				}
			},
		},
		overlay_remove_button: {
			name: 'Remove Overlay Button',
			options: [
				{
					type: 'textinput',
					label: 'Button Location (page/bank/button)',
					id: 'button',
					default: '2/2/1',
					useVariables: true,
				},
			],
			callback: async (action) => {
				const button = await self.parseVariablesInString(action.options.button)
				const index = self.overlaySwitcher.buttons.indexOf(button)
				if (index > -1) {
					self.overlaySwitcher.buttons.splice(index, 1)
					self.log('info', `Removed overlay button: ${button}`)
				}
			},
		},
		overlay_blacklist_button: {
			name: 'Temporarily Blacklist Overlay Button',
			options: [
				{
					type: 'textinput',
					label: 'Button Location (page/bank/button)',
					id: 'button',
					default: '2/2/1',
					useVariables: true,
				},
				{
					type: 'number',
					label: 'Duration (seconds, 0 = until reset)',
					id: 'duration',
					default: 300,
					min: 0,
					max: 7200,
					useVariables: true,
				},
			],
			callback: async (action) => {
				const button = await self.parseVariablesInString(action.options.button)
				const duration = parseInt(await self.parseVariablesInString(action.options.duration))

				if (!self.overlaySwitcher.blacklist.includes(button)) {
					self.overlaySwitcher.blacklist.push(button)
					self.log('info', `Blacklisted overlay button: ${button}`)

					if (duration > 0) {
						setTimeout(() => {
							const idx = self.overlaySwitcher.blacklist.indexOf(button)
							if (idx > -1) {
								self.overlaySwitcher.blacklist.splice(idx, 1)
								self.log('info', `Removed blacklist for overlay button: ${button}`)
							}
						}, duration * 1000)
					}
				}
			},
		},
		// NEW: Clear overlay blacklist action
		overlay_blacklist_clear: {
			name: 'Clear Overlay Blacklist',
			options: [],
			callback: async () => {
				self.overlaySwitcher.blacklist = []
				self.log('info', 'Overlay blacklist cleared')
			},
		},

		// Counter Reset Actions
		reset_camera_counter: {
			name: 'Reset Camera Counter',
			options: [],
			callback: async () => {
				self.cameraSwitcher.triggerCount = 0
				self.updateVariables()
				self.log('info', 'Camera counter reset')
			},
		},
		reset_overlay_counter: {
			name: 'Reset Overlay Counter',
			options: [],
			callback: async () => {
				self.overlaySwitcher.triggerCount = 0
				self.updateVariables()
				self.log('info', 'Overlay counter reset')
			},
		},
		reset_statistics: {
			name: 'Reset All Statistics',
			options: [],
			callback: async () => {
				// Reset all statistics
				self.systemState.totalRuntime = 0
				self.systemState.sessionCount = 0
				self.cameraSwitcher.triggerCount = 0
				self.cameraSwitcher.averageInterval = 0
				self.cameraSwitcher.history = []
				self.overlaySwitcher.triggerCount = 0
				self.overlaySwitcher.averageInterval = 0
				self.overlaySwitcher.history = []
				self.performance.httpErrors = 0
				self.performance.httpSuccesses = 0
				self.performance.averageResponseTime = 0

				self.updateVariables()
				self.log('info', 'All statistics reset')
			},
		},
		// NEW: Clear specific statistics
		clear_statistics: {
			name: 'Clear Performance Statistics',
			options: [],
			callback: async () => {
				self.performance.httpErrors = 0
				self.performance.httpSuccesses = 0
				self.performance.averageResponseTime = 0
				self.updateVariables()
				self.log('info', 'Performance statistics cleared')
			},
		},
		// NEW: Save statistics action
		save_statistics: {
			name: 'Save Statistics',
			options: [],
			callback: async () => {
				await self.saveStatistics()
				self.log('info', 'Statistics saved')
			},
		},

		// Performance Actions
		clear_button_queue: {
			name: 'Clear Button Press Queue',
			options: [],
			callback: async () => {
				self.performance.buttonPressQueue = []
				self.updateVariables()
				self.log('info', 'Button press queue cleared')
			},
		},

		// MIDI Actions
		midi_connect: {
			name: 'MIDI Connect',
			options: [
				{
					type: 'dropdown',
					label: 'MIDI Port',
					id: 'port_index',
					default: 0,
					choices: self.midiPortChoices || [{ id: -1, label: 'No MIDI devices found' }],
				},
			],
			callback: async (action) => {
				// Initialize MIDI handler if needed
				if (!self.midiHandler) {
					try {
						const { MidiHandler } = await import('./midi.js')
						self.midiHandler = new MidiHandler(self)
						await self.midiHandler.refreshPorts()
						// Update actions to refresh the dropdown choices
						self.updateActions()
					} catch (error) {
						self.log('error', `Failed to initialize MIDI: ${error.message || error}`)
						return
					}
				}
				
				if (self.midiHandler && action.options.port_index >= 0) {
					await self.midiHandler.openPort(action.options.port_index)
				} else {
					self.log('warn', 'Invalid MIDI port selected')
				}
			},
		},
		midi_disconnect: {
			name: 'MIDI Disconnect',
			options: [],
			callback: async () => {
				if (self.midiHandler) {
					self.midiHandler.destroy()
					self.updateVariables()
					self.log('info', 'MIDI disconnected')
				}
			},
		},
		midi_toggle: {
			name: 'MIDI Toggle Connection',
			options: [],
			callback: async () => {
				try {
					if (self.midiHandler && self.midiHandler.isConnected) {
						// Disconnect if connected
						self.midiHandler.disconnect()
						self.updateVariables()
						self.log('info', 'MIDI disconnected')
					} else {
						// Initialize MIDI handler if needed using the imported class from main.js
						if (!self.midiHandler) {
							// Import is handled in main.js, we just need to create the instance
							const { MidiHandler } = await import('./midi.js')
							self.midiHandler = new MidiHandler(self)
						}

						// Refresh ports
						await self.midiHandler.refreshPorts()

						// Connect to first available port
						if (self.midiHandler.availablePorts && self.midiHandler.availablePorts.length > 0) {
							await self.midiHandler.openPort(0)
							self.updateVariables()
							self.log('info', `MIDI connected to ${self.midiHandler.availablePorts[0].name}`)
						} else {
							self.log('warn', 'No MIDI devices found')
							self.updateVariables()
						}
					}
				} catch (error) {
					self.log('error', `MIDI toggle error: ${error.message || error}`)
					self.updateVariables()
				}
			},
		},
		midi_refresh_ports: {
			name: 'MIDI Refresh Ports',
			options: [],
			callback: async () => {
				// Initialize MIDI handler if needed
				if (!self.midiHandler) {
					try {
						const { MidiHandler } = await import('./midi.js')
						self.midiHandler = new MidiHandler(self)
					} catch (error) {
						self.log('error', `Failed to initialize MIDI handler: ${error.message || error}`)
						return
					}
				}
				
				if (self.midiHandler) {
					await self.midiHandler.refreshPorts()
					// Update the action definitions to refresh dropdown choices
					self.updateActions()
					self.log('info', `MIDI ports refreshed: ${self.midiHandler.availablePorts.length} ports found`)
				}
			},
		},
		// NEW: Renamed for consistency
		midi_refresh: {
			name: 'MIDI Refresh',
			options: [],
			callback: async () => {
				// Initialize MIDI handler if needed
				if (!self.midiHandler) {
					try {
						const { MidiHandler } = await import('./midi.js')
						self.midiHandler = new MidiHandler(self)
					} catch (error) {
						self.log('error', `Failed to initialize MIDI handler: ${error.message || error}`)
						return
					}
				}
				
				if (self.midiHandler) {
					await self.midiHandler.refreshPorts()
					// Update the action definitions to refresh dropdown choices
					self.updateActions()
					self.log('info', `MIDI ports refreshed: ${self.midiHandler.availablePorts.length} ports found`)
				}
			},
		},

		// MIDI-Compatible Actions
		midi_camera_timer_cc: {
			name: 'Camera Timer from MIDI CC',
			options: [
				{
					type: 'number',
					label: 'CC Value (0-127)',
					id: 'cc_value',
					default: 64,
					min: 0,
					max: 127,
					useVariables: true,
					tooltip: 'Use $(midi:cc_value) to pass MIDI CC value',
				},
			],
			callback: async (action) => {
				const value = parseInt(await self.parseVariablesInString(action.options.cc_value))
				const minSeconds = self.config.camera_min_seconds || 15
				const maxSeconds = self.config.camera_max_seconds || 30
				const seconds = Math.round((value / 127) * (maxSeconds - minSeconds) + minSeconds)
				self.setCameraCountdown(seconds)
				self.log('info', `Camera timer set to ${seconds}s from CC value ${value}`)
			},
		},
		midi_overlay_timer_cc: {
			name: 'Overlay Timer from MIDI CC',
			options: [
				{
					type: 'number',
					label: 'CC Value (0-127)',
					id: 'cc_value',
					default: 64,
					min: 0,
					max: 127,
					useVariables: true,
					tooltip: 'Use $(midi:cc_value) to pass MIDI CC value',
				},
			],
			callback: async (action) => {
				const value = parseInt(await self.parseVariablesInString(action.options.cc_value))
				const minSeconds = self.config.overlay_min_seconds || 600
				const maxSeconds = self.config.overlay_max_seconds || 900
				const seconds = Math.round((value / 127) * (maxSeconds - minSeconds) + minSeconds)
				self.setOverlayCountdown(seconds)
				self.log('info', `Overlay timer set to ${seconds}s from CC value ${value}`)
			},
		},
	}
}
