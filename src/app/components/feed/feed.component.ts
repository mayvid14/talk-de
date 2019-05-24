import { Component, OnInit } from '@angular/core';
import { Message } from '../../models/message';
import { FeedService } from '../../providers/feed.service';
import { Observable } from 'rxjs';
import { TalkService } from '../../providers/talk.service';
import { User } from '../../models/user';
import * as moment from 'moment';

@Component({
	selector: 'app-feed',
	templateUrl: './feed.component.html',
	styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {
	messages: Observable<Array<Message>>;
	reader: FileReader;
	moment = moment;
	recentMsgBy = '';

	constructor(private feed: FeedService, private service: TalkService) { }

	ngOnInit() {
		this.messages = this.feed.getMessages();
		this.reader = new FileReader();
	}

	getImage(user: User): string|ArrayBuffer{
		let url = this.service.getUrl(user._id);
		if (url !== undefined) {
			return url;
		}
		this.service.getImage(user.profile).subscribe(val => {
			this.reader.onloadend = () => {
				url = this.reader.result;
				this.service.addUrl(user._id, url);
			};
			this.reader.readAsDataURL(val);
		});
		return url;
	}

	isRecent(id: string): boolean{
		return false;
	}

}
