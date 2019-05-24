import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { FeedService } from '../../providers/feed.service';
import { TalkService } from '../../providers/talk.service';

@Component({
	selector: 'app-active-members',
	templateUrl: './active-members.component.html',
	styleUrls: ['./active-members.component.scss']
})
export class ActiveMembersComponent implements OnInit {
	members: Array<User> = [];
	reader: FileReader;

	constructor(private feed: FeedService, private service: TalkService) { }

	ngOnInit() {
		this.reader = new FileReader();
		this.feed.getMembers().subscribe(m => {
			this.members = m;
		});
	}

	getImage(user: User): string | ArrayBuffer {
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
	}

}
