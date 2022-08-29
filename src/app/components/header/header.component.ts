import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() si: boolean = false;
  @Input() menu: boolean = false;
  @Input() back: boolean = false;
  @Input() home: boolean = false;

  constructor() { }

  ngOnInit() {}

}
