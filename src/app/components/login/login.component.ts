import { Component, OnInit } from '@angular/core';
import { TalkService } from '../../providers/talk.service';
import { Router } from '@angular/router';
import { Socket } from 'ngx-socket-io';
import { User } from '../../models/user';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
	login = true;
	username = '';
	password = '';
	confirm = '';
	profile: File;
	imgSrc: string|ArrayBuffer = '';
	reader: FileReader;
	filename = '';
	retry = false;

	constructor(private service: TalkService, private router: Router, private socket: Socket) { }

	ngOnInit() {
		this.reader = new FileReader();
		this.reader.onloadend = () => {
			this.imgSrc = this.reader.result;
		};
	}

	newUser(): void {
		this.login = false;
	}

	newFile(event: any): void {
		const file: File = event.target.files.item(0);
		this.reader.readAsDataURL(file);
		this.profile = file;
		this.filename = file.name;
	}

	clear(): void {
		this.username = '';
		this.password = '';
		this.confirm = '';
		this.profile = null;
	}

	isDisabled(): boolean {
		if (this.login) {
			return !(this.username.trim().length > 0 && this.password.trim().length > 0);
		}
		return !(this.username.trim().length > 0 &&
			this.password.trim().length > 0 &&
			this.confirm.trim().length > 0 &&
			this.password === this.confirm &&
			this.profile);
	}

	submit(): void {
		if (this.login) {
			this.service.login(this.username, this.password).subscribe(res => {
				this.service.user.next(res as User);
				this.socket.emit('new user', res);
				this.router.navigate(['home']);
			}, error => {
				this.retry = true;
			});
		} else {
			this.service.signup(this.username, this.password, this.profile).subscribe(res => {
				this.service.user.next(res as User);
				this.socket.emit('new user', res);
				this.router.navigate(['home']);
			}, error => {
				this.retry = true;
			});
		}
	}

}
