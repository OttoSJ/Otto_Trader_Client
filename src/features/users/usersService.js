import axios from 'axios'

const API_URL = 'https://otto-trader-api.herokuapp.com/api/users/'

const getAllUsers = async () => {
  const response = await axios.get(API_URL)

  return response.data
}

const allUsersService = {
  getAllUsers,
}
export default allUsersService
