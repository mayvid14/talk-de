import { Component, OnInit } from '@angular/core';
import { Message } from '../../models/message';
import { FeedService } from '../../providers/feed.service';
import { Observable, interval } from 'rxjs';
import { TalkService } from '../../providers/talk.service';
import { User } from '../../models/user';
import * as moment from 'moment';
import { takeWhile, map, flatMap, startWith } from 'rxjs/operators';

@Component({
	selector: 'app-feed',
	templateUrl: './feed.component.html',
	styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {
	messages: Observable<Array<Message>>;
	moment = moment;

	constructor(private feed: FeedService) { }

	ngOnInit() {
		this.messages = this.feed.getMessages();
		this.feed.init();
	}

	isRecent(id: string): boolean {
		return false;
	}

}
