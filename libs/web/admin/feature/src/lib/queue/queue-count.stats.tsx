import { Stack, Stat, StatGroup, StatLabel, StatNumber } from '@chakra-ui/react'
import { QueueCount } from '@kin-kinetic/web/util/sdk'

export function QueueCountStats({ count }: { count: QueueCount }) {
  return (
    <Stack>
      <StatGroup>
        <Stat>
          <StatLabel>Active</StatLabel>
          <StatNumber>{count.active}</StatNumber>
        </Stat>
        <Stat>
          <StatLabel>Waiting</StatLabel>
          <StatNumber>{count.waiting}</StatNumber>
        </Stat>
        <Stat>
          <StatLabel>Completed</StatLabel>
          <StatNumber>{count.completed}</StatNumber>
        </Stat>
      </StatGroup>
      <StatGroup>
        <Stat>
          <StatLabel>Paused</StatLabel>
          <StatNumber>{count.paused}</StatNumber>
        </Stat>
        <Stat>
          <StatLabel>Failed</StatLabel>
          <StatNumber>{count.failed}</StatNumber>
        </Stat>
        <Stat>
          <StatLabel>Delayed</StatLabel>
          <StatNumber>{count.delayed}</StatNumber>
        </Stat>
      </StatGroup>
    </Stack>
  )
}
