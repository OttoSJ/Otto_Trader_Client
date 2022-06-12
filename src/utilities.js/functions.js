export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export function upperCase(word) {
  let upper = word.charAt(0).toUpperCase() + word.slice(1)
  return upper
}

// PRODUCTION VS DEPLOYMENT VARIABLES

export const URL = 'https://otto-trader-api.herokuapp.com'

// export const URL = 'http://localhost:8030'
export const HTTP = URL

// API FUNCTIONS ///////////////////////////////

// TOKEN AND METHOD ONLY REQUEST OPTIONS FUNCTIONS (GENERAL USE)

export function reqOptionsTokenOnly(token, method) {
  const requestOptions = {
    method: `${method}`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }
  return requestOptions
}

// GET USER INVENTORY
export function getUserInventory(HTTP, userId) {
  const API = `${HTTP}/api/users/inventory/${userId}`
  return API
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

// DELETE VEHICLE FROM INVENTORY
export function delVehicleFromInven(HTTP, paramsId) {
  const API = `${HTTP}/api/users/remove-car-from-inventory/${paramsId}`
  return API
}
export function reqOptionsDelFrmInven(token, userId, carId) {
  const requestOptions = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ userId: userId, carId: carId }),
  }
  return requestOptions
}

// UPDATE USERS INFO
export function updateUserInfo(HTTP, paramsUserId) {
  const API = `${HTTP}/api/users/update-user-info/${paramsUserId}`
  return API
}
export function reqOptionsUpdateUser(token, formData) {
  const requestOptions = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(formData),
  }
  return requestOptions
}

// GET USER INFO
export function getUsersInfo(paramsUserId) {
  const API = `${HTTP}/api/users/user-info/${paramsUserId}`
  return API
}

// DELETE USER
export function deleteUser(paramsUserId) {
  const API = `${HTTP}/api/users/delete-user/${paramsUserId}`
  return API
}

// DELETE USERS INVENTORY
export function deleteUserInventory(paramsUserId) {
  const API = `${HTTP}/api/users/delete-users-inventory/${paramsUserId}`
  return API
}
