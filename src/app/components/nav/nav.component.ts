import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'navigator',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  @Input('appName') title: String;
  appName: String;
  
  constructor() { }

  ngOnInit() {
    this.appName = this.title;
  }

}
