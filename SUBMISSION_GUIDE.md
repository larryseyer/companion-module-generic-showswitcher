# Companion Module Submission Guide

## Module Status: ✅ READY FOR SUBMISSION

Your `companion-module-generic-showswitcher` module is compliant with BitFocus Companion guidelines and ready for submission to the module directory.

## Pre-Submission Checklist

### ✅ Completed Requirements
- [x] **Module Naming**: Follows `companion-module-manufacturer-product` convention
- [x] **Package Structure**: Proper directory structure with companion/ subfolder
- [x] **Dependencies**: Uses @companion-module/base v1.11.3 (compatible)
- [x] **Manifest**: Complete manifest.json with all required fields
- [x] **Documentation**: Comprehensive HELP.md file
- [x] **Core Features**: Implements Actions, Feedbacks, Presets, and Variables
- [x] **Build System**: Successfully builds with companion-module-build
- [x] **Code Quality**: ESLint and Prettier configurations added
- [x] **License**: MIT license specified
- [x] **Repository**: GitHub repository configured

### ✅ Module Features
- Actions: System control, camera control, overlay control
- Feedbacks: Visual indicators for all states
- Variables: Comprehensive status and counter variables
- Presets: Pre-configured button layouts
- MIDI Support: External control integration

## Submission Process

### Step 1: Final Testing
```bash
# Test the build
npm run build

# Run linter (fix any issues if they appear)
npm run lint

# Format code
npm run format

# Create distribution package
npm run package
```

### Step 2: GitHub Repository Setup
1. Ensure your repository is public at: https://github.com/bitfocus/companion-module-generic-showswitcher
2. Verify all code is committed and pushed:
```bash
git add .
git commit -m "feat: prepare module for Companion directory submission"
git push origin main
```

### Step 3: Submit to Module Directory

1. **Fork the Companion Repository**
   - Go to https://github.com/bitfocus/companion
   - Click "Fork" button

2. **Add Your Module Reference**
   - In your fork, navigate to `module-legacy/manifests/`
   - Create/edit the appropriate manufacturer file (generic.json in your case)
   - Add your module entry:
   ```json
   {
     "id": "generic-showswitcher",
     "name": "Show Switcher",
     "description": "Professional broadcast automation with pause/resume, sequential/random modes",
     "repo": "https://github.com/bitfocus/companion-module-generic-showswitcher",
     "version": "2.0.3"
   }
   ```

3. **Create Pull Request**
   - Commit your changes with message: `feat: add generic-showswitcher module`
   - Push to your fork
   - Create Pull Request to bitfocus/companion main branch
   - Title: `Module: Add Generic Show Switcher`
   - Description:
   ```markdown
   ## New Module: Generic Show Switcher
   
   Adds support for automated show switching with camera and overlay control.
   
   ### Features
   - Dual independent switchers for cameras and overlays
   - Random timing control with configurable ranges
   - Manual override capabilities
   - MIDI control support
   - Comprehensive feedback system
   - Dynamic button list management
   
   ### Testing
   - Module has been tested with Companion 3.x
   - All actions, feedbacks, and variables verified
   - Build process confirmed working
   
   Repository: https://github.com/bitfocus/companion-module-generic-showswitcher
   ```

### Step 4: Community Review Process

1. **Join Bitfocus Slack**
   - Join at: https://bfoc.us/uu1kmq6qs4
   - Join #module-development channel

2. **Announce Your Module**
   - Post in #module-development:
   ```
   Hi team! I've submitted a new module for review:
   Generic Show Switcher - automated camera/overlay switching
   PR: [your PR link]
   
   Would appreciate any feedback or testing!
   ```

3. **Respond to Feedback**
   - Monitor your PR for review comments
   - Address any requested changes promptly
   - Update your module as needed

### Step 5: Post-Approval

Once approved and merged:

1. **Module will appear in Companion**
   - Available in the module search
   - Users can install directly from Companion

2. **Maintain Your Module**
   - Monitor GitHub issues
   - Provide support to users
   - Update for new Companion versions as needed

## Testing Recommendations

Before submission, thoroughly test:

1. **Fresh Installation**
   - Delete node_modules and reinstall
   - Build from scratch
   - Test in a clean Companion instance

2. **Feature Testing**
   - All actions execute correctly
   - Feedbacks update properly
   - Variables display accurate values
   - Presets work as expected

3. **Edge Cases**
   - Empty button lists
   - Invalid timing ranges
   - Rapid start/stop cycles
   - MIDI connection/disconnection

## Module Maintenance

### Version Updates
When updating your module:
1. Update version in package.json
2. Update version in manifest.json
3. Create GitHub release with changelog
4. Submit PR to update module registry

### Breaking Changes
If making breaking changes:
- Implement upgrade scripts in upgrades.js
- Document migration path in CHANGELOG
- Use semantic versioning (major.minor.patch)

## Support Resources

- **Documentation**: https://github.com/bitfocus/companion-module-base/wiki
- **Slack Community**: #module-development on Bitfocus Slack
- **Issue Tracking**: GitHub Issues on your repository
- **Module Examples**: Other modules in the Companion ecosystem

## Contact Information

Maintain active contact for module support:
- GitHub: Monitor issues and PRs
- Slack: Stay active in #module-development
- Email: Update support email in manifest.json if needed

---

## Quick Commands Reference

```bash
# Development
npm run dev          # Watch mode development
npm run build:dev    # Development build

# Production
npm run build        # Production build
npm run package      # Create distribution package

# Code Quality
npm run lint         # Check code style
npm run format       # Format code

# Testing in Companion
# 1. Build the module
npm run build

# 2. Copy to Companion's module directory
# (location varies by OS, check Companion settings)

# 3. Restart Companion and test
```

## Success Indicators

Your module submission is successful when:
- ✅ PR is merged to bitfocus/companion
- ✅ Module appears in Companion's module search
- ✅ Users can install and use your module
- ✅ You receive positive feedback from the community

---

**Congratulations!** Your Show Switcher module is ready for the Companion community. Follow the steps above to complete your submission.