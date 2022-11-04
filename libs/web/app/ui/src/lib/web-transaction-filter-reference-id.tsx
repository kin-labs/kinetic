import { FormControl, Input } from '@chakra-ui/react'
import { useWebTransaction } from '@kin-kinetic/web/app/data-access'
import { useState } from 'react'
import { MdTag } from 'react-icons/md'
import { WebTransactionFilterPopover } from './web-transaction-filter-popover'

export function TransactionFilterReferenceId() {
  const { referenceId, setReferenceId } = useWebTransaction()
  const [item, setItem] = useState<string | undefined>(referenceId)
  const onClear = () => {
    setItem(undefined)
    setReferenceId(undefined)
  }
  const onSave = () => {
    setReferenceId(item)
  }
  return (
    <WebTransactionFilterPopover
      active={!!referenceId}
      icon={<MdTag />}
      label={'ReferenceId'}
      onClear={onClear}
      onSave={onSave}
    >
      <FormControl>
        <Input onChange={(e) => setItem(e?.target?.value)} value={item ? item : ''} />
      </FormControl>
    </WebTransactionFilterPopover>
  )
}
