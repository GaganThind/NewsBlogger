import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  @Input('appName') title: String;
  appName: String;

  ngOnInit() {
    this.appName = 'News Blogger';
  }
}
