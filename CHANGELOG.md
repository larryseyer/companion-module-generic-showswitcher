# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.5] - 2025-01-04

### Fixed

- **CRITICAL: Properly fixed MIDI dependency bundling** - Previous fix in 2.0.4 did not work on remote machines
- Changed jzz import from createRequire with hardcoded absolute paths to standard ES module import
- Configured webpack to treat jzz as an external CommonJS dependency
- Fixed package.json generation to include jzz dependency in distributed module
- MIDI ports now properly appear on all machines, not just development machine

## [2.0.4] - 2024-09-03

### Fixed

- **CRITICAL: Fixed MIDI support in distributed packages** - MIDI ports were not being detected when module was installed from .tgz file
- Properly bundled jzz and jazz-midi dependencies with all platform-specific native binaries
- Removed console.log statements from production code
- Fixed maintainer email in manifest.json
- Removed .DS_Store files from distribution
- Updated all documentation to reflect correct version numbers

### Changed

- Module now includes native MIDI binaries for Windows (x86/x64), macOS (Intel/ARM), and Linux (x64/ARM7)
- Added pkg/ directory to .gitignore

### Added

- Proper upgrade path in upgrades.js to prevent forced button reloading between versions
- Configuration migration handlers for seamless version upgrades

## [2.0.3] - 2024-09-02

### Added

- **MAJOR UI IMPROVEMENT**: Optimized preset layout from 29 to 19 buttons (35% reduction)
- Smart button consolidation - Combined related displays for efficiency
- Consistent color coding system - Standardized visual feedback across all buttons
- Connection status icons - Visual indicators (✓, ✗, ⚡) for better feedback
- Multi-display buttons - Combined countdowns, counters, averages, and previews

### Fixed

- MIDI toggle connection - Properly reconnects after disconnection
- Text readability - Eliminated word wrapping issues, optimized font sizes

### Changed

- Logical category organization - 5 priority-based categories
- Improved preset design with better visual hierarchy

## [2.0.2] - 2024-09-01

### Fixed

- Bug fixes and stability improvements
- Enhanced preset buttons with better visual feedback

## [2.0.0] - 2024-08-30

### Added

- Pause/Resume functionality for system operation
- Sequential selection mode as alternative to random
- Button blacklisting for temporary exclusion from rotation
- Performance monitoring with HTTP success rates and response times
- Button press queue system to prevent overload
- History tracking with configurable size
- Average interval calculations for both switchers
- Extended MIDI control with pause/resume support (CC48/49)
- Session management tracking total runtime and session counts
- Persistent statistics with auto-save functionality
- Mode toggle actions for quick switching between sequential/random

### Changed

- Reduced preset count from 29 to 19 through intelligent consolidation
- Improved error handling and recovery mechanisms
- Enhanced configuration options for all features
- Optimized button layouts with consistent color coding

### Fixed

- Various stability improvements
- Better handling of edge cases in button selection

## [1.0.3] - 2024-08-15

### Fixed

- Bug fixes and stability improvements
- Enhanced MIDI port detection

## [1.0.2] - 2024-08-10

### Added

- Default camera return when system stops
- Improved system shutdown behavior

## [1.0.1] - 2024-08-05

### Added

- Comprehensive MIDI control support
- Direct MIDI input with automatic port detection
- MIDI Note assignments for all major functions
- MIDI CC mappings for timer control

## [1.0.0] - 2024-08-01

### Added

- Initial release
- Dual independent switchers for cameras and overlays
- Random timing control within configurable ranges
- HTTP API integration with Companion
- Manual trigger override
- Dynamic button list management
- Comprehensive status variables
- Visual feedbacks for all states
- Basic preset buttons

[2.0.4]: https://github.com/bitfocus/companion-module-generic-showswitcher/compare/v2.0.3...v2.0.4
[2.0.3]: https://github.com/bitfocus/companion-module-generic-showswitcher/compare/v2.0.2...v2.0.3
[2.0.2]: https://github.com/bitfocus/companion-module-generic-showswitcher/compare/v2.0.0...v2.0.2
[2.0.0]: https://github.com/bitfocus/companion-module-generic-showswitcher/compare/v1.0.3...v2.0.0
[1.0.3]: https://github.com/bitfocus/companion-module-generic-showswitcher/compare/v1.0.2...v1.0.3
[1.0.2]: https://github.com/bitfocus/companion-module-generic-showswitcher/compare/v1.0.1...v1.0.2
[1.0.1]: https://github.com/bitfocus/companion-module-generic-showswitcher/compare/v1.0.0...v1.0.1
[1.0.0]: https://github.com/bitfocus/companion-module-generic-showswitcher/releases/tag/v1.0.0
