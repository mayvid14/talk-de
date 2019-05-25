import 'reflect-metadata';
import '../polyfills';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { HttpClientModule, HttpClient } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

// NG Translate
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { ElectronService } from './providers/electron.service';

import { WebviewDirective } from './directives/webview.directive';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { ActiveMembersComponent } from './components/active-members/active-members.component';
import { MessageInputComponent } from './components/message-input/message-input.component';
import { FeedComponent } from './components/feed/feed.component';
import { ModalModule } from 'ngx-bootstrap/modal';

const config: SocketIoConfig = { url: 'http://localhost:2810', options: {} };
// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
	return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
	declarations: [
		AppComponent,
		HomeComponent,
		WebviewDirective,
		LoginComponent,
		ActiveMembersComponent,
		MessageInputComponent,
		FeedComponent
	],
	imports: [
		BrowserModule,
		FormsModule,
		HttpClientModule,
		AppRoutingModule,
		TranslateModule.forRoot({
			loader: {
				provide: TranslateLoader,
				useFactory: (HttpLoaderFactory),
				deps: [HttpClient]
			}
		}),
		SocketIoModule.forRoot(config),
		ModalModule.forRoot()
	],
	providers: [ElectronService],
	bootstrap: [AppComponent]
})
export class AppModule { }
