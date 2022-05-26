export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export function upperCase(word) {
  let upper = word.charAt(0).toUpperCase() + word.slice(1)
  return upper
}

export const URL = 'https://otto-trader-api.herokuapp.com'

// export const URL = 'http://localhost:8030'
