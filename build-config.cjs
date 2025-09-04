// Build configuration for companion-module-generic-showswitcher
// This file configures webpack to handle the jzz MIDI library properly

const fs = require('fs')
const path = require('path')

module.exports = {
	// Mark jzz and jazz-midi as external so they get included as dependencies
	// These modules contain native binaries that must be installed, not bundled
	externals: {
		jzz: 'commonjs jzz',
		'jazz-midi': 'commonjs jazz-midi',
	},

	// Post-build step to fix package.json and ensure dependencies are included
	onComplete: async (context) => {
		const pkgPath = path.join(context.output, 'package.json')
		if (fs.existsSync(pkgPath)) {
			const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'))
			// Fix the package name to not have spaces
			pkg.name = 'generic-showswitcher'
			// Ensure JZZ is included as a dependency so it gets installed
			pkg.dependencies = pkg.dependencies || {}
			pkg.dependencies.jzz = '^1.8.0'
			fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2))
		}

		// Copy node_modules to the output directory for the native dependencies
		const sourceModules = path.join(context.root, 'node_modules')
		const destModules = path.join(context.output, 'node_modules')

		// Ensure jzz and its dependencies are available in the package
		const modulesToCopy = ['jzz', 'jazz-midi']
		for (const mod of modulesToCopy) {
			const src = path.join(sourceModules, mod)
			const dest = path.join(destModules, mod)
			if (fs.existsSync(src)) {
				// Create destination directory
				fs.mkdirSync(destModules, { recursive: true })
				fs.mkdirSync(dest, { recursive: true })
				// Copy module recursively
				copyRecursiveSync(src, dest)
			}
		}
	},
}

// Helper function to copy directories recursively
function copyRecursiveSync(src, dest) {
	const exists = fs.existsSync(src)
	const stats = exists && fs.statSync(src)
	const isDirectory = exists && stats.isDirectory()
	if (isDirectory) {
		fs.mkdirSync(dest, { recursive: true })
		fs.readdirSync(src).forEach((childItemName) => {
			copyRecursiveSync(path.join(src, childItemName), path.join(dest, childItemName))
		})
	} else {
		fs.copyFileSync(src, dest)
	}
}
