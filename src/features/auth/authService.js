import axios from 'axios'
import { URL } from '../../utilities.js/functions'

const API_URL = `${URL}/api/users/`

const register = async (userData) => {
  const response = await axios.post(API_URL, userData)

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }

  return response.data
}

const login = async (userData) => {
  const response = await axios.post(API_URL + 'login', userData)
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }
  return response.data
}

const logout = () => {
  localStorage.removeItem('user')
  localStorage.removeItem('cardetails')
}

const authService = {
  register,
  login,
  logout,
  // getAllUsers,
}

export default authService
