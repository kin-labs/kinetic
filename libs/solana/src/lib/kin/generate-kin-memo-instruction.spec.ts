import { generateKinMemoInstruction, MEMO_V1_TOKEN_ID } from './generate-kin-memo-instruction'
import { TransactionType } from './transaction-type'

describe('generateMemoInstruction', () => {
  it('should create a Memo Instruction', async () => {
    const memo = generateKinMemoInstruction({
      index: 1,
      reference: 'ref-type|ref-id',
      type: TransactionType.Spend,
    })

    expect(memo.programId.toBase58()).toEqual(MEMO_V1_TOKEN_ID)
    expect(memo).toMatchSnapshot()
  })
})
