import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import * as moment from 'moment';

import { Socket } from 'ngx-socket-io';
import { User } from '../models/user';
import { Message } from '../models/message';

@Injectable({
	providedIn: 'root'
})
export class TalkService {
	private url = 'http://localhost:2810';
	user: Subject<User> = new BehaviorSubject<User>(null);
	userProfileCache = {};

	constructor(private http: HttpClient, private socket: Socket) { }

	login(username: string, password: string): Observable<User> {
		return this.http.post<User>(`${this.url}/login`, { username, password });
	}

	signup(username: string, password: string, profile: File): Observable<User> {
		const formData = new FormData();
		formData.append('username', username);
		formData.append('password', password);
		formData.append('profile', profile);
		return this.http.post<User>(`${this.url}/signup`, formData);
	}

	getImage(path: string): Observable<any> {
		const epath = encodeURI(path);
		return this.http.get(`${this.url}/image/${epath}`, { responseType: 'blob' as 'json' });
	}

	sendMessage(msg: string): void {
		this.user.subscribe(user => {
			const message: Message = {
				sentBy: {
					username: user.username,
					password: user.password,
					profile: user.profile,
					_id: user._id
				},
				sentAt: moment(),
				content: msg
			};
			this.socket.emit('new message', message);
		}, console.error);
	}

	addUrl(id: string, url: string | ArrayBuffer): void {
		this.userProfileCache[id] = url;
	}

	getUrl(id: string): string | ArrayBuffer {
		return this.userProfileCache[id];
	}
}
