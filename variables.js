export function getVariableDefinitions() {
	return [
		// System Variables
		{
			variableId: 'system_status',
			name: 'System Status'
		},
		{
			variableId: 'system_duration',
			name: 'System Active Duration'
		},

		// Camera Variables
		{
			variableId: 'camera_status',
			name: 'Camera Status'
		},
		{
			variableId: 'camera_countdown',
			name: 'Camera Countdown (seconds)'
		},
		{
			variableId: 'camera_next_button',
			name: 'Camera Next Button'
		},
		{
			variableId: 'camera_previous_button',
			name: 'Camera Previous Button'
		},
		{
			variableId: 'camera_trigger_count',
			name: 'Camera Trigger Count'
		},

		// Overlay Variables
		{
			variableId: 'overlay_status',
			name: 'Overlay Status'
		},
		{
			variableId: 'overlay_countdown',
			name: 'Overlay Countdown (seconds)'
		},
		{
			variableId: 'overlay_next_button',
			name: 'Overlay Next Button'
		},
		{
			variableId: 'overlay_previous_button',
			name: 'Overlay Previous Button'
		},
		{
			variableId: 'overlay_trigger_count',
			name: 'Overlay Trigger Count'
		}
	]
}