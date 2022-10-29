import { Md5 } from 'ts-md5'
import { getColor } from './helper'
import { svg } from './svg'

export function generateGradient(username: string, text: string, width: number, height: number) {
  const hash = Md5.hashStr(username)

  const color = getColor(hash)

  return svg({
    color,
    text,
    width,
    height,
  })
}

export function svgToDataURL(svgStr: string) {
  const encoded = encodeURIComponent(svgStr).replace(/'/g, '%27').replace(/"/g, '%22')

  const header = 'data:image/svg+xml,'

  return header + encoded
}
