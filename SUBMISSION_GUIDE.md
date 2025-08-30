# Complete Guide to Submitting Your Module to Bitfocus

This guide will walk you through the entire process of submitting the Show Switcher module to Bitfocus for inclusion in the official Companion module repository.

## Overview

Bitfocus requires all modules to be hosted on GitHub. The submission process involves:
1. Creating your own GitHub repository for the module
2. Uploading your module code
3. Submitting a pull request to Bitfocus

## Prerequisites

Before starting, ensure you have:
- [ ] A GitHub account (free at https://github.com)
- [ ] Git installed on your computer
- [ ] The module built and tested (`generic-showswitcher-1.0.0.tgz` exists)
- [ ] All documentation files created (README.md, LICENSE, etc.)

## Step 1: Initialize Git Repository

**IMPORTANT**: Initialize git in the MODULE directory, NOT the parent companion directory.

```bash
# Navigate to YOUR MODULE directory
cd /Users/larryseyer/companion/companion-module-generic-showswitcher

# Initialize git repository
git init

# Check that .gitignore is properly configured
cat .gitignore
```

Your `.gitignore` file should contain:
```
# Dependencies
node_modules/
package-lock.json
yarn.lock

# Build outputs
*.tgz
dist/
build/
pkg/

# IDE files
.vscode/
.idea/
*.swp
*.swo
*~
.DS_Store

# Logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Testing
coverage/
.nyc_output/

# Environment
.env
.env.local
.env.*.local

# Temporary files
tmp/
temp/
*.tmp
```

## Step 2: Verify Required Files

Ensure these files exist in your module directory:

### Required Files (MUST be included):
- [x] `package.json` - Module metadata and dependencies
- [x] `main.js` - Main module entry point
- [x] `actions.js` - Action definitions
- [x] `feedbacks.js` - Feedback definitions
- [x] `variables.js` - Variable definitions
- [x] `presets.js` - Preset definitions
- [x] `upgrades.js` - Upgrade scripts (even if empty)
- [x] `companion/manifest.json` - Module manifest
- [x] `companion/HELP.md` - In-app help documentation
- [x] `README.md` - GitHub documentation
- [x] `LICENSE` - License file (MIT recommended)

### Files that will be EXCLUDED (via .gitignore):
- `node_modules/` - Dependencies (installed via npm)
- `*.tgz` - Built packages
- `.DS_Store` - macOS system files
- `package-lock.json` - Lock file

## Step 3: Create GitHub Repository

1. **Log into GitHub**
   - Go to https://github.com
   - Sign in to your account

2. **Create New Repository**
   - Click the "+" icon in top-right corner
   - Select "New repository"
   - Fill in the details:
     - **Repository name**: `companion-module-generic-showswitcher`
     - **Description**: "Bitfocus Companion module for automatic camera and overlay switching with random timing control"
     - **Public/Private**: Select **Public** (required for Bitfocus)
     - **Initialize**: Do NOT add README, .gitignore, or license (we have these)
   - Click "Create repository"

3. **Copy the repository URL**
   - After creation, GitHub shows quick setup instructions
   - Copy the HTTPS URL (looks like: `https://github.com/YOUR-USERNAME/companion-module-generic-showswitcher.git`)

## Step 4: Upload Your Module to GitHub

Execute these commands in your module directory:

```bash
# Make sure you're in the module directory
cd /Users/larryseyer/companion/companion-module-generic-showswitcher

# Add all files (respecting .gitignore)
git add .

# Verify what will be committed (should NOT include node_modules or .tgz files)
git status

# Create your first commit
git commit -m "Initial release of Show Switcher module v1.0.0

- Automatic camera and overlay switching with random intervals
- 22 actions for complete control
- 14 visual feedbacks
- 12 dynamic variables  
- 19 ready-to-use presets
- Comprehensive documentation
- MIT License"

# Add your GitHub repository as the remote origin
# Replace YOUR-USERNAME with your actual GitHub username
git remote add origin https://github.com/YOUR-USERNAME/companion-module-generic-showswitcher.git

# Push to GitHub
git branch -M main
git push -u origin main
```

## Step 5: Verify GitHub Upload

1. Go to your repository on GitHub: `https://github.com/YOUR-USERNAME/companion-module-generic-showswitcher`
2. Verify all files are present EXCEPT:
   - No `node_modules` directory
   - No `.tgz` files
   - No `.DS_Store` files
3. Check that README.md displays correctly on the main page

## Step 6: Test Installation from GitHub

Before submitting, test that Bitfocus can install your module:

```bash
# In a temporary directory, test cloning and building
cd /tmp
git clone https://github.com/YOUR-USERNAME/companion-module-generic-showswitcher.git test-module
cd test-module
npm install
npm run build

# Should create generic-showswitcher-1.0.0.tgz successfully
ls *.tgz
```

## Step 7: Submit to Bitfocus

### Method A: Pull Request to Module Repository (Recommended)

1. **Fork the Companion Repository**
   - Go to https://github.com/bitfocus/companion
   - Click "Fork" button (top-right)
   - This creates your own copy

2. **Add Your Module as a Submodule**
   ```bash
   # Clone your fork
   git clone https://github.com/YOUR-USERNAME/companion.git
   cd companion
   
   # Add your module as a submodule
   cd bundled-modules
   git submodule add https://github.com/YOUR-USERNAME/companion-module-generic-showswitcher.git
   
   # Commit the addition
   git add .
   git commit -m "Add generic-showswitcher module"
   git push
   ```

3. **Create Pull Request**
   - Go to your fork on GitHub
   - Click "Pull requests" → "New pull request"
   - Write a clear description of your module
   - Submit the pull request

### Method B: Module Request Issue (Alternative)

1. **Go to Module Requests Repository**
   - Navigate to https://github.com/bitfocus/companion-module-requests

2. **Create New Issue**
   - Click "Issues" → "New Issue"
   - Select "Module Request" template
   - Fill in the information:
     ```markdown
     **Module Name**: Show Switcher
     **Module ID**: generic-showswitcher
     **Repository URL**: https://github.com/YOUR-USERNAME/companion-module-generic-showswitcher
     **Description**: Automatic camera and overlay switching with random timing control
     **Category**: Generic
     **Tested Companion Version**: 3.0.0+
     **Author**: Larry Seyer
     **License**: MIT
     ```

3. **Submit the Issue**
   - Click "Submit new issue"
   - Bitfocus team will review and add your module

## Step 8: After Submission

### What Happens Next:

1. **Review Process** (1-2 weeks typically)
   - Bitfocus team reviews code quality
   - Tests basic functionality
   - Checks documentation completeness
   - May request changes via GitHub comments

2. **If Changes Requested**:
   ```bash
   # Make requested changes in your local module directory
   cd /Users/larryseyer/companion/companion-module-generic-showswitcher
   
   # Edit files as needed
   # Then commit and push changes
   git add .
   git commit -m "Address review feedback: [describe changes]"
   git push
   ```

3. **Upon Approval**:
   - Module gets added to official repository
   - Available in Companion's module store
   - Listed on Companion website

### Maintain Your Module:

Once accepted, you're responsible for:
- Fixing bugs reported by users
- Updating for new Companion versions
- Responding to GitHub issues
- Adding new features as requested

## Quick Reference Commands

```bash
# Complete submission workflow
cd /Users/larryseyer/companion/companion-module-generic-showswitcher
git init
git add .
git status  # Verify files
git commit -m "Initial release v1.0.0"
git remote add origin https://github.com/YOUR-USERNAME/companion-module-generic-showswitcher.git
git branch -M main
git push -u origin main
```

## Troubleshooting

### "Permission denied" when pushing to GitHub
- Make sure you're logged in: `git config --global user.email "your-email@example.com"`
- Use personal access token instead of password for HTTPS
- Or set up SSH keys: https://docs.github.com/en/authentication

### Files missing on GitHub
- Check `.gitignore` isn't excluding required files
- Use `git status` to see what's being tracked
- Force add if needed: `git add -f filename`

### Module doesn't build after cloning
- Ensure all source files are committed (not in .gitignore)
- Check `package.json` has all dependencies listed
- Verify `type: "module"` is in package.json

### Pull request not being reviewed
- Join Companion Slack: https://bitfocus.io/slack
- Post in #module-development channel
- Be patient - reviews are done by volunteers

## Important URLs

- **Companion Modules Repository**: https://github.com/bitfocus/companion
- **Module Requests**: https://github.com/bitfocus/companion-module-requests
- **Module Base Documentation**: https://github.com/bitfocus/companion-module-base
- **Companion Slack**: https://bitfocus.io/slack
- **Your Module** (after upload): https://github.com/YOUR-USERNAME/companion-module-generic-showswitcher

## Final Checklist

Before submitting, verify:

- [ ] Module builds successfully (`npm run build`)
- [ ] All required files are present
- [ ] `.gitignore` excludes build artifacts and dependencies
- [ ] README.md has installation instructions
- [ ] LICENSE file exists (MIT recommended)
- [ ] Module tested in Companion 3.0.0 or later
- [ ] GitHub repository is public
- [ ] No sensitive information in code (API keys, passwords)
- [ ] Code follows JavaScript best practices
- [ ] Variables use correct format: `$(instance:variable)`

## Support

If you need help:
1. Join Companion Slack (#module-development channel)
2. Check existing modules for examples
3. Read the module base documentation
4. Ask in GitHub Discussions

---

**Remember**: Replace `YOUR-USERNAME` with your actual GitHub username in all commands and URLs!

Good luck with your submission! 🚀