import { Commitment } from '../interfaces/commitment.enum'
import { convertCommitment } from './convert-commitment'

describe('convertCommitment', () => {
  it('should convert Confirmed', () => {
    const comm = convertCommitment(Commitment.Confirmed)

    expect(comm).toEqual('confirmed')
  })

  it('should convert Finalized', () => {
    const comm = convertCommitment(Commitment.Finalized)

    expect(comm).toEqual('finalized')
  })

  it('should convert Processed', () => {
    const comm = convertCommitment(Commitment.Processed)

    expect(comm).toEqual('processed')
  })

  it('should default to Finalized', () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const comm = convertCommitment('unknown string')

    expect(comm).toEqual('finalized')
  })
})
