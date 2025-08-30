import { combineRgb } from '@companion-module/base'

export function getFeedbacks(self) {
	return {
		// System Feedbacks
		system_running: {
			type: 'boolean',
			name: 'System Running',
			description: 'Show when system is running',
			defaultStyle: {
				bgcolor: combineRgb(0, 255, 0),
				color: combineRgb(0, 0, 0)
			},
			options: [],
			callback: () => {
				return self.systemState.isRunning
			}
		},
		system_stopped: {
			type: 'boolean',
			name: 'System Stopped',
			description: 'Show when system is stopped',
			defaultStyle: {
				bgcolor: combineRgb(255, 0, 0),
				color: combineRgb(255, 255, 255)
			},
			options: [],
			callback: () => {
				return !self.systemState.isRunning
			}
		},

		// Camera Feedbacks
		camera_running: {
			type: 'boolean',
			name: 'Camera Running',
			description: 'Show when camera switcher is running',
			defaultStyle: {
				bgcolor: combineRgb(0, 255, 0),
				color: combineRgb(0, 0, 0)
			},
			options: [],
			callback: () => {
				return self.cameraSwitcher.isRunning
			}
		},
		camera_stopped: {
			type: 'boolean',
			name: 'Camera Stopped',
			description: 'Show when camera switcher is stopped',
			defaultStyle: {
				bgcolor: combineRgb(255, 0, 0),
				color: combineRgb(255, 255, 255)
			},
			options: [],
			callback: () => {
				return !self.cameraSwitcher.isRunning
			}
		},
		camera_countdown_below: {
			type: 'boolean',
			name: 'Camera Countdown Below',
			description: 'Show when camera countdown is below threshold',
			defaultStyle: {
				bgcolor: combineRgb(255, 255, 0),
				color: combineRgb(0, 0, 0)
			},
			options: [
				{
					type: 'number',
					label: 'Threshold (seconds)',
					id: 'threshold',
					default: 5,
					min: 1,
					max: 60
				}
			],
			callback: (feedback) => {
				return self.cameraSwitcher.isRunning && 
					   self.cameraSwitcher.countdown <= feedback.options.threshold &&
					   self.cameraSwitcher.countdown > 0
			}
		},
		camera_next_button: {
			type: 'boolean',
			name: 'Camera Next Button Match',
			description: 'Show when specified button is next',
			defaultStyle: {
				bgcolor: combineRgb(0, 100, 255),
				color: combineRgb(255, 255, 255)
			},
			options: [
				{
					type: 'textinput',
					label: 'Button (page/bank/button)',
					id: 'button',
					default: '2/1/0'
				}
			],
			callback: (feedback) => {
				if (!self.cameraSwitcher.isRunning || self.cameraSwitcher.nextButtonIndex < 0) {
					return false
				}
				const nextButton = self.cameraSwitcher.buttons[self.cameraSwitcher.nextButtonIndex]
				return nextButton === feedback.options.button
			}
		},

		// Overlay Feedbacks
		overlay_running: {
			type: 'boolean',
			name: 'Overlay Running',
			description: 'Show when overlay switcher is running',
			defaultStyle: {
				bgcolor: combineRgb(0, 255, 0),
				color: combineRgb(0, 0, 0)
			},
			options: [],
			callback: () => {
				return self.overlaySwitcher.isRunning
			}
		},
		overlay_stopped: {
			type: 'boolean',
			name: 'Overlay Stopped',
			description: 'Show when overlay switcher is stopped',
			defaultStyle: {
				bgcolor: combineRgb(255, 0, 0),
				color: combineRgb(255, 255, 255)
			},
			options: [],
			callback: () => {
				return !self.overlaySwitcher.isRunning
			}
		},
		overlay_countdown_below: {
			type: 'boolean',
			name: 'Overlay Countdown Below',
			description: 'Show when overlay countdown is below threshold',
			defaultStyle: {
				bgcolor: combineRgb(255, 255, 0),
				color: combineRgb(0, 0, 0)
			},
			options: [
				{
					type: 'number',
					label: 'Threshold (seconds)',
					id: 'threshold',
					default: 30,
					min: 1,
					max: 300
				}
			],
			callback: (feedback) => {
				return self.overlaySwitcher.isRunning && 
					   self.overlaySwitcher.countdown <= feedback.options.threshold &&
					   self.overlaySwitcher.countdown > 0
			}
		},
		overlay_next_button: {
			type: 'boolean',
			name: 'Overlay Next Button Match',
			description: 'Show when specified button is next',
			defaultStyle: {
				bgcolor: combineRgb(255, 0, 255),
				color: combineRgb(255, 255, 255)
			},
			options: [
				{
					type: 'textinput',
					label: 'Button (page/bank/button)',
					id: 'button',
					default: '2/2/1'
				}
			],
			callback: (feedback) => {
				if (!self.overlaySwitcher.isRunning || self.overlaySwitcher.nextButtonIndex < 0) {
					return false
				}
				const nextButton = self.overlaySwitcher.buttons[self.overlaySwitcher.nextButtonIndex]
				return nextButton === feedback.options.button
			}
		},

		// Counter Feedbacks
		camera_count_above: {
			type: 'boolean',
			name: 'Camera Count Above',
			description: 'Show when camera trigger count is above threshold',
			defaultStyle: {
				bgcolor: combineRgb(100, 100, 255),
				color: combineRgb(255, 255, 255)
			},
			options: [
				{
					type: 'number',
					label: 'Threshold',
					id: 'threshold',
					default: 10,
					min: 0,
					max: 9999
				}
			],
			callback: (feedback) => {
				return self.cameraSwitcher.triggerCount > feedback.options.threshold
			}
		},
		overlay_count_above: {
			type: 'boolean',
			name: 'Overlay Count Above',
			description: 'Show when overlay trigger count is above threshold',
			defaultStyle: {
				bgcolor: combineRgb(255, 100, 255),
				color: combineRgb(255, 255, 255)
			},
			options: [
				{
					type: 'number',
					label: 'Threshold',
					id: 'threshold',
					default: 5,
					min: 0,
					max: 9999
				}
			],
			callback: (feedback) => {
				return self.overlaySwitcher.triggerCount > feedback.options.threshold
			}
		},

		// Duration Feedback
		system_duration_above: {
			type: 'boolean',
			name: 'System Duration Above',
			description: 'Show when system has been running longer than threshold',
			defaultStyle: {
				bgcolor: combineRgb(0, 200, 200),
				color: combineRgb(0, 0, 0)
			},
			options: [
				{
					type: 'number',
					label: 'Minutes',
					id: 'minutes',
					default: 30,
					min: 1,
					max: 1440
				}
			],
			callback: (feedback) => {
				const thresholdSeconds = feedback.options.minutes * 60
				return self.systemState.isRunning && self.systemState.activeDuration > thresholdSeconds
			}
		}
	}
}