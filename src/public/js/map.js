function MapboxMap(key) {
  this.accessToken = key;
  this.map = null;
  this.marker = null;
  this.popup = null;
}
MapboxMap.prototype.init = function (lng, lat, options) {
  this.lat = lat;
  this.lng = lng;
  var ops = {
    zoom: options && options.zoom? options.zoom : 6,
    center: options && options.center? options.center : [lng, lat],
  }
  mapboxgl.accessToken = this.accessToken;
  this.map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: ops.center, // starting position
    zoom: ops.zoom,
  });
  this.map.addControl(new mapboxgl.NavigationControl());
  return this;
}
MapboxMap.prototype.addMarker = function (lng, lat) {
  this.lat = lat || this.lat;
  this.lng = lng || this.lng;
  this.marker = this.marker || new mapboxgl.Marker();
  this.marker
    .setLngLat([
      this.lng,
      this.lat
    ])
    .addTo(this.map);
  return this;
}
MapboxMap.prototype.addPopup = function (title, subtitle) {
  title = title || '';
  subtitle = subtitle || '';
  this.popup = this.popup || new mapboxgl.Popup({ offset: 25, closeOnClick: false })
  this.popup
    .setLngLat([this.lng, this.lat])
    .setHTML('<h3 style="margin:0;font-size:17px;">'+title+'</h3><addres>'+subtitle+'</addres>')
    .addTo(this.map);
  return this;
}