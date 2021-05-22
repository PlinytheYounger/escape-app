

function fetchMain() {
    return fetch(`/`, {
    method: 'GET',
    })
    .then(res => {
      if(res.ok) return res.json();
      else {
        throw new Error('No luck');
      }
    })
}

export {
    fetchMain
}