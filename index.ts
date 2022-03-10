import * as geolib from "geolib"

let to: number[][] = []
to[0] = [48.7950571, 2.5267579]
to[1] = [48.7845353, 2.4173084]
to[2] = [48.7913221, 2.6471926]

let center = [48.8606747, 2.3532716]
function getDistance(from: number[], to: number[][]) {
    let result: number

    for (let i = 0; i < to.length; i++) {
        result = geolib.getDistance(
            {
                latitude: from[0],
                longitude: from[1]
            },
            {
                latitude: to[i][0],
                longitude: to[i][1]
            },
        )
        console.log(result / 1000)
    }
}
getDistance(center, to)
