import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
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

	signup(username: string, password: string, profile: string | ArrayBuffer): Observable<User> {
		return this.http.post<User>(`${this.url}/signup`, { username, password, profile });
	}
}
