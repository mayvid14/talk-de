import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable, of } from 'rxjs';
import { Message } from '../models/message';
import { User } from '../models/user';

@Injectable({
	providedIn: 'root'
})
export class FeedService {
	activeMembers: Array<User> = [];
	feed: Array<Message> = [];

	constructor(private socket: Socket) {
		this.socket.fromEvent<Message>('new message').subscribe(message => {
			console.log(message);
			this.feed.push(message);
		});
	}

	getMessages(): Observable<Array<Message>> {
		return of(this.feed);
	}

	getMembers(): Observable<Array<User>> {
		return of(this.activeMembers);
	}
}
