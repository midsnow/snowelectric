'use strict';
let electron = require('electron');
let app = electron.app;  // Module to control application life.
let BrowserWindow = electron.BrowserWindow;  // Module to create native browser window.
let ipc = electron.ipcMain;
let _ = require('lodash');

let Debug = require('debug');

let debug = Debug('snowstreams:electron');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;
let webContent;

// Quit when all windows are closed.
app.on('window-all-closed', function() {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform != 'darwin') {
    app.quit();
  }
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', function() {
	// Create the browser window.
	mainWindow = new BrowserWindow({width: 1000, height: 720, type:false, useContentSize:true, frame: false, transparent: true, darkTheme: false });

	// and load the index.html of the app.
	mainWindow.loadURL('file://' + __dirname + '/client.html');

	// Open the DevTools.
	webContent = mainWindow.webContents;
	webContent.openDevTools();
	
	// ipc events
	ipc.on('manageWindow', function(event, data) {
		debug('ipc on manageWindow', data);
		if(data.command && _.isFunction(mainWindow[data.command])) {
			if(data.command === 'maximize' && mainWindow.isMaximized()) {
				data.command = 'unmaximize';
			}
			mainWindow[data.command](data.data);
		}
	});
	ipc.on('status', function(event, data) {
		debug('ipc on status', data);
		event.sender.send('status');
	});

	// Emitted when the window is closed.
	mainWindow.on('closed', function() {
		// Dereference the window object, usually you would store windows
		// in an array if your app supports multi windows, this is the time
		// when you should delete the corresponding element.
		mainWindow = null;
	});
	
});


