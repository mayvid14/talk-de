import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-active-members',
	templateUrl: './active-members.component.html',
	styleUrls: ['./active-members.component.scss']
})
export class ActiveMembersComponent implements OnInit {
	// active = true;

	constructor() { }

	ngOnInit() {
	}

	toggle(): void {
		// this.active = !this.active;
	}

}
