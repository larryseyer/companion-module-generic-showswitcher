export function getActions(self) {
	return {
		// System Actions
		system_on: {
			name: 'System ON',
			options: [],
			callback: async () => {
				self.startSystem()
			}
		},
		system_off: {
			name: 'System OFF',
			options: [],
			callback: async () => {
				self.stopSystem()
			}
		},
		system_reset: {
			name: 'System Reset',
			options: [],
			callback: async () => {
				self.resetSystem()
			}
		},
		system_toggle: {
			name: 'System Toggle',
			options: [],
			callback: async () => {
				if (self.systemState.isRunning) {
					self.stopSystem()
				} else {
					self.startSystem()
				}
			}
		},

		// Camera Actions
		camera_on: {
			name: 'Camera ON',
			options: [],
			callback: async () => {
				self.startCameraSwitcher()
			}
		},
		camera_off: {
			name: 'Camera OFF',
			options: [],
			callback: async () => {
				self.stopCameraSwitcher()
			}
		},
		camera_manual: {
			name: 'Camera Manual Trigger',
			options: [],
			callback: async () => {
				self.manualTriggerCamera()
			}
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
			}
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
					useVariables: true
				}
			],
			callback: async (action) => {
				const seconds = await self.parseVariablesInString(action.options.seconds)
				self.setCameraCountdown(parseInt(seconds))
			}
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
					useVariables: true
				},
				{
					type: 'number',
					label: 'Maximum Seconds',
					id: 'max_seconds',
					default: 30,
					min: 1,
					max: 3600,
					useVariables: true
				}
			],
			callback: async (action) => {
				const min = await self.parseVariablesInString(action.options.min_seconds)
				const max = await self.parseVariablesInString(action.options.max_seconds)
				self.cameraSwitcher.minSeconds = parseInt(min)
				self.cameraSwitcher.maxSeconds = parseInt(max)
				self.log('info', `Camera timer range set to ${min}-${max} seconds`)
			}
		},

		// Overlay Actions
		overlay_on: {
			name: 'Overlay ON',
			options: [],
			callback: async () => {
				self.startOverlaySwitcher()
			}
		},
		overlay_off: {
			name: 'Overlay OFF',
			options: [],
			callback: async () => {
				self.stopOverlaySwitcher()
			}
		},
		overlay_manual: {
			name: 'Overlay Manual Trigger',
			options: [],
			callback: async () => {
				self.manualTriggerOverlay()
			}
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
			}
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
					useVariables: true
				}
			],
			callback: async (action) => {
				const seconds = await self.parseVariablesInString(action.options.seconds)
				self.setOverlayCountdown(parseInt(seconds))
			}
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
					useVariables: true
				},
				{
					type: 'number',
					label: 'Maximum Seconds',
					id: 'max_seconds',
					default: 900,
					min: 1,
					max: 7200,
					useVariables: true
				}
			],
			callback: async (action) => {
				const min = await self.parseVariablesInString(action.options.min_seconds)
				const max = await self.parseVariablesInString(action.options.max_seconds)
				self.overlaySwitcher.minSeconds = parseInt(min)
				self.overlaySwitcher.maxSeconds = parseInt(max)
				self.log('info', `Overlay timer range set to ${min}-${max} seconds`)
			}
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
					useVariables: true
				}
			],
			callback: async (action) => {
				const button = await self.parseVariablesInString(action.options.button)
				if (!self.cameraSwitcher.buttons.includes(button)) {
					self.cameraSwitcher.buttons.push(button)
					self.log('info', `Added camera button: ${button}`)
				}
			}
		},
		camera_remove_button: {
			name: 'Remove Camera Button',
			options: [
				{
					type: 'textinput',
					label: 'Button Location (page/bank/button)',
					id: 'button',
					default: '2/1/0',
					useVariables: true
				}
			],
			callback: async (action) => {
				const button = await self.parseVariablesInString(action.options.button)
				const index = self.cameraSwitcher.buttons.indexOf(button)
				if (index > -1) {
					self.cameraSwitcher.buttons.splice(index, 1)
					self.log('info', `Removed camera button: ${button}`)
				}
			}
		},
		overlay_add_button: {
			name: 'Add Overlay Button',
			options: [
				{
					type: 'textinput',
					label: 'Button Location (page/bank/button)',
					id: 'button',
					default: '2/2/1',
					useVariables: true
				}
			],
			callback: async (action) => {
				const button = await self.parseVariablesInString(action.options.button)
				if (!self.overlaySwitcher.buttons.includes(button)) {
					self.overlaySwitcher.buttons.push(button)
					self.log('info', `Added overlay button: ${button}`)
				}
			}
		},
		overlay_remove_button: {
			name: 'Remove Overlay Button',
			options: [
				{
					type: 'textinput',
					label: 'Button Location (page/bank/button)',
					id: 'button',
					default: '2/2/1',
					useVariables: true
				}
			],
			callback: async (action) => {
				const button = await self.parseVariablesInString(action.options.button)
				const index = self.overlaySwitcher.buttons.indexOf(button)
				if (index > -1) {
					self.overlaySwitcher.buttons.splice(index, 1)
					self.log('info', `Removed overlay button: ${button}`)
				}
			}
		},

		// Counter Reset Actions
		reset_camera_counter: {
			name: 'Reset Camera Counter',
			options: [],
			callback: async () => {
				self.cameraSwitcher.triggerCount = 0
				self.updateVariables()
				self.log('info', 'Camera counter reset')
			}
		},
		reset_overlay_counter: {
			name: 'Reset Overlay Counter',
			options: [],
			callback: async () => {
				self.overlaySwitcher.triggerCount = 0
				self.updateVariables()
				self.log('info', 'Overlay counter reset')
			}
		}
	}
}