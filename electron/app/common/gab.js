import {EventEmitter} from 'events';
import electron from './electron';

class Gab extends EventEmitter {
	constructor(props) {
		super(props)
		
		this.ipc = electron.ipcRenderer;
		this.ipc.send('status');
		this.ipc.on('status', () => {
			console.log('got status');
		});
	}
	
}

export default new Gab()
