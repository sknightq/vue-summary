export const loadImages = function(images, callback) {
  let loadedCount = 0
  images.forEach(img => {
    if (img && img.src && img.src !== '') {
      const image = new Image()
      image.src = img.src
      // image.src = getOSSUrl(img.src)
      image.id = img.id
      image.onload = function() {
        loadedCount += 1
        callback({
          loadedCount,
          total: images.length,
          id: this.id,
          img
        })
      }
    }
  })
}

export const toHump = function(name) {
  return name.replace(/_(\w)/g, function(all, letter) {
    return letter.toUpperCase()
  })
}


export const getUrlParams = function() {
  const params = {}
  if (window.location.search.length) {
    const queries = window.location.search.slice(1).split('&')
    queries.forEach(query => {
      const equtorIndex = query.indexOf('=')
      if (equtorIndex > 0 && equtorIndex + 1 <= query.length) {
        params[query.substring(0, equtorIndex)] = query.substring(equtorIndex + 1)
      }
    })
  }
  return params
}

export const isAndroid = function() {
  const ua = navigator.userAgent
  return ua.indexOf('Android') > -1 || ua.indexOf('Linux') > -1
}

export const isIOS = function() {
  const ua = navigator.userAgent
  return !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
}

export const isInWeChat = function() {
  return navigator.userAgent.toLowerCase().indexOf('micromessenger') !== -1
}
export const isInApp = function() {
  // const ua = navigator.userAgent || navigator.vendor || window.opera
  // return ua.indexOf() > -1
  const params = getUrlParams()
  if (params.inapp && params.inapp === '1') {
    return true
  }
  return false
}

function getCipher(idx = 0) {
  const str = '$@#!^&*()<>?:+=_-|{}[]~#@#!*0913'
  const day = new Date().getDate()
  return str.charAt(day + idx)
}
function encrypt(value, secret) {
  const valStr = value + ''
  let newVal = ''
  for (let i = 0; i < valStr.length; i++) {
    newVal += String.fromCharCode(valStr[i].charCodeAt() ^ secret.charCodeAt())
  }
  return newVal
}

export const encodeVal = function(value) {
  let newVal = value
  for (let i = 0; i < 2; i++) {
    const cipher = getCipher(i)
    newVal = encrypt(newVal, cipher)
  }
  return newVal
}

export const phoneRegex = new RegExp(/^1[3456789]\d{9}$/)
