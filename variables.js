export function getVariableDefinitions() {
	return [
		// System Variables
		{
			variableId: 'system_status',
			name: 'System Status',
		},
		{
			variableId: 'system_duration',
			name: 'System Active Duration',
		},
		{
			variableId: 'system_total_runtime',
			name: 'Total Runtime (All Sessions)',
		},
		{
			variableId: 'system_session_count',
			name: 'Number of Sessions',
		},

		// Camera Variables
		{
			variableId: 'camera_status',
			name: 'Camera Status',
		},
		{
			variableId: 'camera_countdown',
			name: 'Camera Countdown (seconds)',
		},
		{
			variableId: 'camera_next_button',
			name: 'Camera Next Button',
		},
		{
			variableId: 'camera_previous_button',
			name: 'Camera Previous Button',
		},
		{
			variableId: 'camera_trigger_count',
			name: 'Camera Trigger Count',
		},
		{
			variableId: 'camera_average_interval',
			name: 'Camera Average Interval (seconds)',
		},
		{
			variableId: 'camera_mode',
			name: 'Camera Selection Mode',
		},

		// Overlay Variables
		{
			variableId: 'overlay_status',
			name: 'Overlay Status',
		},
		{
			variableId: 'overlay_countdown',
			name: 'Overlay Countdown (seconds)',
		},
		{
			variableId: 'overlay_next_button',
			name: 'Overlay Next Button',
		},
		{
			variableId: 'overlay_previous_button',
			name: 'Overlay Previous Button',
		},
		{
			variableId: 'overlay_trigger_count',
			name: 'Overlay Trigger Count',
		},
		{
			variableId: 'overlay_average_interval',
			name: 'Overlay Average Interval (seconds)',
		},
		{
			variableId: 'overlay_mode',
			name: 'Overlay Selection Mode',
		},

		// Performance Variables
		{
			variableId: 'http_success_rate',
			name: 'HTTP Success Rate',
		},
		{
			variableId: 'http_errors',
			name: 'HTTP Error Count',
		},
		{
			variableId: 'queue_size',
			name: 'Button Press Queue Size',
		},

		// MIDI Variables
		{
			variableId: 'midi_status',
			name: 'MIDI Connection Status',
		},
		{
			variableId: 'midi_port',
			name: 'Connected MIDI Port',
		},
		{
			variableId: 'midi_last_note',
			name: 'Last MIDI Note Received',
		},
		{
			variableId: 'midi_last_cc',
			name: 'Last MIDI CC Received',
		},
		{
			variableId: 'midi_last_velocity',
			name: 'Last MIDI Note Velocity',
		},
		{
			variableId: 'midi_last_channel',
			name: 'Last MIDI Channel',
		},
		{
			variableId: 'midi_last_cc_value',
			name: 'Last MIDI CC Value',
		},
	]
}
