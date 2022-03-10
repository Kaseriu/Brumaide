// const axios = require("axios")
// import * from 'axios.js'

// const geolib = require("geolib");

async function initMap() {
    let list = [
        [{lat: 48.7950571, lng: 2.5267579}],
        [{lat: 48.7845353, lng: 2.4173084}],
        [{lat: 48.7913221, lng: 2.6471926}]]

    const center = {lat: 48.8630211, lng: 2.3579253};

    let issuesSorted = await getIssuesSorted(center, 1000)

    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 11,
        center: center
    });

    new google.maps.Marker({
        position: center,
        map: map
    });

    for (let i = 0; i < list.length; i++) {
        let marker = new google.maps.Marker({
            position: {lat : issuesSorted[i].user.latitude, lng : issuesSorted[i].user.longitude},
            label: (i + 1).toString(),
            title: "Titre : " + (i + 1),
            map: map
        });

        const infoWindow = new google.maps.InfoWindow();

        marker.addListener("click", () => {
            infoWindow.close()
            infoWindow.setContent(marker.getTitle());
            infoWindow.open(marker.getMap(), marker);
        })
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

async function getIssuesSorted(from, radius) {

    try {
        let me = await fetch("http://10.33.5.57:3001/api/v1/me", {
            method: 'GET',
            headers: {"Content-Type": "application/json"},
        }).then(response => response.json())

        let response = await fetch("http://10.33.5.57:3001/api/v1/issues/" + me.id + "/" + radius, {
            method: 'GET',
            headers: {"Content-Type": "application/json"},
        }).then(response => response.json())

        console.log(response)

    } catch
        (e) {
        console.error(e)
    }

    return response.sort((a, b) => {
        return a.distance < b.distance ? -1 : a.distance > b.distance ? 1 : 0
    })
}




