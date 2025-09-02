import { combineRgb } from '@companion-module/base'

export function getPresets() {
	const presets = {}

	// ============= SYSTEM CONTROL PRESETS =============

	// Consolidated System Start/Stop with steps
	presets['system_control'] = {
		type: 'button',
		category: 'System Control',
		name: 'System Start/Stop',
		style: {
			text: '$(showswitcher:system_status == "Stopped" ? "⏵" : "⏹")\\nSYSTEM',
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
					bgcolor: combineRgb(0, 150, 0),
					color: combineRgb(255, 255, 255),
					text: '⏹\\nSTOP',
					size: '14',
				},
			},
			{
				feedbackId: 'system_stopped',
				options: {},
				style: {
					bgcolor: combineRgb(100, 0, 0),
					color: combineRgb(255, 255, 255),
					text: '⏵\\nSTART',
					size: '14',
				},
			},
			{
				feedbackId: 'system_paused',
				options: {},
				style: {
					bgcolor: combineRgb(200, 150, 0),
					color: combineRgb(255, 255, 255),
					text: '⏸\\nPAUSED',
					size: '14',
				},
			},
		],
	}

	// Consolidated Pause/Resume with smart toggle
	presets['system_pause_resume'] = {
		type: 'button',
		category: 'System Control',
		name: 'System Pause/Resume',
		style: {
			text: '⏸\\nPAUSE',
			size: '14',
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(100, 100, 0),
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
				feedbackId: 'system_paused',
				options: {},
				style: {
					bgcolor: combineRgb(255, 200, 0),
					color: combineRgb(0, 0, 0),
					text: '▶\\nRESUME',
					size: '14',
				},
			},
		],
	}

	presets['system_reset'] = {
		type: 'button',
		category: 'System Control',
		name: 'System Reset',
		style: {
			text: '↻\\nRESET',
			size: '14',
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(150, 50, 0),
		},
		steps: [
			{
				down: [],
				up: [],
			},
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

	presets['system_status_display'] = {
		type: 'button',
		category: 'System Control',
		name: 'System Status Display',
		style: {
			text: '⚙ $(showswitcher:system_status)\\n$(showswitcher:system_duration)',
			size: '12',
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
					text: '▶ RUNNING\\n$(showswitcher:system_duration)',
					size: '12',
				},
			},
			{
				feedbackId: 'system_paused',
				options: {},
				style: {
					bgcolor: combineRgb(200, 150, 0),
					text: '⏸ PAUSED\\n$(showswitcher:system_duration)',
					size: '12',
				},
			},
			{
				feedbackId: 'system_stopped',
				options: {},
				style: {
					bgcolor: combineRgb(60, 60, 60),
					text: '⏹ STOPPED\\n$(showswitcher:system_duration)',
					size: '12',
				},
			},
		],
	}

	// ============= CAMERA CONTROL PRESETS =============

	// Consolidated Camera Control
	presets['camera_control'] = {
		type: 'button',
		category: 'Camera Control',
		name: 'Camera Start/Stop',
		style: {
			text: '📹\\nCAMERA',
			size: '14',
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(0, 50, 100),
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
					bgcolor: combineRgb(0, 150, 255),
					color: combineRgb(255, 255, 255),
					text: '📹\\nACTIVE',
					size: '14',
				},
			},
			{
				feedbackId: 'camera_stopped',
				options: {},
				style: {
					bgcolor: combineRgb(50, 50, 50),
					color: combineRgb(200, 200, 200),
					text: '📹\\nSTART',
					size: '14',
				},
			},
		],
	}

	presets['camera_manual'] = {
		type: 'button',
		category: 'Camera Control',
		name: 'Camera Manual Trigger',
		style: {
			text: '🎬\\nTRIGGER',
			size: '14',
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(0, 75, 150),
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

	// Camera Mode with smart toggle
	presets['camera_mode'] = {
		type: 'button',
		category: 'Camera Control',
		name: 'Camera Mode',
		style: {
			text: '🔀\\n$(showswitcher:camera_mode)',
			size: '12',
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(0, 75, 75),
		},
		steps: [
			{
				down: [
					{
						actionId: 'camera_set_mode',
						options: {
							mode: 'sequential',
						},
					},
				],
				up: [],
			},
			{
				down: [
					{
						actionId: 'camera_set_mode',
						options: {
							mode: 'random',
						},
					},
				],
				up: [],
			},
		],
		feedbacks: [
			{
				feedbackId: 'camera_sequential_mode',
				options: {},
				style: {
					bgcolor: combineRgb(0, 150, 150),
					text: '➡\\nSEQUENTIAL',
					size: '12',
				},
			},
		],
	}

	// ============= OVERLAY CONTROL PRESETS =============

	// Consolidated Overlay Control
	presets['overlay_control'] = {
		type: 'button',
		category: 'Overlay Control',
		name: 'Overlay Start/Stop',
		style: {
			text: '🎨\\nOVERLAY',
			size: '14',
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(100, 0, 100),
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
					bgcolor: combineRgb(200, 0, 200),
					color: combineRgb(255, 255, 255),
					text: '🎨\\nACTIVE',
					size: '14',
				},
			},
			{
				feedbackId: 'overlay_stopped',
				options: {},
				style: {
					bgcolor: combineRgb(50, 0, 50),
					color: combineRgb(200, 200, 200),
					text: '🎨\\nSTART',
					size: '14',
				},
			},
		],
	}

	presets['overlay_manual'] = {
		type: 'button',
		category: 'Overlay Control',
		name: 'Overlay Manual Trigger',
		style: {
			text: '✨\\nTRIGGER',
			size: '14',
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(150, 0, 150),
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

	// Overlay Mode with smart toggle
	presets['overlay_mode'] = {
		type: 'button',
		category: 'Overlay Control',
		name: 'Overlay Mode',
		style: {
			text: '🔀\\n$(showswitcher:overlay_mode)',
			size: '12',
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(75, 0, 75),
		},
		steps: [
			{
				down: [
					{
						actionId: 'overlay_set_mode',
						options: {
							mode: 'sequential',
						},
					},
				],
				up: [],
			},
			{
				down: [
					{
						actionId: 'overlay_set_mode',
						options: {
							mode: 'random',
						},
					},
				],
				up: [],
			},
		],
		feedbacks: [
			{
				feedbackId: 'overlay_sequential_mode',
				options: {},
				style: {
					bgcolor: combineRgb(0, 150, 150),
					text: '➡\\nSEQUENTIAL',
					size: '12',
				},
			},
		],
	}

	// ============= STATUS DISPLAY PRESETS =============

	presets['camera_countdown'] = {
		type: 'button',
		category: 'Status Display',
		name: 'Camera Countdown',
		style: {
			text: '📹 CAM\\n$(showswitcher:camera_countdown)s',
			size: '14',
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
					bgcolor: combineRgb(255, 200, 0),
					color: combineRgb(0, 0, 0),
					text: '⚠ CAM\\n$(showswitcher:camera_countdown)s',
					size: '14',
				},
			},
			{
				feedbackId: 'camera_stopped',
				options: {},
				style: {
					text: '📹 CAM\\nOFF',
					bgcolor: combineRgb(60, 60, 60),
					size: '14',
				},
			},
		],
	}

	presets['overlay_countdown'] = {
		type: 'button',
		category: 'Status Display',
		name: 'Overlay Countdown',
		style: {
			text: '🎨 OVL\\n$(showswitcher:overlay_countdown)s',
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
					bgcolor: combineRgb(255, 200, 0),
					color: combineRgb(0, 0, 0),
					text: '⚠ OVL\\n$(showswitcher:overlay_countdown)s',
					size: '14',
				},
			},
			{
				feedbackId: 'overlay_stopped',
				options: {},
				style: {
					text: '🎨 OVL\\nOFF',
					bgcolor: combineRgb(60, 60, 60),
					size: '14',
				},
			},
		],
	}

	presets['system_duration'] = {
		type: 'button',
		category: 'Status Display',
		name: 'System Duration',
		style: {
			text: '⏱ ACTIVE\\n$(showswitcher:system_duration)',
			size: '12',
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

	presets['system_total_runtime'] = {
		type: 'button',
		category: 'Status Display',
		name: 'Total Runtime',
		style: {
			text: '∑ TOTAL\\n$(showswitcher:system_total_runtime)',
			size: '12',
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(0, 50, 100),
		},
		steps: [],
		feedbacks: [],
	}

	presets['system_session_count'] = {
		type: 'button',
		category: 'Status Display',
		name: 'Session Count',
		style: {
			text: '# SESSIONS\\n$(showswitcher:system_session_count)',
			size: '12',
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
			text: '📹 NEXT\\n$(showswitcher:camera_next_button)',
			size: '11',
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
			text: '🎨 NEXT\\n$(showswitcher:overlay_next_button)',
			size: '11',
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(50, 0, 50),
		},
		steps: [],
		feedbacks: [],
	}

	// Consolidated counter with reset on double-tap
	presets['camera_count'] = {
		type: 'button',
		category: 'Status Display',
		name: 'Camera Trigger Count',
		style: {
			text: '📹 COUNT\\n$(showswitcher:camera_trigger_count)',
			size: '12',
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(0, 0, 100),
		},
		steps: [
			{
				down: [],
				up: [],
			},
			{
				down: [
					{
						actionId: 'reset_camera_counter',
						options: {},
					},
				],
				up: [],
			},
		],
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
			text: '🎨 COUNT\\n$(showswitcher:overlay_trigger_count)',
			size: '12',
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(100, 0, 100),
		},
		steps: [
			{
				down: [],
				up: [],
			},
			{
				down: [
					{
						actionId: 'reset_overlay_counter',
						options: {},
					},
				],
				up: [],
			},
		],
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

	presets['camera_average_interval'] = {
		type: 'button',
		category: 'Status Display',
		name: 'Camera Avg Interval',
		style: {
			text: '⏱ CAM AVG\\n$(showswitcher:camera_average_interval)s',
			size: '11',
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(0, 75, 50),
		},
		steps: [],
		feedbacks: [],
	}

	presets['overlay_average_interval'] = {
		type: 'button',
		category: 'Status Display',
		name: 'Overlay Avg Interval',
		style: {
			text: '⏱ OVL AVG\\n$(showswitcher:overlay_average_interval)s',
			size: '11',
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(75, 0, 100),
		},
		steps: [],
		feedbacks: [],
	}

	// ============= PERFORMANCE MONITORING PRESETS =============

	presets['http_success_rate'] = {
		type: 'button',
		category: 'Performance Monitor',
		name: 'HTTP Success Rate',
		style: {
			text: '📊 SUCCESS\\n$(showswitcher:http_success_rate)',
			size: '11',
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(0, 50, 0),
		},
		steps: [],
		feedbacks: [
			{
				feedbackId: 'http_errors_above',
				options: {
					threshold: 5,
				},
				style: {
					bgcolor: combineRgb(255, 100, 0),
					color: combineRgb(0, 0, 0),
					text: '⚠ ERROR\\n$(showswitcher:http_success_rate)',
					size: '11',
				},
			},
		],
	}

	presets['http_error_count'] = {
		type: 'button',
		category: 'Performance Monitor',
		name: 'HTTP Errors',
		style: {
			text: '❌ ERRORS\\n$(showswitcher:http_errors)',
			size: '12',
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(50, 0, 0),
		},
		steps: [],
		feedbacks: [
			{
				feedbackId: 'http_errors_above',
				options: {
					threshold: 5,
				},
				style: {
					bgcolor: combineRgb(255, 0, 0),
					color: combineRgb(255, 255, 255),
				},
			},
		],
	}

	presets['queue_size'] = {
		type: 'button',
		category: 'Performance Monitor',
		name: 'Queue Size',
		style: {
			text: '📋 QUEUE\\n$(showswitcher:queue_size)',
			size: '12',
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(0, 50, 100),
		},
		steps: [
			{
				down: [],
				up: [],
			},
			{
				down: [
					{
						actionId: 'clear_button_queue',
						options: {},
					},
				],
				up: [],
			},
		],
		feedbacks: [
			{
				feedbackId: 'queue_size_above',
				options: {
					threshold: 3,
				},
				style: {
					bgcolor: combineRgb(255, 0, 0),
					color: combineRgb(255, 255, 255),
					text: '⚠ QUEUE\\nFULL',
					size: '12',
				},
			},
		],
	}

	// Consolidated statistics management
	presets['statistics_control'] = {
		type: 'button',
		category: 'Performance Monitor',
		name: 'Statistics Control',
		style: {
			text: '💾 STATS\\nREADY',
			size: '12',
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(50, 50, 50),
		},
		steps: [
			{
				down: [],
				up: [],
			},
			{
				down: [
					{
						actionId: 'reset_statistics',
						options: {},
					},
				],
				up: [],
			},
		],
		feedbacks: [],
	}

	// ============= MIDI CONTROL PRESETS =============

	// Consolidated MIDI status and control
	presets['midi_control'] = {
		type: 'button',
		category: 'MIDI Control',
		name: 'MIDI Connection',
		style: {
			text: '🎹 MIDI\\n$(showswitcher:midi_status)',
			size: '12',
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(50, 0, 100),
		},
		steps: [
			{
				down: [
					{
						actionId: 'midi_connect',
						options: {
							port_index: 0,
						},
					},
				],
				up: [],
			},
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
		feedbacks: [
			{
				feedbackId: 'midi_connected',
				options: {},
				style: {
					bgcolor: combineRgb(150, 0, 255),
					color: combineRgb(255, 255, 255),
					text: '🎹 MIDI\\n✓ CONNECTED',
					size: '11',
				},
			},
			{
				feedbackId: 'midi_disconnected',
				options: {},
				style: {
					bgcolor: combineRgb(60, 60, 60),
					color: combineRgb(200, 200, 200),
					text: '🎹 MIDI\\nCONNECT',
					size: '12',
				},
			},
		],
	}

	presets['midi_port'] = {
		type: 'button',
		category: 'MIDI Control',
		name: 'MIDI Port',
		style: {
			text: '🎹 PORT\\n$(showswitcher:midi_port)',
			size: '10',
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(75, 0, 150),
		},
		steps: [
			{
				down: [
					{
						actionId: 'midi_refresh_ports',
						options: {},
					},
				],
				up: [],
			},
		],
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

	presets['midi_last_note'] = {
		type: 'button',
		category: 'MIDI Control',
		name: 'MIDI Last Note',
		style: {
			text: '♪ NOTE\\n$(showswitcher:midi_last_note)',
			size: '11',
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(50, 50, 100),
		},
		steps: [],
		feedbacks: [],
	}

	presets['midi_last_cc'] = {
		type: 'button',
		category: 'MIDI Control',
		name: 'MIDI Last CC',
		style: {
			text: '🎛 CC\\n$(showswitcher:midi_last_cc)',
			size: '11',
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(100, 50, 50),
		},
		steps: [],
		feedbacks: [],
	}

	presets['show_midi_guide'] = {
		type: 'button',
		category: 'MIDI Control',
		name: 'MIDI Guide',
		style: {
			text: 'ℹ MIDI\\nGUIDE',
			size: '12',
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(0, 100, 100),
		},
		steps: [
			{
				down: [
					{
						actionId: 'show_midi_guide',
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
