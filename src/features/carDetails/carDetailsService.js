import axios from 'axios'
import { URL } from '../../utilities.js/functions'

const HTTP = URL
const API_URL = `${HTTP}/api/inventory/cardetails/`

const getOneCarById = async (carId) => {
  const response = await axios.get(API_URL + carId)

  return response.data
}

const carDetailsService = {
  getOneCarById,
}

export default carDetailsService
