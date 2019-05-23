import { Component, OnInit } from '@angular/core';
import { TalkService } from '../../providers/talk.service';
import { User } from '../../models/user';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
	user: User;

	constructor(private service: TalkService) { }

	ngOnInit() {
		this.service.user.subscribe(val => {
			this.user = val;
		});
	}

}
