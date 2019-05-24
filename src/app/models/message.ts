import * as moment from 'moment';
import { User } from './user';

export class Message {
	sentBy: User;
	sentAt: moment.Moment;
	content: string;
	attachment?: string | ArrayBuffer | File;
}
