import { generateSvg } from './gradient-avatars'

describe('gradientAvatars', () => {
  it('should generate an SVG', () => {
    expect(
      generateSvg({
        name: 'random-seed',
        text: 'text',
        width: '512',
        height: '512',
      }),
    ).toMatchSnapshot()
  })
})
