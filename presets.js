import { combineRgb } from '@companion-module/base'

export function getPresets() {
	const presets = {}

	// System Control Presets
	presets['system_on'] = {
		type: 'button',
		category: 'System Control',
		name: 'System ON',
		style: {
			text: 'SYSTEM\\nON',
			size: '18',
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(0, 100, 0),
		},
		steps: [
			{
				down: [
					{
						actionId: 'system_on',
						options: {},
					},
				],
				up: [],
			},
		],
		feedbacks: [
			{
				feedbackId: 'system_running',
				options: {},
				style: {
					bgcolor: combineRgb(0, 255, 0),
					color: combineRgb(0, 0, 0),
				},
			},
		],
	}

	presets['system_off'] = {
		type: 'button',
		category: 'System Control',
		name: 'System OFF',
		style: {
			text: 'SYSTEM\\nOFF',
			size: '18',
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(100, 0, 0),
		},
		steps: [
			{
				down: [
					{
						actionId: 'system_off',
						options: {},
					},
				],
				up: [],
			},
		],
		feedbacks: [
			{
				feedbackId: 'system_stopped',
				options: {},
				style: {
					bgcolor: combineRgb(255, 0, 0),
					color: combineRgb(255, 255, 255),
				},
			},
		],
	}

	presets['system_reset'] = {
		type: 'button',
		category: 'System Control',
		name: 'System Reset',
		style: {
			text: 'SYSTEM\\nRESET',
			size: '14',
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(100, 100, 0),
		},
		steps: [
			{
				down: [
					{
						actionId: 'system_reset',
						options: {},
					},
				],
				up: [],
			},
		],
		feedbacks: [],
	}

	presets['system_toggle'] = {
		type: 'button',
		category: 'System Control',
		name: 'System Toggle',
		style: {
			text: 'SYSTEM\\nTOGGLE',
			size: '14',
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(50, 50, 50),
		},
		steps: [
			{
				down: [
					{
						actionId: 'system_toggle',
						options: {},
					},
				],
				up: [],
			},
		],
		feedbacks: [
			{
				feedbackId: 'system_running',
				options: {},
				style: {
					bgcolor: combineRgb(0, 255, 0),
					color: combineRgb(0, 0, 0),
					text: 'SYSTEM\\nRUNNING',
				},
			},
			{
				feedbackId: 'system_stopped',
				options: {},
				style: {
					bgcolor: combineRgb(255, 0, 0),
					color: combineRgb(255, 255, 255),
					text: 'SYSTEM\\nSTOPPED',
				},
			},
		],
	}

	// Camera Control Presets
	presets['camera_on'] = {
		type: 'button',
		category: 'Camera Control',
		name: 'Camera ON',
		style: {
			text: 'CAM\\nON',
			size: '18',
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(0, 100, 0),
		},
		steps: [
			{
				down: [
					{
						actionId: 'camera_on',
						options: {},
					},
				],
				up: [],
			},
		],
		feedbacks: [
			{
				feedbackId: 'camera_running',
				options: {},
				style: {
					bgcolor: combineRgb(0, 255, 0),
					color: combineRgb(0, 0, 0),
				},
			},
		],
	}

	presets['camera_off'] = {
		type: 'button',
		category: 'Camera Control',
		name: 'Camera OFF',
		style: {
			text: 'CAM\\nOFF',
			size: '18',
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(100, 0, 0),
		},
		steps: [
			{
				down: [
					{
						actionId: 'camera_off',
						options: {},
					},
				],
				up: [],
			},
		],
		feedbacks: [
			{
				feedbackId: 'camera_stopped',
				options: {},
				style: {
					bgcolor: combineRgb(255, 0, 0),
					color: combineRgb(255, 255, 255),
				},
			},
		],
	}

	presets['camera_manual'] = {
		type: 'button',
		category: 'Camera Control',
		name: 'Camera Manual',
		style: {
			text: 'CAM\\nMANUAL',
			size: '14',
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(0, 50, 100),
		},
		steps: [
			{
				down: [
					{
						actionId: 'camera_manual',
						options: {},
					},
				],
				up: [],
			},
		],
		feedbacks: [],
	}

	presets['camera_toggle'] = {
		type: 'button',
		category: 'Camera Control',
		name: 'Camera Toggle',
		style: {
			text: 'CAM\\nTOGGLE',
			size: '14',
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(50, 50, 50),
		},
		steps: [
			{
				down: [
					{
						actionId: 'camera_toggle',
						options: {},
					},
				],
				up: [],
			},
		],
		feedbacks: [
			{
				feedbackId: 'camera_running',
				options: {},
				style: {
					bgcolor: combineRgb(0, 255, 0),
					color: combineRgb(0, 0, 0),
					text: 'CAM\\nRUNNING',
				},
			},
			{
				feedbackId: 'camera_stopped',
				options: {},
				style: {
					bgcolor: combineRgb(255, 0, 0),
					color: combineRgb(255, 255, 255),
					text: 'CAM\\nSTOPPED',
				},
			},
		],
	}

	// Overlay Control Presets
	presets['overlay_on'] = {
		type: 'button',
		category: 'Overlay Control',
		name: 'Overlay ON',
		style: {
			text: 'OVERLAY\\nON',
			size: '14',
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(100, 0, 100),
		},
		steps: [
			{
				down: [
					{
						actionId: 'overlay_on',
						options: {},
					},
				],
				up: [],
			},
		],
		feedbacks: [
			{
				feedbackId: 'overlay_running',
				options: {},
				style: {
					bgcolor: combineRgb(255, 0, 255),
					color: combineRgb(255, 255, 255),
				},
			},
		],
	}

	presets['overlay_off'] = {
		type: 'button',
		category: 'Overlay Control',
		name: 'Overlay OFF',
		style: {
			text: 'OVERLAY\\nOFF',
			size: '14',
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(50, 0, 50),
		},
		steps: [
			{
				down: [
					{
						actionId: 'overlay_off',
						options: {},
					},
				],
				up: [],
			},
		],
		feedbacks: [
			{
				feedbackId: 'overlay_stopped',
				options: {},
				style: {
					bgcolor: combineRgb(100, 0, 0),
					color: combineRgb(255, 255, 255),
				},
			},
		],
	}

	presets['overlay_manual'] = {
		type: 'button',
		category: 'Overlay Control',
		name: 'Overlay Manual',
		style: {
			text: 'OVERLAY\\nMANUAL',
			size: '14',
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(100, 0, 150),
		},
		steps: [
			{
				down: [
					{
						actionId: 'overlay_manual',
						options: {},
					},
				],
				up: [],
			},
		],
		feedbacks: [],
	}

	presets['overlay_toggle'] = {
		type: 'button',
		category: 'Overlay Control',
		name: 'Overlay Toggle',
		style: {
			text: 'OVERLAY\\nTOGGLE',
			size: '14',
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(50, 50, 50),
		},
		steps: [
			{
				down: [
					{
						actionId: 'overlay_toggle',
						options: {},
					},
				],
				up: [],
			},
		],
		feedbacks: [
			{
				feedbackId: 'overlay_running',
				options: {},
				style: {
					bgcolor: combineRgb(255, 0, 255),
					color: combineRgb(255, 255, 255),
					text: 'OVERLAY\\nRUNNING',
				},
			},
			{
				feedbackId: 'overlay_stopped',
				options: {},
				style: {
					bgcolor: combineRgb(100, 0, 0),
					color: combineRgb(255, 255, 255),
					text: 'OVERLAY\\nSTOPPED',
				},
			},
		],
	}

	// Status Display Presets
	presets['camera_countdown'] = {
		type: 'button',
		category: 'Status Display',
		name: 'Camera Countdown',
		style: {
			text: 'CAM\\n$(showswitcher:camera_countdown)s',
			size: '18',
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(0, 0, 0),
		},
		steps: [],
		feedbacks: [
			{
				feedbackId: 'camera_countdown_below',
				options: {
					threshold: 5,
				},
				style: {
					bgcolor: combineRgb(255, 255, 0),
					color: combineRgb(0, 0, 0),
				},
			},
			{
				feedbackId: 'camera_stopped',
				options: {},
				style: {
					text: 'CAM\\nSTOPPED',
					bgcolor: combineRgb(100, 100, 100),
				},
			},
		],
	}

	presets['overlay_countdown'] = {
		type: 'button',
		category: 'Status Display',
		name: 'Overlay Countdown',
		style: {
			text: 'OVERLAY\\n$(showswitcher:overlay_countdown)s',
			size: '14',
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(0, 0, 0),
		},
		steps: [],
		feedbacks: [
			{
				feedbackId: 'overlay_countdown_below',
				options: {
					threshold: 30,
				},
				style: {
					bgcolor: combineRgb(255, 255, 0),
					color: combineRgb(0, 0, 0),
				},
			},
			{
				feedbackId: 'overlay_stopped',
				options: {},
				style: {
					text: 'OVERLAY\\nSTOPPED',
					bgcolor: combineRgb(100, 100, 100),
				},
			},
		],
	}

	presets['system_duration'] = {
		type: 'button',
		category: 'Status Display',
		name: 'System Duration',
		style: {
			text: 'ACTIVE\\n$(showswitcher:system_duration)',
			size: '14',
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(0, 0, 50),
		},
		steps: [],
		feedbacks: [
			{
				feedbackId: 'system_duration_above',
				options: {
					minutes: 60,
				},
				style: {
					bgcolor: combineRgb(0, 200, 200),
					color: combineRgb(0, 0, 0),
				},
			},
		],
	}

	presets['camera_next'] = {
		type: 'button',
		category: 'Status Display',
		name: 'Camera Next Button',
		style: {
			text: 'NEXT CAM\\n$(showswitcher:camera_next_button)',
			size: '14',
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(0, 50, 0),
		},
		steps: [],
		feedbacks: [],
	}

	presets['overlay_next'] = {
		type: 'button',
		category: 'Status Display',
		name: 'Overlay Next Button',
		style: {
			text: 'NEXT OVL\\n$(showswitcher:overlay_next_button)',
			size: '14',
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(50, 0, 50),
		},
		steps: [],
		feedbacks: [],
	}

	presets['camera_count'] = {
		type: 'button',
		category: 'Status Display',
		name: 'Camera Trigger Count',
		style: {
			text: 'CAM COUNT\\n$(showswitcher:camera_trigger_count)',
			size: '14',
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(0, 0, 100),
		},
		steps: [],
		feedbacks: [
			{
				feedbackId: 'camera_count_above',
				options: {
					threshold: 100,
				},
				style: {
					bgcolor: combineRgb(100, 100, 255),
					color: combineRgb(0, 0, 0),
				},
			},
		],
	}

	presets['overlay_count'] = {
		type: 'button',
		category: 'Status Display',
		name: 'Overlay Trigger Count',
		style: {
			text: 'OVL COUNT\\n$(showswitcher:overlay_trigger_count)',
			size: '14',
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(100, 0, 100),
		},
		steps: [],
		feedbacks: [
			{
				feedbackId: 'overlay_count_above',
				options: {
					threshold: 20,
				},
				style: {
					bgcolor: combineRgb(255, 100, 255),
					color: combineRgb(0, 0, 0),
				},
			},
		],
	}

	return presets
}
