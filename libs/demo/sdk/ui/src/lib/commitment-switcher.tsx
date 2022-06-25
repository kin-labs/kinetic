import { Select } from '@chakra-ui/react'
import { Commitment } from '@kin-kinetic/solana'
import React from 'react'

export function CommitmentSwitcher({
  commitment,
  selectCommitment,
}: {
  commitment: Commitment
  selectCommitment: (mint: Commitment) => void
}) {
  const commitments = Object.values(Commitment)
  return (
    <Select
      onChange={(v) => selectCommitment(v.target?.value as Commitment)}
      placeholder="Select commitment"
      value={commitment}
      width="fit-content"
    >
      {commitments.map((commitment) => (
        <option key={commitment} value={commitment}>
          {commitment}
        </option>
      ))}
    </Select>
  )
}
