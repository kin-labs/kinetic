import { Button, Stack, Stat, StatGroup, StatLabel, StatNumber } from '@chakra-ui/react'
import { JobStatus, QueueCount } from '@kin-kinetic/web/util/sdk'
import { ButtonGroup } from '@saas-ui/react'
import { MdDelete } from 'react-icons/md'

export function QueueCountStats({
  count,
  clearQueue,
}: {
  count: QueueCount
  clearQueue?: (status: JobStatus) => void
}) {
  const clear = (status: JobStatus) => {
    clearQueue?.(status)
  }
  return (
    <Stack>
      <StatGroup>
        <Stat>
          <StatLabel>Active</StatLabel>
          <StatNumberClear amount={count.active ?? 0} clear={() => clear(JobStatus.Active)} />
        </Stat>
        <Stat>
          <StatLabel>Waiting</StatLabel>
          <StatNumberClear amount={count.waiting ?? 0} clear={() => clear(JobStatus.Waiting)} />
        </Stat>
        <Stat>
          <StatLabel>Completed</StatLabel>
          <StatNumberClear amount={count.completed ?? 0} clear={() => clear(JobStatus.Completed)} />
        </Stat>
      </StatGroup>
      <StatGroup>
        <Stat>
          <StatLabel>Paused</StatLabel>
          <StatNumberClear amount={count.paused ?? 0} clear={() => clear(JobStatus.Paused)} />
        </Stat>
        <Stat>
          <StatLabel>Failed</StatLabel>
          <StatNumberClear amount={count.failed ?? 0} clear={() => clear(JobStatus.Failed)} />
        </Stat>
        <Stat>
          <StatLabel>Delayed</StatLabel>
          <StatNumberClear amount={count.delayed ?? 0} clear={() => clear(JobStatus.Delayed)} />
        </Stat>
      </StatGroup>
    </Stack>
  )
}

export function StatNumberClear({ amount, clear }: { amount: number; clear: () => void }) {
  return (
    <ButtonGroup alignItems="center">
      <StatNumber>{amount}</StatNumber>
      {amount > 0 ? (
        <Button size="xs" onClick={clear} leftIcon={<MdDelete />}>
          Clear
        </Button>
      ) : null}
    </ButtonGroup>
  )
}
