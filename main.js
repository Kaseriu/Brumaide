import * as api from "./apiCall"

function initMap() {
    let list = [
        [{lat: 48.7950571, lng: 2.5267579}],
        [{lat: 48.7845353, lng: 2.4173084}],
        [{lat: 48.7913221, lng: 2.6471926}]]

    const center = {lat: 48.8630211, lng: 2.3579253};

    let t = api.getDistance(center, 1000)

    console.log(t)

    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 11,
        center: center
    });

    new google.maps.Marker({
        position: center,
        map: map
    });

    for (let i = 0; i < list.length; i++) {
        new google.maps.Marker({
            position: list[i][0],
            label: (i + 1).toString(),
            map: map
        });
    }

    new google.maps.Circle({
        strokeColor: "#0090ff",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#0090ff",
        fillOpacity: 0.35,
        map,
        center: center,
        radius: 10000,
    });
}




