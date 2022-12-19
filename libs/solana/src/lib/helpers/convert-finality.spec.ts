import { Commitment } from '../interfaces'
import { convertFinality } from './convert-finality'

describe('convertFinality', () => {
  it('should convert Confirmed', () => {
    const comm = convertFinality(Commitment.Confirmed)

    expect(comm).toEqual('confirmed')
  })

  it('should convert Finalized', () => {
    const comm = convertFinality(Commitment.Finalized)

    expect(comm).toEqual('finalized')
  })

  it('should convert Processed', () => {
    const comm = convertFinality(Commitment.Processed)

    expect(comm).toEqual('confirmed')
  })

  it('should default to Finalized', () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const comm = convertFinality('unknown string')

    expect(comm).toEqual('finalized')
  })
})
