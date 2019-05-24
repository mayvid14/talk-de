import { Component, OnInit } from '@angular/core';
import { TalkService } from '../../providers/talk.service';
import { User } from '../../models/user';
import { fromEvent } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
	selector: 'app-message-input',
	templateUrl: './message-input.component.html',
	styleUrls: ['./message-input.component.scss']
})
export class MessageInputComponent implements OnInit {
	txt = '';
	user: User;

	constructor(private service: TalkService) { }

	ngOnInit() {
		this.service.user.subscribe(u => {
			this.user = u;
		});
	}

	submit(): void {
		this.service.sendMessage(this.txt.slice(0,-1));
		this.txt = '';
	}

}
