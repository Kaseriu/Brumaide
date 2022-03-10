import axios from "axios";
import * as geolib from "geolib"

let to = []
to[0] = [48.7950571, 2.5267579]
to[1] = [48.7845353, 2.4173084]
to[2] = [48.7913221, 2.6471926]

let positions = []

let center = [40.340555, 32.340355]

export async function getDistance(from, radius) {

    try {
        let response = await axios({
            method: 'GET',
            url: "http://10.33.5.57:3001/api/v1/issues/" + from + "/" + radius
        })

        for (let i = 0; i < response.data.length; i++) {
            let result = geolib.getDistance(
                {
                    latitude: response.data[i].user.latitude,
                    longitude: response.data[i].user.longitude
                },
                {
                    latitude: center[0],
                    longitude: center[1]
                },
            )

            result = result / 1000
            let position = {
                lat: response.data[i].user.latitude,
                lng: response.data[i].user.latitude,
                distance: result
            }
            positions.push(position)
        }
    } catch (e) {
        console.error(e)
    }

    positions.sort((a, b) => {
        return a.distance < b.distance ? -1 : a.distance > b.distance ? 1 : 0
    })

    return positions
}
