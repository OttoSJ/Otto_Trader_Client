import axios from 'axios'

const API_URL = 'https://otto-trader-api.herokuapp.com/api/inventory/'

const createCar = async (carData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.post(API_URL, carData, config)

 
  const API_URL_UPDATE_USER = `https://otto-trader-api.herokuapp.com/api/users/update-user-inventory/${response.data.user}`

  const carId = { vehicleinventory: response.data._id }

  await axios.put(API_URL_UPDATE_USER, carId, config)

  return response.data
}

const updateCarDetails = async (carData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.put(API_URL + carData._id, carData, config)
  return response.data
}

const getCars = async () => {
  const response = await axios.get(API_URL)
  return response.data
}

const deleteCar = async (carId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.delete(API_URL + carId, config)
  return response.data
}

const carService = {
  createCar,
  getCars,
  deleteCar,
  updateCarDetails,
}

export default carService
