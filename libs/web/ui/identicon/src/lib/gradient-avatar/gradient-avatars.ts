import { parseSize } from './helper'
import { generateGradient, svgToDataURL } from './image'

export interface GenerateSvgOptions {
  name: string
  text?: string
  width?: string
  height?: string
}

export function generateSvg(options: GenerateSvgOptions) {
  const { name, text, height, width } = {
    height: '512',
    text: '',
    width: '512',
    ...options,
  }
  return generateGradient(name, text, parseSize(width), parseSize(height))
}

export function generateSvgDataUrl(options: GenerateSvgOptions) {
  return svgToDataURL(generateSvg(options))
}
