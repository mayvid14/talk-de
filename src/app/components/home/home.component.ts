import { Component, OnInit } from '@angular/core';
import { TalkService } from '../../providers/talk.service';
import { User } from '../../models/user';
import { Socket } from 'ngx-socket-io';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
	user: User;
	fileReader: FileReader;
	arr: Array<User> = [];

	constructor(private service: TalkService, private socket: Socket) { }

	ngOnInit() {
		this.fileReader = new FileReader();
		this.fileReader.onloadend = () => {
			this.user.profileUrl = this.fileReader.result;
		}
		this.socket.fromEvent('new user').subscribe((nu: User) => {
			this.arr.push(nu);
			console.log(this.arr);
		});
		this.service.user.subscribe(val => {
			this.user = val;
			this.getUserImage();
		});
	}

	getUserImage(): void {
		if (!this.user.profileUrl) {
			this.service.getImage(this.user.profile).subscribe(f => {
				this.fileReader.readAsDataURL(f);
			});
		}
	}

}
