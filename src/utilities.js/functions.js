export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export function upperCase(word) {
  let upper = word.charAt(0).toUpperCase() + word.slice(1)
  return upper
}

export function URL() {
  const environment = false
  if (environment) return 'local'
  else return 'not local'
}

// console.log(URL())
