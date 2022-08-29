import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-captura-envio',
  templateUrl: './captura-envio.page.html',
  styleUrls: ['./captura-envio.page.scss'],
})
export class CapturaEnvioPage implements OnInit {
  names = [{
    text: 'Abigail Hodges',
    value: 1
}, {
    text: 'Adam Robertson',
    value: 2
}, {
    text: 'Adrian Mackay',
    value: 3
}, {
    text: 'Adrian Springer',
    value: 4
}];
  constructor() { }

  ngOnInit() {
  }

}
