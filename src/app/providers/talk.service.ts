import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../models/user';

@Injectable({
	providedIn: 'root'
})
export class TalkService {
	private url = 'http://localhost:2810';
	user: Subject<User> = new BehaviorSubject<User>(null);

	constructor(private http: HttpClient) { }

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
		return this.http.get(`${this.url}/image/${epath}`, {responseType: 'blob' as 'json'});
	}
}
