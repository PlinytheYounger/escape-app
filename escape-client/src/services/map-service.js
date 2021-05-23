function getMap(trip_id) {

    return fetch(`/api/map/${trip_id}`, {
      method: 'GET',
      headers: new Headers({'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'}),
    })
    .then(res => {
      if(res.ok) return res.json();
      throw new Error('Could not load map');
    });
  }
  
  export {
      getMap
  }