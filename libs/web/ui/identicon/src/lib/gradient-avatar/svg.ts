import * as Color from 'color'
import { getMatchingColor } from './helper'

const template = `<?xml version="1.0" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<svg width="$WIDTH" height="$HEIGHT" viewBox="0 0 $WIDTH $HEIGHT" version="1.1" xmlns="http://www.w3.org/2000/svg">
  <g>
    <defs>
      <linearGradient id="avatar" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="$FIRST"/>
        <stop offset="100%" stop-color="$SECOND"/>
      </linearGradient>
    </defs>
    <rect fill="url(#avatar)" x="0" y="0" width="$WIDTH" height="$HEIGHT"/>
    <text x="50%" y="50%" alignment-baseline="central" dominant-baseline="central" text-anchor="middle" fill="#fff" font-family="sans-serif" font-size="$FONTSIZE">$TEXT</text>
  </g>
</svg>
`

export function svg({
  color,
  height,
  text,
  width,
}: {
  color: Color
  height: number
  text: string
  width: number
}): string {
  return template
    .replace('$FIRST', color.hex())
    .replace('$SECOND', getMatchingColor(color).hex())
    .replace(/(\$WIDTH)/g, String(width))
    .replace(/(\$HEIGHT)/g, String(height))
    .replace(/(\$TEXT)/g, text)
    .replace(/(\$FONTSIZE)/g, ((height * 0.9) / text.length).toString())
}
