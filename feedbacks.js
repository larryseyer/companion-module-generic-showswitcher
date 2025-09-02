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
				color: combineRgb(0, 0, 0),
			},
			options: [],
			callback: () => {
				return self.systemState.isRunning && !self.systemState.isPaused
			},
		},
		system_stopped: {
			type: 'boolean',
			name: 'System Stopped',
			description: 'Show when system is stopped',
			defaultStyle: {
				bgcolor: combineRgb(255, 0, 0),
				color: combineRgb(255, 255, 255),
			},
			options: [],
			callback: () => {
				return !self.systemState.isRunning
			},
		},
		system_paused: {
			type: 'boolean',
			name: 'System Paused',
			description: 'Show when system is paused',
			defaultStyle: {
				bgcolor: combineRgb(255, 255, 0),
				color: combineRgb(0, 0, 0),
			},
			options: [],
			callback: () => {
				return self.systemState.isRunning && self.systemState.isPaused
			},
		},

		// Camera Feedbacks
		camera_running: {
			type: 'boolean',
			name: 'Camera Running',
			description: 'Show when camera switcher is running',
			defaultStyle: {
				bgcolor: combineRgb(0, 255, 0),
				color: combineRgb(0, 0, 0),
			},
			options: [],
			callback: () => {
				return self.cameraSwitcher.isRunning
			},
		},
		camera_stopped: {
			type: 'boolean',
			name: 'Camera Stopped',
			description: 'Show when camera switcher is stopped',
			defaultStyle: {
				bgcolor: combineRgb(255, 0, 0),
				color: combineRgb(255, 255, 255),
			},
			options: [],
			callback: () => {
				return !self.cameraSwitcher.isRunning
			},
		},
		camera_countdown_below: {
			type: 'boolean',
			name: 'Camera Countdown Below',
			description: 'Show when camera countdown is below threshold',
			defaultStyle: {
				bgcolor: combineRgb(255, 255, 0),
				color: combineRgb(0, 0, 0),
			},
			options: [
				{
					type: 'number',
					label: 'Threshold (seconds)',
					id: 'threshold',
					default: 5,
					min: 1,
					max: 60,
				},
			],
			callback: (feedback) => {
				return (
					self.cameraSwitcher.isRunning &&
					self.cameraSwitcher.countdown <= feedback.options.threshold &&
					self.cameraSwitcher.countdown > 0
				)
			},
		},
		camera_next_button: {
			type: 'boolean',
			name: 'Camera Next Button Match',
			description: 'Show when specified button is next',
			defaultStyle: {
				bgcolor: combineRgb(0, 100, 255),
				color: combineRgb(255, 255, 255),
			},
			options: [
				{
					type: 'textinput',
					label: 'Button (page/bank/button)',
					id: 'button',
					default: '2/1/0',
				},
			],
			callback: (feedback) => {
				if (!self.cameraSwitcher.isRunning || self.cameraSwitcher.nextButtonIndex < 0) {
					return false
				}
				const nextButton = self.cameraSwitcher.buttons[self.cameraSwitcher.nextButtonIndex]
				return nextButton === feedback.options.button
			},
		},
		camera_sequential_mode: {
			type: 'boolean',
			name: 'Camera Sequential Mode',
			description: 'Show when camera is in sequential mode',
			defaultStyle: {
				bgcolor: combineRgb(100, 100, 255),
				color: combineRgb(255, 255, 255),
			},
			options: [],
			callback: () => {
				return self.cameraSwitcher.sequentialMode
			},
		},
		// NEW: Camera Random Mode feedback for better preset support
		camera_mode_random: {
			type: 'boolean',
			name: 'Camera Random Mode',
			description: 'Show when camera is in random mode',
			defaultStyle: {
				bgcolor: combineRgb(150, 0, 150),
				color: combineRgb(255, 255, 255),
			},
			options: [],
			callback: () => {
				return !self.cameraSwitcher.sequentialMode
			},
		},
		// NEW: Camera Mode Sequential feedback renamed for consistency
		camera_mode_sequential: {
			type: 'boolean',
			name: 'Camera Sequential Mode',
			description: 'Show when camera is in sequential mode',
			defaultStyle: {
				bgcolor: combineRgb(0, 150, 150),
				color: combineRgb(255, 255, 255),
			},
			options: [],
			callback: () => {
				return self.cameraSwitcher.sequentialMode
			},
		},

		// Overlay Feedbacks
		overlay_running: {
			type: 'boolean',
			name: 'Overlay Running',
			description: 'Show when overlay switcher is running',
			defaultStyle: {
				bgcolor: combineRgb(0, 255, 0),
				color: combineRgb(0, 0, 0),
			},
			options: [],
			callback: () => {
				return self.overlaySwitcher.isRunning
			},
		},
		overlay_stopped: {
			type: 'boolean',
			name: 'Overlay Stopped',
			description: 'Show when overlay switcher is stopped',
			defaultStyle: {
				bgcolor: combineRgb(255, 0, 0),
				color: combineRgb(255, 255, 255),
			},
			options: [],
			callback: () => {
				return !self.overlaySwitcher.isRunning
			},
		},
		overlay_countdown_below: {
			type: 'boolean',
			name: 'Overlay Countdown Below',
			description: 'Show when overlay countdown is below threshold',
			defaultStyle: {
				bgcolor: combineRgb(255, 255, 0),
				color: combineRgb(0, 0, 0),
			},
			options: [
				{
					type: 'number',
					label: 'Threshold (seconds)',
					id: 'threshold',
					default: 30,
					min: 1,
					max: 300,
				},
			],
			callback: (feedback) => {
				return (
					self.overlaySwitcher.isRunning &&
					self.overlaySwitcher.countdown <= feedback.options.threshold &&
					self.overlaySwitcher.countdown > 0
				)
			},
		},
		overlay_next_button: {
			type: 'boolean',
			name: 'Overlay Next Button Match',
			description: 'Show when specified button is next',
			defaultStyle: {
				bgcolor: combineRgb(255, 0, 255),
				color: combineRgb(255, 255, 255),
			},
			options: [
				{
					type: 'textinput',
					label: 'Button (page/bank/button)',
					id: 'button',
					default: '2/2/1',
				},
			],
			callback: (feedback) => {
				if (!self.overlaySwitcher.isRunning || self.overlaySwitcher.nextButtonIndex < 0) {
					return false
				}
				const nextButton = self.overlaySwitcher.buttons[self.overlaySwitcher.nextButtonIndex]
				return nextButton === feedback.options.button
			},
		},
		overlay_sequential_mode: {
			type: 'boolean',
			name: 'Overlay Sequential Mode',
			description: 'Show when overlay is in sequential mode',
			defaultStyle: {
				bgcolor: combineRgb(255, 100, 255),
				color: combineRgb(255, 255, 255),
			},
			options: [],
			callback: () => {
				return self.overlaySwitcher.sequentialMode
			},
		},
		// NEW: Overlay Random Mode feedback for better preset support
		overlay_mode_random: {
			type: 'boolean',
			name: 'Overlay Random Mode',
			description: 'Show when overlay is in random mode',
			defaultStyle: {
				bgcolor: combineRgb(150, 0, 150),
				color: combineRgb(255, 255, 255),
			},
			options: [],
			callback: () => {
				return !self.overlaySwitcher.sequentialMode
			},
		},
		// NEW: Overlay Mode Sequential feedback renamed for consistency
		overlay_mode_sequential: {
			type: 'boolean',
			name: 'Overlay Sequential Mode',
			description: 'Show when overlay is in sequential mode',
			defaultStyle: {
				bgcolor: combineRgb(0, 150, 150),
				color: combineRgb(255, 255, 255),
			},
			options: [],
			callback: () => {
				return self.overlaySwitcher.sequentialMode
			},
		},

		// Counter Feedbacks
		camera_count_above: {
			type: 'boolean',
			name: 'Camera Count Above',
			description: 'Show when camera trigger count is above threshold',
			defaultStyle: {
				bgcolor: combineRgb(100, 100, 255),
				color: combineRgb(255, 255, 255),
			},
			options: [
				{
					type: 'number',
					label: 'Threshold',
					id: 'threshold',
					default: 10,
					min: 0,
					max: 9999,
				},
			],
			callback: (feedback) => {
				return self.cameraSwitcher.triggerCount > feedback.options.threshold
			},
		},
		overlay_count_above: {
			type: 'boolean',
			name: 'Overlay Count Above',
			description: 'Show when overlay trigger count is above threshold',
			defaultStyle: {
				bgcolor: combineRgb(255, 100, 255),
				color: combineRgb(255, 255, 255),
			},
			options: [
				{
					type: 'number',
					label: 'Threshold',
					id: 'threshold',
					default: 5,
					min: 0,
					max: 9999,
				},
			],
			callback: (feedback) => {
				return self.overlaySwitcher.triggerCount > feedback.options.threshold
			},
		},

		// Duration Feedback
		system_duration_above: {
			type: 'boolean',
			name: 'System Duration Above',
			description: 'Show when system has been running longer than threshold',
			defaultStyle: {
				bgcolor: combineRgb(0, 200, 200),
				color: combineRgb(0, 0, 0),
			},
			options: [
				{
					type: 'number',
					label: 'Minutes',
					id: 'minutes',
					default: 30,
					min: 1,
					max: 1440,
				},
			],
			callback: (feedback) => {
				const thresholdSeconds = feedback.options.minutes * 60
				return self.systemState.isRunning && self.systemState.activeDuration > thresholdSeconds
			},
		},

		// Performance Feedbacks
		http_errors_above: {
			type: 'boolean',
			name: 'HTTP Errors Above',
			description: 'Show when HTTP error count is above threshold',
			defaultStyle: {
				bgcolor: combineRgb(255, 100, 0),
				color: combineRgb(255, 255, 255),
			},
			options: [
				{
					type: 'number',
					label: 'Error Count',
					id: 'threshold',
					default: 5,
					min: 1,
					max: 100,
				},
			],
			callback: (feedback) => {
				return self.performance.httpErrors > feedback.options.threshold
			},
		},
		// NEW: HTTP Errors High feedback for simplified presets
		http_errors_high: {
			type: 'boolean',
			name: 'HTTP Errors High',
			description: 'Show when HTTP error rate is above 10%',
			defaultStyle: {
				bgcolor: combineRgb(255, 100, 0),
				color: combineRgb(0, 0, 0),
			},
			options: [],
			callback: () => {
				const total = self.performance.httpSuccesses + self.performance.httpErrors
				if (total === 0) return false
				const errorRate = self.performance.httpErrors / total
				return errorRate > 0.1 // 10% error rate
			},
		},
		queue_size_above: {
			type: 'boolean',
			name: 'Queue Size Above',
			description: 'Show when button press queue size is above threshold',
			defaultStyle: {
				bgcolor: combineRgb(255, 200, 0),
				color: combineRgb(0, 0, 0),
			},
			options: [
				{
					type: 'number',
					label: 'Queue Size',
					id: 'threshold',
					default: 3,
					min: 1,
					max: 20,
				},
			],
			callback: (feedback) => {
				return self.performance.buttonPressQueue.length > feedback.options.threshold
			},
		},
		// NEW: Queue Full feedback for simplified presets
		queue_full: {
			type: 'boolean',
			name: 'Queue Full',
			description: 'Show when button press queue is full',
			defaultStyle: {
				bgcolor: combineRgb(255, 0, 0),
				color: combineRgb(255, 255, 255),
			},
			options: [],
			callback: () => {
				return self.performance.buttonPressQueue.length > 10
			},
		},

		// MIDI Feedbacks
		midi_connected: {
			type: 'boolean',
			name: 'MIDI Connected',
			description: 'Show when MIDI device is connected',
			defaultStyle: {
				bgcolor: combineRgb(255, 0, 255),
				color: combineRgb(255, 255, 255),
			},
			options: [],
			callback: () => {
				return self.midiHandler && self.midiHandler.isConnected
			},
		},
		midi_disconnected: {
			type: 'boolean',
			name: 'MIDI Disconnected',
			description: 'Show when MIDI device is disconnected',
			defaultStyle: {
				bgcolor: combineRgb(100, 100, 100),
				color: combineRgb(255, 255, 255),
			},
			options: [],
			callback: () => {
				return !self.midiHandler || !self.midiHandler.isConnected
			},
		},
		midi_activity: {
			type: 'boolean',
			name: 'MIDI Activity',
			description: 'Flash on MIDI activity',
			defaultStyle: {
				bgcolor: combineRgb(255, 255, 0),
				color: combineRgb(0, 0, 0),
			},
			options: [],
			callback: () => {
				// This would need to be implemented with a short-lived flag
				// that gets set when MIDI messages are received
				return false
			},
		},
		// NEW: Statistics Saved feedback for visual confirmation
		statistics_saved: {
			type: 'boolean',
			name: 'Statistics Saved',
			description: 'Flash when statistics are saved',
			defaultStyle: {
				bgcolor: combineRgb(0, 255, 0),
				color: combineRgb(0, 0, 0),
			},
			options: [],
			callback: () => {
				// This would need to be implemented with a short-lived flag
				// that gets set when statistics are saved
				return false
			},
		},
	}
}
