
function createTrip(trip, user_id) {
  return fetch(`api/trip/new/${user_id}`, {
    method: 'POST',
    headers: new Headers({'Content-Type': 'application/json', 
      'Access-Control-Allow-Origin': '*'}),
    body: JSON.stringify(trip)
  })
  .then(res => {
    if (res.ok) return res.json();
    // Probably a duplicate email
    throw new Error('Incorrect Inputs');
  });
}

function fetchTripProfile(trip_id) {
  return fetch(`api/trip/${trip_id}`, {
    method: 'GET',
    headers: new Headers({'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'}),
  })
  .then(res => {
    if(res.ok) return res.json();
    throw new Error('Could not find trip');
  });
}

function deleteTrip(trip_id) {
  return fetch(`api/trip/delete/${trip_id}`, {
    method: 'DELETE',
    headers: new Headers({'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'}),
  })
  .then(res => {
    if(res.ok) return res.json();
    throw new Error('Could not find trip');
  });
}

export {
    createTrip,
    fetchTripProfile,
    deleteTrip
}