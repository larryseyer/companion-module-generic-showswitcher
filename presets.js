import { combineRgb } from '@companion-module/base'

export function getPresets() {
	const presets = {}

	// ============= SYSTEM CONTROL PRESETS =============
	
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
			{
				feedbackId: 'system_paused',
				options: {},
				style: {
					bgcolor: combineRgb(255, 200, 0),
					color: combineRgb(0, 0, 0),
					text: 'SYSTEM\\nPAUSED',
				},
			},
		],
	}

	// NEW Ver 2.0: System Pause
	presets['system_pause'] = {
		type: 'button',
		category: 'System Control',
		name: 'System Pause',
		style: {
			text: 'PAUSE',
			size: '18',
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(150, 100, 0),
		},
		steps: [
			{
				down: [
					{
						actionId: 'system_pause',
						options: {},
					},
				],
				up: [],
			},
		],
		feedbacks: [
			{
				feedbackId: 'system_paused',
				options: {},
				style: {
					bgcolor: combineRgb(255, 200, 0),
					color: combineRgb(0, 0, 0),
					text: '⏸ PAUSED',
				},
			},
		],
	}

	// NEW Ver 2.0: System Resume
	presets['system_resume'] = {
		type: 'button',
		category: 'System Control',
		name: 'System Resume',
		style: {
			text: 'RESUME',
			size: '18',
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(0, 100, 50),
		},
		steps: [
			{
				down: [
					{
						actionId: 'system_resume',
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
					text: '▶ RUNNING',
				},
			},
		],
	}

	// NEW Ver 2.0: System Status with Pause indicator
	presets['system_status_advanced'] = {
		type: 'button',
		category: 'System Control',
		name: 'System Status Advanced',
		style: {
			text: '$(showswitcher:system_status)\\n$(showswitcher:system_duration)',
			size: '14',
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(30, 30, 30),
		},
		steps: [],
		feedbacks: [
			{
				feedbackId: 'system_running',
				options: {},
				style: {
					bgcolor: combineRgb(0, 100, 0),
				},
			},
			{
				feedbackId: 'system_paused',
				options: {},
				style: {
					bgcolor: combineRgb(200, 150, 0),
				},
			},
			{
				feedbackId: 'system_stopped',
				options: {},
				style: {
					bgcolor: combineRgb(100, 0, 0),
				},
			},
		],
	}

	// ============= CAMERA CONTROL PRESETS =============
	
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

	// NEW Ver 2.0: Camera Mode Toggle
	presets['camera_mode_toggle'] = {
		type: 'button',
		category: 'Camera Control',
		name: 'Camera Mode Toggle',
		style: {
			text: 'CAM MODE\\n$(showswitcher:camera_mode)',
			size: '14',
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(0, 75, 75),
		},
		steps: [
			{
				down: [
					{
						actionId: 'camera_mode_toggle',
						options: {},
					},
				],
				up: [],
			},
		],
		feedbacks: [
			{
				feedbackId: 'camera_mode_sequential',
				options: {},
				style: {
					bgcolor: combineRgb(0, 150, 150),
					color: combineRgb(255, 255, 255),
					text: 'CAM MODE\\nSEQUENTIAL',
				},
			},
			{
				feedbackId: 'camera_mode_random',
				options: {},
				style: {
					bgcolor: combineRgb(150, 0, 150),
					color: combineRgb(255, 255, 255),
					text: 'CAM MODE\\nRANDOM',
				},
			},
		],
	}

	// NEW Ver 2.0: Camera Blacklist Clear
	presets['camera_blacklist_clear'] = {
		type: 'button',
		category: 'Camera Control',
		name: 'Clear Camera Blacklist',
		style: {
			text: 'CLEAR\\nBLACKLIST',
			size: '14',
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(100, 50, 0),
		},
		steps: [
			{
				down: [
					{
						actionId: 'camera_blacklist_clear',
						options: {},
					},
				],
				up: [],
			},
		],
		feedbacks: [],
	}

	// ============= OVERLAY CONTROL PRESETS =============
	
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

	// NEW Ver 2.0: Overlay Mode Toggle
	presets['overlay_mode_toggle'] = {
		type: 'button',
		category: 'Overlay Control',
		name: 'Overlay Mode Toggle',
		style: {
			text: 'OVL MODE\\n$(showswitcher:overlay_mode)',
			size: '14',
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(75, 0, 75),
		},
		steps: [
			{
				down: [
					{
						actionId: 'overlay_mode_toggle',
						options: {},
					},
				],
				up: [],
			},
		],
		feedbacks: [
			{
				feedbackId: 'overlay_mode_sequential',
				options: {},
				style: {
					bgcolor: combineRgb(0, 150, 150),
					color: combineRgb(255, 255, 255),
					text: 'OVL MODE\\nSEQUENTIAL',
				},
			},
			{
				feedbackId: 'overlay_mode_random',
				options: {},
				style: {
					bgcolor: combineRgb(150, 0, 150),
					color: combineRgb(255, 255, 255),
					text: 'OVL MODE\\nRANDOM',
				},
			},
		],
	}

	// NEW Ver 2.0: Overlay Blacklist Clear
	presets['overlay_blacklist_clear'] = {
		type: 'button',
		category: 'Overlay Control',
		name: 'Clear Overlay Blacklist',
		style: {
			text: 'CLEAR\\nBLACKLIST',
			size: '14',
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(100, 50, 100),
		},
		steps: [
			{
				down: [
					{
						actionId: 'overlay_blacklist_clear',
						options: {},
					},
				],
				up: [],
			},
		],
		feedbacks: [],
	}

	// ============= STATUS DISPLAY PRESETS =============
	
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

	// NEW Ver 2.0: Total Runtime Display
	presets['system_total_runtime'] = {
		type: 'button',
		category: 'Status Display',
		name: 'Total Runtime',
		style: {
			text: 'TOTAL\\n$(showswitcher:system_total_runtime)',
			size: '14',
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(0, 50, 100),
		},
		steps: [],
		feedbacks: [],
	}

	// NEW Ver 2.0: Session Count Display
	presets['system_session_count'] = {
		type: 'button',
		category: 'Status Display',
		name: 'Session Count',
		style: {
			text: 'SESSIONS\\n$(showswitcher:system_session_count)',
			size: '14',
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(50, 50, 100),
		},
		steps: [],
		feedbacks: [],
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

	// NEW Ver 2.0: Camera Average Interval
	presets['camera_average_interval'] = {
		type: 'button',
		category: 'Status Display',
		name: 'Camera Avg Interval',
		style: {
			text: 'CAM AVG\\n$(showswitcher:camera_average_interval)s',
			size: '14',
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(0, 75, 50),
		},
		steps: [],
		feedbacks: [],
	}

	// NEW Ver 2.0: Overlay Average Interval
	presets['overlay_average_interval'] = {
		type: 'button',
		category: 'Status Display',
		name: 'Overlay Avg Interval',
		style: {
			text: 'OVL AVG\\n$(showswitcher:overlay_average_interval)s',
			size: '14',
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(75, 0, 100),
		},
		steps: [],
		feedbacks: [],
	}

	// ============= PERFORMANCE MONITORING PRESETS (Ver 2.0) =============
	
	// NEW Ver 2.0: HTTP Success Rate
	presets['http_success_rate'] = {
		type: 'button',
		category: 'Performance Monitor',
		name: 'HTTP Success Rate',
		style: {
			text: 'SUCCESS\\n$(showswitcher:http_success_rate)',
			size: '14',
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(0, 50, 0),
		},
		steps: [],
		feedbacks: [
			{
				feedbackId: 'http_errors_high',
				options: {},
				style: {
					bgcolor: combineRgb(255, 100, 0),
					color: combineRgb(0, 0, 0),
					text: 'ERROR!\\n$(showswitcher:http_success_rate)',
				},
			},
		],
	}

	// NEW Ver 2.0: HTTP Error Count
	presets['http_error_count'] = {
		type: 'button',
		category: 'Performance Monitor',
		name: 'HTTP Errors',
		style: {
			text: 'ERRORS\\n$(showswitcher:http_errors)',
			size: '14',
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(50, 0, 0),
		},
		steps: [],
		feedbacks: [
			{
				feedbackId: 'http_errors_high',
				options: {},
				style: {
					bgcolor: combineRgb(255, 0, 0),
					color: combineRgb(255, 255, 255),
				},
			},
		],
	}

	// NEW Ver 2.0: Queue Size
	presets['queue_size'] = {
		type: 'button',
		category: 'Performance Monitor',
		name: 'Queue Size',
		style: {
			text: 'QUEUE\\n$(showswitcher:queue_size)',
			size: '14',
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(0, 50, 100),
		},
		steps: [],
		feedbacks: [
			{
				feedbackId: 'queue_full',
				options: {},
				style: {
					bgcolor: combineRgb(255, 0, 0),
					color: combineRgb(255, 255, 255),
					text: 'QUEUE\\nFULL!',
				},
			},
		],
	}

	// NEW Ver 2.0: Clear Statistics
	presets['clear_statistics'] = {
		type: 'button',
		category: 'Performance Monitor',
		name: 'Clear Statistics',
		style: {
			text: 'CLEAR\\nSTATS',
			size: '14',
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(100, 0, 0),
		},
		steps: [
			{
				down: [
					{
						actionId: 'clear_statistics',
						options: {},
					},
				],
				up: [],
			},
		],
		feedbacks: [],
	}

	// NEW Ver 2.0: Save Statistics
	presets['save_statistics'] = {
		type: 'button',
		category: 'Performance Monitor',
		name: 'Save Statistics',
		style: {
			text: 'SAVE\\nSTATS',
			size: '14',
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(0, 100, 0),
		},
		steps: [
			{
				down: [
					{
						actionId: 'save_statistics',
						options: {},
					},
				],
				up: [],
			},
		],
		feedbacks: [
			{
				feedbackId: 'statistics_saved',
				options: {},
				style: {
					bgcolor: combineRgb(0, 255, 0),
					color: combineRgb(0, 0, 0),
				},
			},
		],
	}

	// ============= MIDI CONTROL PRESETS =============
	
	// MIDI Status
	presets['midi_status'] = {
		type: 'button',
		category: 'MIDI Control',
		name: 'MIDI Status',
		style: {
			text: 'MIDI\\n$(showswitcher:midi_status)',
			size: '14',
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(50, 0, 100),
		},
		steps: [],
		feedbacks: [
			{
				feedbackId: 'midi_connected',
				options: {},
				style: {
					bgcolor: combineRgb(150, 0, 255),
					color: combineRgb(255, 255, 255),
				},
			},
			{
				feedbackId: 'midi_disconnected',
				options: {},
				style: {
					bgcolor: combineRgb(100, 100, 100),
					color: combineRgb(255, 255, 255),
				},
			},
		],
	}

	// MIDI Port Display
	presets['midi_port'] = {
		type: 'button',
		category: 'MIDI Control',
		name: 'MIDI Port',
		style: {
			text: 'PORT\\n$(showswitcher:midi_port)',
			size: '12',
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(75, 0, 150),
		},
		steps: [],
		feedbacks: [
			{
				feedbackId: 'midi_activity',
				options: {},
				style: {
					bgcolor: combineRgb(255, 255, 0),
					color: combineRgb(0, 0, 0),
				},
			},
		],
	}

	// MIDI Last Note
	presets['midi_last_note'] = {
		type: 'button',
		category: 'MIDI Control',
		name: 'MIDI Last Note',
		style: {
			text: 'NOTE\\n$(showswitcher:midi_last_note)',
			size: '14',
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(50, 50, 100),
		},
		steps: [],
		feedbacks: [],
	}

	// MIDI Last CC
	presets['midi_last_cc'] = {
		type: 'button',
		category: 'MIDI Control',
		name: 'MIDI Last CC',
		style: {
			text: 'CC\\n$(showswitcher:midi_last_cc)',
			size: '14',
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(100, 50, 50),
		},
		steps: [],
		feedbacks: [],
	}

	// MIDI Disconnect
	presets['midi_disconnect'] = {
		type: 'button',
		category: 'MIDI Control',
		name: 'MIDI Disconnect',
		style: {
			text: 'MIDI\\nDISCONNECT',
			size: '14',
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(100, 0, 0),
		},
		steps: [
			{
				down: [
					{
						actionId: 'midi_disconnect',
						options: {},
					},
				],
				up: [],
			},
		],
		feedbacks: [],
	}

	// MIDI Refresh
	presets['midi_refresh'] = {
		type: 'button',
		category: 'MIDI Control',
		name: 'MIDI Refresh Ports',
		style: {
			text: 'MIDI\\nREFRESH',
			size: '14',
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(0, 100, 100),
		},
		steps: [
			{
				down: [
					{
						actionId: 'midi_refresh',
						options: {},
					},
				],
				up: [],
			},
		],
		feedbacks: [],
	}

	return presets
}