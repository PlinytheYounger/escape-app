function createActivity(activity, trip_id) {
    return fetch(`${BASE_URL}new/${trip_id}`, {
      method: 'POST',
      headers: new Headers({'Content-Type': 'application/json', 
        'Access-Control-Allow-Origin': '*'}),
      body: JSON.stringify(activity)
    })
    .then(res => {
      if (res.ok) return res.json();
      // Probably a duplicate email
      throw new Error('Incorrect Inputs');
    });
  }
  
  function fetchActivity(activity_id) {
    return fetch(`${BASE_URL}${activity_id}`, {
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
      createActivity,
      fetchActivity
  }