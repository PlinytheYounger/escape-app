function createTravel(travel, trip_id) {
    console.log(travel, trip_id)
    return fetch(`/api/travel/new/${trip_id}`, {
      method: 'POST',
      headers: new Headers({'Content-Type': 'application/json', 
        'Access-Control-Allow-Origin': '*'}),
      body: JSON.stringify(travel),
    })
    .then(res => {
      if (res.ok) return res.json();
      // Probably a duplicate email
      throw new Error('Incorrect Inputs');
    });
  }
  
  function fetchTravel(travel_id) {
    return fetch(`/api/travel/${travel_id}`, {
      method: 'GET',
      headers: new Headers({'Content-Type': 'application/json', 
        'Access-Control-Allow-Origin': '*'}),
    })
    .then(res => {
      if(res.ok) return res.json();
      throw new Error('Could not find activity');
    });
  }
  
  export {
      createTravel,
      fetchTravel
  }