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
	arr: Array<User> = [];

	constructor(private service: TalkService, private socket: Socket) { }

	ngOnInit() {
		this.socket.fromEvent('new user').subscribe((nu: Array<User>) => {
			this.arr.length = 0;
			this.arr.push(...nu);
			console.log(this.arr);
		});
		this.socket.fromEvent('refresh').subscribe(() => {
			this.socket.emit('new user', this.user);
		});
		this.service.user.subscribe(val => {
			this.user = val;
			this.socket.emit('new user', this.user);
		});
	}

}
