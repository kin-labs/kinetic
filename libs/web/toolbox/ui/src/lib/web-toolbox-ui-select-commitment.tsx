import { Commitment } from '@kin-kinetic/solana'
import { Select } from '@saas-ui/react'

export function WebToolboxUiSelectCommitment({
  commitment,
  setCommitment,
}: {
  commitment: Commitment
  setCommitment: (commitment: Commitment) => void
}) {
  return (
    <Select
      size="lg"
      defaultValue={commitment}
      onChange={(commitment) => setCommitment(commitment as Commitment)}
      placeholder="Select commitment"
      options={Object.keys(Commitment).map((value) => ({
        label: value,
        value,
      }))}
    />
  )
}
