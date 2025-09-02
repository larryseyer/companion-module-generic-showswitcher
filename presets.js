import { combineRgb } from '@companion-module/base'

export function getPresets() {
	const presets = {}

	// ============= COLOR SCHEME CONSTANTS =============
	const COLORS = {
		// State colors
		GREEN_ACTIVE: combineRgb(0, 150, 0),
		RED_STOPPED: combineRgb(150, 0, 0),
		YELLOW_WARNING: combineRgb(200, 150, 0),
		YELLOW_PAUSED: combineRgb(255, 200, 0),
		
		// Function colors
		BLUE_CAMERA: combineRgb(0, 100, 200),
		PURPLE_OVERLAY: combineRgb(150, 0, 200),
		GRAY_INACTIVE: combineRgb(60, 60, 60),
		GRAY_INFO: combineRgb(40, 40, 40),
		
		// Text colors
		WHITE: combineRgb(255, 255, 255),
		BLACK: combineRgb(0, 0, 0),
		GRAY_TEXT: combineRgb(200, 200, 200),
	}

	// ============= 1. MASTER CONTROL (Priority 1) =============
	// These are the most important controls for overall system operation

	presets['system_main_control'] = {
		type: 'button',
		category: '1️⃣ Master Control',
		name: '🔴 Main System Start/Stop',
		style: {
			text: 'SYSTEM\\n$(showswitcher:system_status == "Stopped" ? "START" : "STOP")',
			size: '18',
			color: COLORS.WHITE,
			bgcolor: COLORS.GRAY_INACTIVE,
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
					bgcolor: COLORS.GREEN_ACTIVE,
					color: COLORS.WHITE,
					text: '⏹ STOP\\nRUNNING',
					size: '18',
				},
			},
			{
				feedbackId: 'system_stopped',
				options: {},
				style: {
					bgcolor: COLORS.RED_STOPPED,
					color: COLORS.WHITE,
					text: '▶ START\\nREADY',
					size: '18',
				},
			},
			{
				feedbackId: 'system_paused',
				options: {},
				style: {
					bgcolor: COLORS.YELLOW_PAUSED,
					color: COLORS.BLACK,
					text: '⏸ PAUSED\\nRESUME?',
					size: '18',
				},
			},
			{
				feedbackId: 'stats_ready',
				options: {},
				style: {
					// Add green border effect when stats are ready
					png64: 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
				},
			},
		],
	}

	presets['system_pause_resume'] = {
		type: 'button',
		category: '1️⃣ Master Control',
		name: '⏸ Pause/Resume Toggle',
		style: {
			text: 'PAUSE',
			size: '24',
			color: COLORS.WHITE,
			bgcolor: COLORS.GRAY_INACTIVE,
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
				feedbackId: 'system_running',
				options: {},
				style: {
					bgcolor: COLORS.YELLOW_WARNING,
					color: COLORS.BLACK,
					text: '⏸ PAUSE',
					size: '24',
				},
			},
			{
				feedbackId: 'system_paused',
				options: {},
				style: {
					bgcolor: COLORS.GREEN_ACTIVE,
					color: COLORS.WHITE,
					text: '▶ RESUME',
					size: '24',
				},
			},
		],
	}

	presets['system_reset'] = {
		type: 'button',
		category: '1️⃣ Master Control',
		name: '↻ System Reset (Double-Tap)',
		style: {
			text: '↻ RESET\\nDOUBLE TAP',
			size: '14',
			color: COLORS.WHITE,
			bgcolor: COLORS.RED_STOPPED,
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

	// ============= 2. CAMERA OPERATIONS (Priority 2) =============
	// Camera-specific controls with blue color theme

	presets['camera_auto_manual'] = {
		type: 'button',
		category: '2️⃣ Camera Operations',
		name: '📹 Camera Auto/Manual Toggle',
		style: {
			text: 'CAMERA\\n$(showswitcher:camera_status == "Stopped" ? "START" : "AUTO")',
			size: '18',
			color: COLORS.WHITE,
			bgcolor: COLORS.GRAY_INACTIVE,
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
					bgcolor: COLORS.BLUE_CAMERA,
					color: COLORS.WHITE,
					text: '📹 AUTO\\nACTIVE',
					size: '18',
				},
			},
			{
				feedbackId: 'camera_stopped',
				options: {},
				style: {
					bgcolor: COLORS.GRAY_INACTIVE,
					color: COLORS.GRAY_TEXT,
					text: '📹 START\\nCAMERA',
					size: '18',
				},
			},
		],
	}

	presets['camera_trigger'] = {
		type: 'button',
		category: '2️⃣ Camera Operations',
		name: '🎬 Manual Camera Trigger',
		style: {
			text: 'TRIGGER\\nCAMERA',
			size: '18',
			color: COLORS.WHITE,
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

	presets['camera_mode_toggle'] = {
		type: 'button',
		category: '2️⃣ Camera Operations',
		name: '🔀 Camera Mode (Seq/Random)',
		style: {
			text: 'MODE\\n$(showswitcher:camera_mode)',
			size: '14',
			color: COLORS.WHITE,
			bgcolor: combineRgb(0, 50, 100),
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
					text: 'SEQ→',
					size: '24',
				},
			},
		],
	}

	// ============= 3. OVERLAY OPERATIONS (Priority 3) =============
	// Overlay-specific controls with purple color theme

	presets['overlay_auto_manual'] = {
		type: 'button',
		category: '3️⃣ Overlay Operations',
		name: '🎨 Overlay Auto/Manual Toggle',
		style: {
			text: 'OVERLAY\\n$(showswitcher:overlay_status == "Stopped" ? "START" : "AUTO")',
			size: '18',
			color: COLORS.WHITE,
			bgcolor: COLORS.GRAY_INACTIVE,
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
					bgcolor: COLORS.PURPLE_OVERLAY,
					color: COLORS.WHITE,
					text: '🎨 AUTO\\nACTIVE',
					size: '18',
				},
			},
			{
				feedbackId: 'overlay_stopped',
				options: {},
				style: {
					bgcolor: COLORS.GRAY_INACTIVE,
					color: COLORS.GRAY_TEXT,
					text: '🎨 START\\nOVERLAY',
					size: '18',
				},
			},
		],
	}

	presets['overlay_trigger'] = {
		type: 'button',
		category: '3️⃣ Overlay Operations',
		name: '✨ Manual Overlay Trigger',
		style: {
			text: 'TRIGGER\\nOVERLAY',
			size: '18',
			color: COLORS.WHITE,
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

	presets['overlay_mode_toggle'] = {
		type: 'button',
		category: '3️⃣ Overlay Operations',
		name: '🔀 Overlay Mode (Seq/Random)',
		style: {
			text: 'MODE\\n$(showswitcher:overlay_mode)',
			size: '14',
			color: COLORS.WHITE,
			bgcolor: combineRgb(75, 0, 100),
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
					bgcolor: combineRgb(150, 0, 150),
					text: 'SEQ→',
					size: '24',
				},
			},
		],
	}

	// ============= 4. LIVE MONITORING (Priority 4) =============
	// Combined displays for efficient monitoring

	presets['combined_countdown'] = {
		type: 'button',
		category: '4️⃣ Live Monitoring',
		name: '⏱ Combined Countdown Display',
		style: {
			text: 'CAM: $(showswitcher:camera_countdown)s\\nOVL: $(showswitcher:overlay_countdown)s',
			size: '14',
			color: COLORS.WHITE,
			bgcolor: COLORS.GRAY_INFO,
		},
		steps: [],
		feedbacks: [
			{
				feedbackId: 'camera_countdown_below',
				options: {
					threshold: 5,
				},
				style: {
					bgcolor: COLORS.YELLOW_WARNING,
					color: COLORS.BLACK,
					text: '⚠ CAM: $(showswitcher:camera_countdown)s\\nOVL: $(showswitcher:overlay_countdown)s',
					size: '14',
				},
			},
			{
				feedbackId: 'overlay_countdown_below',
				options: {
					threshold: 10,
				},
				style: {
					bgcolor: combineRgb(200, 100, 200),
					color: COLORS.WHITE,
					text: 'CAM: $(showswitcher:camera_countdown)s\\n⚠ OVL: $(showswitcher:overlay_countdown)s',
					size: '14',
				},
			},
		],
	}

	presets['combined_counters'] = {
		type: 'button',
		category: '4️⃣ Live Monitoring',
		name: '🔢 Combined Counters (Double-Tap Reset)',
		style: {
			text: 'CAM: $(showswitcher:camera_trigger_count)\\nOVL: $(showswitcher:overlay_trigger_count)',
			size: '14',
			color: COLORS.WHITE,
			bgcolor: COLORS.GRAY_INFO,
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
				feedbackId: 'camera_count_above',
				options: {
					threshold: 100,
				},
				style: {
					bgcolor: combineRgb(100, 100, 255),
					color: COLORS.WHITE,
				},
			},
		],
	}

	presets['combined_averages'] = {
		type: 'button',
		category: '4️⃣ Live Monitoring',
		name: '📈 Combined Average Intervals',
		style: {
			text: 'CAM AVG: $(showswitcher:camera_average_interval)s\\nOVL AVG: $(showswitcher:overlay_average_interval)s',
			size: '11',
			color: COLORS.WHITE,
			bgcolor: COLORS.GRAY_INFO,
		},
		steps: [],
		feedbacks: [],
	}

	presets['combined_next_preview'] = {
		type: 'button',
		category: '4️⃣ Live Monitoring',
		name: '👁 Next Preview (Cam & Overlay)',
		style: {
			text: 'NEXT CAM: $(showswitcher:camera_next_button)\\nNEXT OVL: $(showswitcher:overlay_next_button)',
			size: '10',
			color: COLORS.WHITE,
			bgcolor: COLORS.GRAY_INFO,
		},
		steps: [],
		feedbacks: [],
	}

	presets['session_info'] = {
		type: 'button',
		category: '4️⃣ Live Monitoring',
		name: '📊 Session Info Display',
		style: {
			text: 'SESSION #$(showswitcher:system_session_count)\\n$(showswitcher:system_duration)\\nTOTAL: $(showswitcher:system_total_runtime)',
			size: '10',
			color: COLORS.WHITE,
			bgcolor: COLORS.GRAY_INFO,
		},
		steps: [],
		feedbacks: [
			{
				feedbackId: 'system_duration_above',
				options: {
					minutes: 60,
				},
				style: {
					bgcolor: combineRgb(0, 100, 100),
					color: COLORS.WHITE,
				},
			},
		],
	}

	// ============= 5. MIDI & PERFORMANCE (Priority 5) =============
	// System monitoring and MIDI control

	presets['midi_status'] = {
		type: 'button',
		category: '5️⃣ MIDI & Performance',
		name: '🎹 MIDI Connection Status',
		style: {
			text: 'MIDI\\n$(showswitcher:midi_status == "Connected" ? "✓" : "CONNECT")',
			size: '18',
			color: COLORS.WHITE,
			bgcolor: COLORS.GRAY_INACTIVE,
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
					color: COLORS.WHITE,
					text: 'MIDI ✓\\n$(showswitcher:midi_port)',
					size: '14',
				},
			},
			{
				feedbackId: 'midi_disconnected',
				options: {},
				style: {
					bgcolor: COLORS.GRAY_INACTIVE,
					color: COLORS.GRAY_TEXT,
					text: 'MIDI\\nCONNECT',
					size: '18',
				},
			},
			{
				feedbackId: 'midi_activity',
				options: {},
				style: {
					bgcolor: combineRgb(255, 255, 0),
					color: COLORS.BLACK,
				},
			},
		],
	}

	presets['midi_monitor'] = {
		type: 'button',
		category: '5️⃣ MIDI & Performance',
		name: '🎵 MIDI Activity Monitor',
		style: {
			text: 'NOTE: $(showswitcher:midi_last_note)\\nCC: $(showswitcher:midi_last_cc)',
			size: '11',
			color: COLORS.WHITE,
			bgcolor: combineRgb(50, 0, 100),
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
		feedbacks: [],
	}

	presets['http_performance'] = {
		type: 'button',
		category: '5️⃣ MIDI & Performance',
		name: '📊 HTTP Performance Monitor',
		style: {
			text: 'HTTP OK\\n$(showswitcher:http_success_rate)\\nERR: $(showswitcher:http_errors)',
			size: '11',
			color: COLORS.WHITE,
			bgcolor: COLORS.GREEN_ACTIVE,
		},
		steps: [],
		feedbacks: [
			{
				feedbackId: 'http_errors_above',
				options: {
					threshold: 5,
				},
				style: {
					bgcolor: COLORS.YELLOW_WARNING,
					color: COLORS.BLACK,
					text: '⚠ HTTP\\n$(showswitcher:http_success_rate)\\nERR: $(showswitcher:http_errors)',
					size: '11',
				},
			},
			{
				feedbackId: 'http_errors_above',
				options: {
					threshold: 10,
				},
				style: {
					bgcolor: COLORS.RED_STOPPED,
					color: COLORS.WHITE,
					text: '❌ HTTP\\n$(showswitcher:http_success_rate)\\nERR: $(showswitcher:http_errors)',
					size: '11',
				},
			},
		],
	}

	presets['queue_management'] = {
		type: 'button',
		category: '5️⃣ MIDI & Performance',
		name: '📋 Queue Management (Double-Tap Clear)',
		style: {
			text: 'QUEUE\\n$(showswitcher:queue_size)',
			size: '24',
			color: COLORS.WHITE,
			bgcolor: COLORS.GRAY_INFO,
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
					bgcolor: COLORS.YELLOW_WARNING,
					color: COLORS.BLACK,
					text: '⚠ QUEUE\\nFULL',
					size: '18',
				},
			},
			{
				feedbackId: 'queue_size_above',
				options: {
					threshold: 5,
				},
				style: {
					bgcolor: COLORS.RED_STOPPED,
					color: COLORS.WHITE,
					text: '❌ QUEUE\\nOVERLOAD',
					size: '14',
				},
			},
		],
	}

	presets['statistics_reset'] = {
		type: 'button',
		category: '5️⃣ MIDI & Performance',
		name: '📊 Statistics Reset (Double-Tap)',
		style: {
			text: 'STATS\\nRESET',
			size: '18',
			color: COLORS.WHITE,
			bgcolor: COLORS.GRAY_INACTIVE,
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
		feedbacks: [
			{
				feedbackId: 'stats_ready',
				options: {},
				style: {
					bgcolor: COLORS.GREEN_ACTIVE,
					text: 'STATS\\nREADY',
					size: '18',
				},
			},
		],
	}

	return presets
}