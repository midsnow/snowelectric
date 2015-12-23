System
	.import('./config.js')
	.then(function() {
		System.import('dependencies').catch(console.error.bind(console));
		System.import('app/app').catch(console.error.bind(console));	

	})
	.catch(console.error.bind(console));
