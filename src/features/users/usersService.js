import axios from 'axios'
import { URL } from '../../utilities.js/functions'

const HTTP = URL
const API_URL = `${HTTP}/api/users/`

const getAllUsers = async () => {
  const response = await axios.get(API_URL)

  return response.data
}

const allUsersService = {
  getAllUsers,
}
export default allUsersService
