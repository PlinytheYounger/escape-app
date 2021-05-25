
function createWallet(wallet, trip_id, user_id) {
  return fetch(`/api/wallet/${trip_id}/new/${user_id}`, {
    method: 'POST',
    headers: new Headers({'Content-Type': 'application/json', 
      'Access-Control-Allow-Origin': '*'}),
    body: JSON.stringify(wallet)
  })
  .then(res => {
    if (res.ok) return res.json();
    // Probably a duplicate email
    throw new Error('Incorrect Inputs');
  });
}

function createExpense(expense, wallet_id) {
  return fetch(`/api/wallet/new/${wallet_id}`, {
    method: 'POST',
    headers: new Headers({'Content-Type': 'application/json', 
      'Access-Control-Allow-Origin': '*'}),
    body: JSON.stringify(expense)
  })
  .then(res => {
    if (res.ok) return res.json();
    // Probably a duplicate email
    throw new Error('Incorrect Inputs');
  });
}

function fetchWallet(user_id, trip_id) {
  return fetch(`/api/wallet/${trip_id}/${user_id}`, {
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
    createExpense,
    fetchWallet,
    createWallet
}