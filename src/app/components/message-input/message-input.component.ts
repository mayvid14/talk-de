import { Component, OnInit, TemplateRef } from '@angular/core';
import { TalkService } from '../../providers/talk.service';
import { User } from '../../models/user';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
	selector: 'app-message-input',
	templateUrl: './message-input.component.html',
	styleUrls: ['./message-input.component.scss']
})
export class MessageInputComponent implements OnInit {
	txt = '';
	caption = '';
	attachment: string|ArrayBuffer = '';
	user: User;
	modalRef: BsModalRef;
	reader: FileReader;
	filename = '';

	constructor(private service: TalkService, private modalService: BsModalService) { }

	ngOnInit() {
		this.service.user.subscribe(u => {
			this.user = u;
		});
		this.reader = new FileReader();
		this.reader.onloadend = () => {
			this.attachment = this.reader.result;
		};
	}

	submit(): void {
		(this.attachment.toString().length > 0) ? this.service.sendMessage(this.caption, this.attachment, this.filename) : this.service.sendMessage(this.txt.slice(0, -1));
		this.txt = '';
		this.caption = '';
		this.attachment = '';
		this.filename = '';
		this.modalRef ? this.modalRef.hide() : null;
	}

	openModal(template: TemplateRef<any>) {
		this.modalRef = this.modalService.show(template);
	}

	newFile(event: any): void {
		const file: File = event.target.files.item(0);
		this.reader.readAsDataURL(file);
		this.filename = file.name;
	}

}
