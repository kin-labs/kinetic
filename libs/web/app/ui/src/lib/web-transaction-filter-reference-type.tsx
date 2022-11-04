import { FormControl, Input } from '@chakra-ui/react'
import { useWebTransaction } from '@kin-kinetic/web/app/data-access'
import { useState } from 'react'
import { MdTag } from 'react-icons/md'
import { WebTransactionFilterPopover } from './web-transaction-filter-popover'

export function TransactionFilterReferenceType() {
  const { referenceType, setReferenceType } = useWebTransaction()
  const [item, setItem] = useState<string | undefined>(referenceType)
  const onClear = () => {
    setItem(undefined)
    setReferenceType(undefined)
  }
  const onSave = () => {
    setReferenceType(item)
  }
  return (
    <WebTransactionFilterPopover
      active={!!referenceType}
      icon={<MdTag />}
      label={'ReferenceType'}
      onClear={onClear}
      onSave={onSave}
    >
      <FormControl>
        <Input onChange={(e) => setItem(e?.target?.value)} value={item ? item : ''} />
      </FormControl>
    </WebTransactionFilterPopover>
  )
}
