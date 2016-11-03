
import 'leaflet';

export class geocoder extends L.Control {

  public options = {
        position: 'topleft'
    };

  onAdd(map :L.Map) {
        var controlDiv = L.DomUtil.create('div', 'leaflet-draw-toolbar leaflet-bar');
        L.DomEvent
            .addListener(controlDiv, 'click', L.DomEvent.stopPropagation)
            .addListener(controlDiv, 'click', L.DomEvent.preventDefault)
        .addListener(controlDiv, 'click', function () {
            drawnItems.clearLayers();
        });

        var controlUI = L.DomUtil.create('a', 'leaflet-draw-edit-remove', controlDiv);
        controlUI.title = 'Remove All Polygons';
        controlUI.href = '#';
        return controlDiv;
  }
}
