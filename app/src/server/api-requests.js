

const endpoint = process.env.API_HOST | 'http://localhost:3001';

function getUsers() {
    axios({
        method: 'get',
        url: process.env.API_HOST + '/hello',
      }).then(function (response) {
        console.log(response.data);
    });
}

