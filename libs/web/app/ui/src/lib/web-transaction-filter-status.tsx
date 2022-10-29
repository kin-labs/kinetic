import { Button, ButtonGroup } from '@chakra-ui/react'
import { useWebTransaction } from '@kin-kinetic/web/app/data-access'
import { TransactionStatus } from '@kin-kinetic/web/util/sdk'
import { useState } from 'react'
import { MdLightbulbOutline } from 'react-icons/md'
import { WebTransactionFilterPopover } from './web-transaction-filter-popover'
import { webTransactionStatusColor } from './web-transaction-status'

export function TransactionFilterStatus() {
  const { status, setStatus } = useWebTransaction()
  const statuses = Object.values(TransactionStatus)
  const [activeStatus, setActiveStatus] = useState<TransactionStatus[]>(status)

  const toggle = (status: TransactionStatus) => {
    setActiveStatus((active) => {
      return active.includes(status)
        ? // Remove the status
          active.filter((item) => item !== status)
        : // Add the status
          [...active, status]
    })
  }

  const onClear = () => {
    setActiveStatus([])
    setStatus([])
  }

  const onSave = () => setStatus(activeStatus)

  return (
    <WebTransactionFilterPopover
      active={!!activeStatus?.length}
      label="Status"
      icon={<MdLightbulbOutline />}
      onClear={onClear}
      onSave={onSave}
    >
      <ButtonGroup>
        {statuses.map((status) => (
          <Button
            key={status}
            colorScheme={webTransactionStatusColor(status)}
            onClick={() => toggle(status)}
            variant={activeStatus.includes(status) ? 'solid' : 'outline'}
          >
            {status}
          </Button>
        ))}
      </ButtonGroup>
    </WebTransactionFilterPopover>
  )
}
