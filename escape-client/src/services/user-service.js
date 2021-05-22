import {setToken, getUserFromToken, removeToken} from './token-service';


function signup(user) {
  console.log(user)
  return fetch(`/api/user/signup`, {
    method: 'POST',
    headers: new Headers({'Content-Type': 'application/json', 
      'Access-Control-Allow-Origin': '*',
    }),
    body: JSON.stringify(user)
  })
  .then(res => {
    if (res.ok) return res.json();
    // Probably a duplicate email
    throw new Error('Whoopsies!');
  })
  .then(({token}) => {setToken(token)});
}

function getUser() {
  return getUserFromToken();
}

function login(creds) {
  return fetch(`/api/user/login`, {
    method: 'POST',
    headers: new Headers({'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'}),
    mode: 'no-cors',
    body: JSON.stringify(creds)
  })
  .then(res => {
    // Valid login if we have a status of 2xx (res.ok)
    if (res.ok) return res.json();
    throw new Error('Bad Credentials!');
  })
  .then(({token}) => setToken(token));
}

function logout() {
  removeToken();
}

function fetchUserProfile(user_id) {
  return fetch(`/api/user/${user_id}`, {
    method: 'GET',
    headers: new Headers({'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'}),
    mode: 'no-cors',
  })
  .then(res => {
    if(res.ok) return res.json();
    throw new Error('Could not find user - please check credentials');
  });
}

export {
  signup,
  getUser,
  getUserFromToken,
  login,
  logout,
  fetchUserProfile,
};