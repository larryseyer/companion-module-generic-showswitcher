// Preset Packages for ShowSwitcher Module
// These are organized collections of presets for different use cases

export function getPresetPackages() {
	return {
		// Full Production Package - All 30 buttons for complete control
		fullProduction: {
			name: '🎬 Full Production Setup (30 buttons)',
			description: 'Complete ShowSwitcher control for professional production',
			layout: [
				// Row 1: System Control (7 buttons + page nav)
				['system_control', 'system_pause_resume', 'system_reset', 'system_status_display', 
				 'system_duration', 'system_total_runtime', 'system_session_count'],
				
				// Row 2: Camera Control (7 buttons + page nav)
				['camera_control', 'camera_manual', 'camera_mode', 'camera_countdown',
				 'camera_next', 'camera_count', 'camera_average_interval'],
				
				// Row 3: Overlay Control (7 buttons + page nav)
				['overlay_control', 'overlay_manual', 'overlay_mode', 'overlay_countdown',
				 'overlay_next', 'overlay_count', 'overlay_average_interval'],
				
				// Row 4: MIDI & Monitoring (7 buttons + page nav)
				['midi_control', 'midi_port', 'midi_last_note', 'http_success_rate',
				 'http_error_count', 'queue_size', 'statistics_control']
			]
		},

		// Simplified Package - Essential controls only (16 buttons)
		simplified: {
			name: '🎯 Simplified Control (16 buttons)',
			description: 'Essential controls for basic operation',
			layout: [
				// Row 1: Core System
				['system_control', 'system_pause_resume', 'system_status_display', 'system_duration'],
				
				// Row 2: Camera Essentials
				['camera_control', 'camera_manual', 'camera_countdown', 'camera_next'],
				
				// Row 3: Overlay Essentials
				['overlay_control', 'overlay_manual', 'overlay_countdown', 'overlay_next'],
				
				// Row 4: Monitoring
				['midi_control', 'midi_last_note', 'http_success_rate', 'queue_size']
			]
		},

		// Camera-Only Package (8 buttons)
		cameraOnly: {
			name: '📹 Camera Control Only',
			description: 'Focused camera switching control',
			layout: [
				['camera_control', 'camera_manual', 'camera_mode', 'camera_countdown',
				 'camera_next', 'camera_count', 'camera_average_interval', 'system_status_display']
			]
		},

		// Overlay-Only Package (8 buttons)
		overlayOnly: {
			name: '🎨 Overlay Control Only',
			description: 'Focused overlay switching control',
			layout: [
				['overlay_control', 'overlay_manual', 'overlay_mode', 'overlay_countdown',
				 'overlay_next', 'overlay_count', 'overlay_average_interval', 'system_status_display']
			]
		},

		// Monitoring Dashboard (8 buttons)
		monitoring: {
			name: '📊 Monitoring Dashboard',
			description: 'System health and performance monitoring',
			layout: [
				['system_status_display', 'system_duration', 'system_total_runtime', 'system_session_count',
				 'http_success_rate', 'http_error_count', 'queue_size', 'statistics_control']
			]
		},

		// MIDI Control Panel (8 buttons)
		midiPanel: {
			name: '🎹 MIDI Control Panel',
			description: 'Complete MIDI integration control',
			layout: [
				['midi_control', 'midi_port', 'midi_last_note', 'midi_last_cc',
				 'http_success_rate', 'system_control', 'camera_manual', 'overlay_manual']
			]
		},

		// Quick Access Package (8 buttons) - Most commonly used
		quickAccess: {
			name: '⚡ Quick Access',
			description: 'Most frequently used controls',
			layout: [
				['system_control', 'camera_control', 'camera_manual', 'overlay_control',
				 'overlay_manual', 'system_pause_resume', 'camera_countdown', 'overlay_countdown']
			]
		},

		// Status Display Package (8 buttons) - All status indicators
		statusDisplay: {
			name: '📱 Status Display',
			description: 'All status and countdown displays',
			layout: [
				['system_status_display', 'camera_countdown', 'overlay_countdown', 'camera_next',
				 'overlay_next', 'camera_count', 'overlay_count', 'system_duration']
			]
		}
	}
}

// Helper function to get preset IDs for a specific package
export function getPackagePresetIds(packageName) {
	const packages = getPresetPackages()
	const pkg = packages[packageName]
	
	if (!pkg) {
		return []
	}
	
	const ids = []
	pkg.layout.forEach(row => {
		row.forEach(presetId => {
			if (presetId && !ids.includes(presetId)) {
				ids.push(presetId)
			}
		})
	})
	
	return ids
}

// Helper function to generate layout description
export function getPackageLayoutDescription(packageName) {
	const packages = getPresetPackages()
	const pkg = packages[packageName]
	
	if (!pkg) {
		return 'Package not found'
	}
	
	let description = `${pkg.name}\n${pkg.description}\n\n`
	
	pkg.layout.forEach((row, index) => {
		description += `Row ${index + 1}: `
		description += row.filter(id => id).join(', ')
		description += '\n'
	})
	
	return description
}