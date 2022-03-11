export default async function getIssuesSorted(from, radius) {
    let response;
    try {
        let userLogin = await fetch("http://10.33.5.57:3001/api/v1/login", {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({email: "jp@esgi.com", password: "azerty"})

        }).then(response => response.json());
        console.log(userLogin);
        let me = await fetch("http://10.33.5.57:3001/api/v1/me", {
            method: 'GET',
            headers: {"Content-Type": "application/json", "Authorization": "Bearer " + userLogin.token}
        }).then(response => response.json())

        response = await fetch("http://10.33.5.57:3001/api/v1/issues/" + me.id + "/" + radius, {
            method: 'GET',
            headers: {"Content-Type": "application/json"}
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
