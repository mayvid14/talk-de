import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable, of } from 'rxjs';
import { Message } from '../models/message';
import { User } from '../models/user';
import { TalkService } from './talk.service';

@Injectable({
	providedIn: 'root'
})
export class FeedService {
	activeMembers: Array<User> = [];
	feed: Array<Message> = [];

	constructor(private socket: Socket, private service: TalkService) {
		this.socket.fromEvent<Message>('new message').subscribe(message => {
			console.log(message);
			this.feed.unshift(message);
		});
	}

	init(): void{
		const sub = this.service.populateFeed().subscribe(feed => {
			this.feed.length = 0;
			this.feed.push(...feed);
			sub.unsubscribe();
		});
	}

	getMessages(): Observable<Array<Message>> {
		return of(this.feed);
	}
}
