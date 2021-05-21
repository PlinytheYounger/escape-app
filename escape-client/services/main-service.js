const BASE_URL = 'https://escape-travel-app.herokuapp.com/';
// const TEST_URL = 'http://localhost:3001/';

function fetchMain() {
    return fetch(`${BASE_URL}`, {
    method: 'GET',
    headers: new Headers({'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'https://escape-app-server.herokuapp.com/',}),
    mode: 'no-cors',
    })
    .then(res => {
      if(res.ok) return res.json();
      else {
        throw new Error('No luck');
      }
    });
}

export {
    fetchMain
}