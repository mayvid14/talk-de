import { Component, OnInit } from '@angular/core';
import { ElectronService } from './providers/electron.service';
import { TranslateService } from '@ngx-translate/core';
import { AppConfig } from '../environments/environment';
import { TalkService } from './providers/talk.service';
import { User } from './models/user';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
	user: User;

	constructor(public electronService: ElectronService,
		private translate: TranslateService, private service: TalkService) {

		translate.setDefaultLang('en');
		console.log('AppConfig', AppConfig);

		if (electronService.isElectron()) {
			console.log('Mode electron');
			console.log('Electron ipcRenderer', electronService.ipcRenderer);
			console.log('NodeJS childProcess', electronService.childProcess);
		} else {
			console.log('Mode web');
		}
	}

	ngOnInit(): void {
		this.service.user.subscribe(user => {
			this.user = user;
		});
	}

	minimize(): void {
		this.electronService.remote.getCurrentWindow().minimize();
	}
	maximize(): void {
		this.electronService.remote.getCurrentWindow().isMaximized() ?
			this.electronService.remote.getCurrentWindow().unmaximize() :
			this.electronService.remote.getCurrentWindow().maximize();
	}
	close(): void {
		this.electronService.remote.getCurrentWindow().close();
	}
}
