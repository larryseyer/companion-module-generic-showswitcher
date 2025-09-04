// Build configuration for companion-module-generic-showswitcher
// This file tells webpack to treat jzz as an external dependency
// so it doesn't try to bundle it and its native binaries

module.exports = {
	// Mark jzz as external so it's not bundled by webpack
	// This is necessary because jzz uses native binaries (jazz-midi)
	// that cannot be properly bundled
	externals: ['jzz'],

	// Copy jzz and its dependencies manually since the package name has spaces
	extraFiles: ['node_modules/jzz/**/*', 'node_modules/jazz-midi/**/*', 'node_modules/@types/webmidi/**/*'],
}
