import Color from 'color'

export function djb2(str: string) {
  let hash = 5381
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) + hash + str.charCodeAt(i)
  }
  return hash
}

function shouldChangeColor(color: Color) {
  const rgb = color.rgb().array()
  const val = 765 - (rgb[0] + rgb[1] + rgb[2])

  return val < 250 || val > 700
}

export function hashStringToColor(str: string): string {
  const hash = djb2(str)
  const r = (hash & 0xff0000) >> 16
  const g = (hash & 0x00ff00) >> 8
  const b = hash & 0x0000ff
  return '#' + ('0' + r.toString(16)).substr(-2) + ('0' + g.toString(16)).substr(-2) + ('0' + b.toString(16)).substr(-2)
}

export function getMatchingColor(firstColor: Color) {
  let color = firstColor
  if (color.isDark()) {
    color = color.saturate(0.3).rotate(90)
  } else {
    color = color.desaturate(0.3).rotate(90)
  }
  if (shouldChangeColor(color)) {
    color = color.rotate(-200).saturate(0.5)
  }
  return color
}

export function getColor(hash: string): Color {
  let color = new Color(hashStringToColor(hash)).saturate(0.5)

  const lightning = color.hsl().array()[2]
  if (lightning < 25) {
    color = color.lighten(3)
  }
  if (lightning > 25 && lightning < 40) {
    color = color.lighten(0.8)
  }
  if (lightning > 75) {
    color = color.darken(0.4)
  }
  return color
}

export function parseSize(size: string) {
  const maxSize = 1000
  if (size && size.match(/^-?\d+$/) && Number(size) <= maxSize) {
    return parseInt(size, 10)
  }
  return 120
}
