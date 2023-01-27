export function ellipsify(str = '', len = 4, ellipsis = '....') {
  if (str.length > 30) {
    return str.substring(0, len) + ellipsis + str.substring(str.length - len, str.length)
  }
  return str
}
