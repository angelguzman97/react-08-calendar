module.exports = {
	globDirectory: 'dist',
	globPatterns: [
		'**/*.{html,svg,js,css}'
	],
	swDest: 'dist/sw.js',
	// ignoreURLParametersMatching: [
	// 	/^utm_/,
	// 	/^fbclid$/
	// ],
	swSrc: 'src/sw-template.js' //generateSW no funciona con el esta propiedad
};