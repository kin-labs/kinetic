import { MEMO_V1_TOKEN_ID } from './generate-kin-memo-instruction'
import { generateMemoInstruction } from './generate-memo.instruction'

describe('generateMemoInstruction', () => {
  it('should create a Memo Instruction', async () => {
    const memo = generateMemoInstruction('test')

    expect(memo.programId.toBase58()).toEqual(MEMO_V1_TOKEN_ID)
    expect(memo.keys).toEqual([])
    expect(memo).toMatchSnapshot()
  })
})
