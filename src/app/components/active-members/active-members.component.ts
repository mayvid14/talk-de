import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../models/user';

@Component({
	selector: 'app-active-members',
	templateUrl: './active-members.component.html',
	styleUrls: ['./active-members.component.scss']
})
export class ActiveMembersComponent implements OnInit {
	@Input('online') members: Array<User>;

	constructor() { }

	ngOnInit() {
	}

}
