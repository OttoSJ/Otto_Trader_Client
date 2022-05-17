import axios from 'axios'

const API_URL = 'https://otto-trader-api.herokuapp.com/api/inventory/cardetails/'

const getOneCarById = async (carId) => {
  const response = await axios.get(API_URL + carId)

  return response.data
}

const carDetailsService = {
  getOneCarById,
}

export default carDetailsService
