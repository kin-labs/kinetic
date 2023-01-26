import { FormControl, Input } from '@chakra-ui/react'
import { useWebTransaction } from '@kin-kinetic/web/app/data-access'
import { useState } from 'react'
import { MdTag } from 'react-icons/md'
import { WebTransactionFilterPopover } from './web-transaction-filter-popover'

export function TransactionFilterReference() {
  const { reference, setReference } = useWebTransaction()
  const [item, setItem] = useState<string | undefined>(reference)
  const onClear = () => {
    setItem(undefined)
    setReference(undefined)
  }
  const onSave = () => {
    setReference(item)
  }
  return (
    <WebTransactionFilterPopover
      active={!!reference}
      icon={<MdTag />}
      label={'Reference'}
      onClear={onClear}
      onSave={onSave}
    >
      <FormControl>
        <Input onChange={(e) => setItem(e?.target?.value)} value={item ? item : ''} />
      </FormControl>
    </WebTransactionFilterPopover>
  )
}
