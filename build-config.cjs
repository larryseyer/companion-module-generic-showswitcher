// Build configuration for companion-module-generic-showswitcher
// This file configures webpack to handle the jzz MIDI library properly

const fs = require('fs')
const path = require('path')

module.exports = {
	// Mark jzz as external so webpack doesn't try to bundle it
	// This is necessary because jzz uses native binaries that cannot be bundled  
	externals: {
		jzz: 'commonjs jzz'
	},
	
	// Post-build step to fix package.json
	onComplete: async (context) => {
		const pkgPath = path.join(context.output, 'package.json')
		if (fs.existsSync(pkgPath)) {
			const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'))
			// Fix the package name to not have spaces
			pkg.name = 'generic-showswitcher'
			// Add jzz as a dependency
			pkg.dependencies = pkg.dependencies || {}
			pkg.dependencies.jzz = '^1.8.0'
			fs.writeFileSync(pkgPath, JSON.stringify(pkg))
		}
	}
}