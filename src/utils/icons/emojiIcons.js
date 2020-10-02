import L from 'leaflet';

const base = {
    shadowUrl: require('../../img/emojis/shadow.png'),
    shadowRetinaUrl: require('../../img/emojis/shadow.png'),
    iconAnchor:   [0, 80],
    shadowAnchor: [0, 20],
    popupAnchor:  [40, -80],
    iconSize: new L.Point(80, 80),
    shadowSize: new L.Point(80, 40),
    className: "leaflet-div-icon"
};

export const laughIcon = new L.Icon({
    iconUrl: require('../../img/emojis/laugh.png'),
    iconRetinaUrl: require('../../img/emojis/laugh.png'),
    ...base
});

export const loveIcon = new L.Icon({
    iconUrl: require('../../img/emojis/love.png'),
    iconRetinaUrl: require('../../img/emojis/love.png'),
    ...base
});

export const glassesIcon = new L.Icon({
    iconUrl: require('../../img/emojis/glasses.png'),
    iconRetinaUrl: require('../../img/emojis/glasses.png'),
    ...base
});

export const fearIcon = new L.Icon({
    iconUrl: require('../../img/emojis/fear.png'),
    iconRetinaUrl: require('../../img/emojis/fear.png'),
    ...base
});

export const winkIcon = new L.Icon({
    iconUrl: require('../../img/emojis/wink.png'),
    iconRetinaUrl: require('../../img/emojis/wink.png'),
    ...base
});

export const sadIcon = new L.Icon({
    iconUrl: require('../../img/emojis/sad.png'),
    iconRetinaUrl: require('../../img/emojis/sad.png'),
    ...base
});