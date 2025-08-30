# Quick Submission Steps for Show Switcher Module

## You Are Here
- **Current Directory**: `/Users/larryseyer/companion/companion-module-generic-showswitcher`
- **Git Status**: Initialized and files staged
- **Module Package**: `generic-showswitcher-1.0.0.tgz` (33KB)

## Step-by-Step Commands to Submit

### 1. Commit Your Code (You Are Here)
```bash
# You've already done: git init && git add .
# Now commit:
git commit -m "Initial release of Show Switcher module v1.0.0"
```

### 2. Create GitHub Repository
1. Go to: https://github.com/new
2. Name: `companion-module-generic-showswitcher`
3. Description: "Bitfocus Companion module for automatic camera and overlay switching"
4. Make it PUBLIC
5. DO NOT initialize with README
6. Click "Create repository"

### 3. Push to GitHub
```bash
# Replace YOUR-GITHUB-USERNAME with your actual username
git remote add origin https://github.com/YOUR-GITHUB-USERNAME/companion-module-generic-showswitcher.git
git branch -M main
git push -u origin main
```

### 4. Submit to Bitfocus

**Option A - Create Issue (Easiest)**
1. Go to: https://github.com/bitfocus/companion-module-requests/issues/new
2. Title: "New Module: Show Switcher (generic-showswitcher)"
3. Body:
```markdown
**Module Name**: Show Switcher
**Module ID**: generic-showswitcher  
**Repository**: https://github.com/YOUR-GITHUB-USERNAME/companion-module-generic-showswitcher
**Description**: Automatic camera and overlay switching with random timing control
**Features**:
- Dual independent switchers (camera & overlay)
- Random interval selection within configured ranges
- 22 actions, 14 feedbacks, 12 variables, 19 presets
- Manual override capabilities
- HTTP API integration

**Tested with**: Companion 3.0.0+
**License**: MIT
```

**Option B - Slack (Fastest Response)**
1. Join: https://bitfocus.io/slack
2. Go to #module-development channel
3. Post: "New module submitted: Show Switcher - automatic camera/overlay switching with random timing. Repository: [your github link]"

## Files That Will Be on GitHub

✅ **Included** (13 files):
- `.gitignore`
- `LICENSE`
- `README.md`
- `SUBMISSION_GUIDE.md`
- `actions.js`
- `companion/HELP.md`
- `companion/manifest.json`
- `feedbacks.js`
- `main.js`
- `package.json`
- `presets.js`
- `upgrades.js`
- `variables.js`

❌ **Excluded** (via .gitignore):
- `node_modules/` (dependencies)
- `generic-showswitcher-1.0.0.tgz` (built package)
- `.DS_Store` (macOS file)
- `package-lock.json` (lock file)
- `pkg/` (build directory)

## Testing Your Submission

After pushing to GitHub, test it works:
```bash
cd /tmp
git clone https://github.com/YOUR-GITHUB-USERNAME/companion-module-generic-showswitcher.git test
cd test
npm install
npm run build
# Should create the .tgz file successfully
```

## Current Module Status

- ✅ Code complete and tested
- ✅ Documentation complete
- ✅ Git initialized
- ✅ Files staged for commit
- ⏳ Awaiting GitHub push
- ⏳ Awaiting Bitfocus submission

## Remember
- Use YOUR actual GitHub username in all URLs
- Repository MUST be public
- Don't include sensitive data
- Be patient - review can take 1-2 weeks

---
*Module Location*: `/Users/larryseyer/companion/companion-module-generic-showswitcher`
*Quick Help*: Run `git status` to see current state