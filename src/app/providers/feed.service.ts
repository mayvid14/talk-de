import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
import { Message } from '../models/message';

@Injectable({
	providedIn: 'root'
})
export class FeedService {
	imgCache = {};
	feed: Array<Message> = [];

	constructor(private socket: Socket) { }

	init(): void {
		this.socket.fromEvent<Message>('message').subscribe(message => {
			this.feed.push(message);
		});
	}
}
