/**
 * Upgrade scripts for companion-module-generic-showswitcher
 * These handle migration of configurations between versions
 */

export const upgrades = [
	/**
	 * Version 2.0.4 - MIDI fix release
	 * No configuration changes, just dependency fixes
	 * All existing configs remain compatible
	 */
	function upgrade_to_2_0_4(_context, _props) {
		// No configuration changes needed for 2.0.4
		// This was purely a dependency/build fix for MIDI support
		// All existing configurations remain valid
		return {
			updatedConfig: null, // null means no changes needed
			updatedActions: [],
			updatedFeedbacks: [],
		}
	},

	/**
	 * Version 2.0.3 - UI improvements
	 * Preset consolidation but no config changes
	 */
	function upgrade_to_2_0_3(_context, _props) {
		// No configuration changes for 2.0.3
		// Presets were reorganized but existing configs remain valid
		return {
			updatedConfig: null,
			updatedActions: [],
			updatedFeedbacks: [],
		}
	},

	/**
	 * Version 2.0.0 - Major feature release
	 * Added new features but maintained backward compatibility
	 */
	function upgrade_from_1_x_to_2_0(context, props) {
		const result = {
			updatedConfig: null,
			updatedActions: [],
			updatedFeedbacks: [],
		}

		// Check if this is actually a 1.x config that needs upgrading
		if (props.config && !Object.prototype.hasOwnProperty.call(props.config, 'enable_statistics')) {
			// This is a 1.x config, add new 2.0 fields with defaults
			result.updatedConfig = {
				...props.config,
				// New 2.0 configuration options with safe defaults
				enable_statistics: true,
				enable_logging: false,
				auto_save_interval: 5,
				enable_button_queue: true,
				camera_sequential_mode: false,
				camera_avoid_repeats: true,
				camera_history_size: 5,
				overlay_sequential_mode: false,
				overlay_avoid_repeats: true,
				overlay_history_size: 5,
				midi_auto_connect: true,
				midi_port_name: '',
			}
		}

		// Migrate any old action names if they changed
		// (In this case, action names remained the same)

		// Migrate any old feedback names if they changed
		// (In this case, feedback names remained the same)

		return result
	},

	/**
	 * Helper function to handle any future upgrades
	 * Ensures smooth migration path for users
	 */
	function future_upgrade_handler(_context, _props) {
		// Template for future upgrades
		// This ensures that even if we add new required fields,
		// existing users won't lose their configurations
		return {
			updatedConfig: null,
			updatedActions: [],
			updatedFeedbacks: [],
		}
	},
]

/**
 * Main upgrade handler
 * This is called by Companion to migrate configurations
 */
export function upgradeInstance(context, props) {
	// Apply all necessary upgrades in sequence
	let result = {
		updatedConfig: props.config,
		updatedActions: props.actions || [],
		updatedFeedbacks: props.feedbacks || [],
	}

	// Run through each upgrade function if needed
	for (const upgradeFunc of upgrades) {
		const upgradeResult = upgradeFunc(context, {
			config: result.updatedConfig,
			actions: result.updatedActions,
			feedbacks: result.updatedFeedbacks,
		})

		// Apply updates if any were made
		if (upgradeResult.updatedConfig !== null) {
			result.updatedConfig = upgradeResult.updatedConfig
		}
		if (upgradeResult.updatedActions.length > 0) {
			result.updatedActions = upgradeResult.updatedActions
		}
		if (upgradeResult.updatedFeedbacks.length > 0) {
			result.updatedFeedbacks = upgradeResult.updatedFeedbacks
		}
	}

	// Mark the config with the current version
	if (result.updatedConfig) {
		result.updatedConfig._configVersion = '2.0.5'
	}

	return result
}
