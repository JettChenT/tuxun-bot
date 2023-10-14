const ZOOM = 2;
var initialCords = [40, -80]

console.log("initial cords", initialCords);

var map = L.map('map', {
    center: initialCords,
    zoom: ZOOM
});
L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

var marker = L.marker(initialCords).addTo(map);

function setCoords(coords){
    marker.setLatLng(coords);
    map.setView(coords, ZOOM);
}

chrome.storage.session.get(["coords"], function(result) {
    if(result){
        setCoords(result.coords);
    }
});

chrome.runtime.onMessage.addListener((msg, sender, res) => {
    console.log("received msg", msg);
    setCoords(msg.coords);
})