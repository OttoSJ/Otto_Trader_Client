const getToken = () => {
  const userInfo = JSON.parse(localStorage.getItem('user'))
  if (userInfo) {
    const token = userInfo.token
    return token
  }
}

const requestOptions = {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${getToken()}`,
  },
}

module.exports = {
  getToken,
  requestOptions,
}
