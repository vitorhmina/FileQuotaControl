import {Component} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {Settings} from '../configuration/settings';

@Component({
  selector: 'fqc-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  constructor(private titleService: Title) {
    this.titleService.setTitle(Settings.APP_NAME);
  }
}
