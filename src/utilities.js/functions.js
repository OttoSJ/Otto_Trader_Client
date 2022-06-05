export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export function upperCase(word) {
  let upper = word.charAt(0).toUpperCase() + word.slice(1)
  return upper
}

// PRODUCTION VS DEPLOYMENT VARIABLES

// export const URL = 'https://otto-trader-api.herokuapp.com'

export const URL = 'http://localhost:8030'
export const HTTP = URL

// API FUNCTIONS ///////////////////////////////

// GET USER INVENTORY FUNCTIONS
export function getUserInventory(HTTP, userId) {
  const API = `${HTTP}/api/users/inventory/${userId}`
  return API
}
export function reqOptionsTokenOnly(token) {
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }
  return requestOptions
}

// ADD TO USER FAVORITES ARRAY
export function addToFavorites(HTTP, userId) {
  const API = `${HTTP}/api/users/update-user-inventory/${userId}`
  return API
}
export function reqOptionsAddFav(token, carId) {
  const requestOptions = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ favorites: carId }),
  }
  return requestOptions
}

// DELETE FROM USER FAVORITES ARRAY
export function removeFromFav(HTTP, userId) {
  const API = `${HTTP}/api/users/remove-car-from-inventory/${userId}`
  return API
}
export function reqOptionsDeleteFav(token, carId, userId) {
  const requestOptions = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ likedCarId: carId, userId: userId }),
  }
  return requestOptions
}

// GET CAR DETAILS
export function getCarDetails(HTTP, paramsId) {
  const API = `${HTTP}/api/inventory/cardetails/${paramsId}`
  return API
}
