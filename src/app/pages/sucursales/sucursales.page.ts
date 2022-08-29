import { AfterViewInit, Component, OnInit } from '@angular/core';

declare var mapboxgl: any;
declare var MapboxGeocoder: any;

@Component({
  selector: 'app-sucursales',
  templateUrl: './sucursales.page.html',
  styleUrls: ['./sucursales.page.scss'],
})
export class SucursalesPage implements OnInit, AfterViewInit {

  constructor() { }
  ngAfterViewInit(): void {
    mapboxgl.accessToken = 'pk.eyJ1IjoiYWxleGlpc3N2ciIsImEiOiJja2hjaHE5bjYwMW0xMnlvOWk1NG82dDI1In0.OwZEz5ayKchPrvIHOrYajA';
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-98.2034607, 19.0379295],
      zoom: 11.15
    });
    // create the popup
    const popup = new mapboxgl.Popup({ offset: 25 })
    .setHTML('  <ion-text color="rojo" class="ion-text-center"><h1>Puebla Express</h1></ion-text>'
    );
    const marker = new mapboxgl.Marker()
      .setPopup(popup)
      .setLngLat([-98.2062, 19.0413])
      .addTo(map);

    const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      /*marker: {
      color: 'red'
      },*/
      mapboxgl
      });
    map.addControl(geocoder);
    map.on('load', () => {
      map.resize();
    });
  }

  ngOnInit() {
  }

}
