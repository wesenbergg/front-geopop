import L from 'leaflet';

const customIcon = new L.Icon({
    iconUrl: require('../icon.png'),
    iconRetinaUrl: require('../icon.png'),
    shadowUrl: null,
    shadowSize: null,
    iconAnchor:   [22, 94],
    shadowAnchor: [4, 62],
    popupAnchor:  [10, -90],
    iconSize: new L.Point(60, 60),
    className: "leaflet-div-icon"
});

export default customIcon;