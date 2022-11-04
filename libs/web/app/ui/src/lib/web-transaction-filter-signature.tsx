import { FormControl, Input } from '@chakra-ui/react'
import { useWebTransaction } from '@kin-kinetic/web/app/data-access'
import { useState } from 'react'
import { MdTag } from 'react-icons/md'
import { WebTransactionFilterPopover } from './web-transaction-filter-popover'

export function TransactionFilterSignature() {
  const { signature, setSignature } = useWebTransaction()
  const [item, setItem] = useState<string | undefined>(signature)
  const onClear = () => {
    setItem(undefined)
    setSignature(undefined)
  }
  const onSave = () => {
    setSignature(item)
  }
  return (
    <WebTransactionFilterPopover
      active={!!signature}
      icon={<MdTag />}
      label={'Signature'}
      onClear={onClear}
      onSave={onSave}
    >
      <FormControl>
        <Input onChange={(e) => setItem(e?.target?.value)} value={item ? item : ''} />
      </FormControl>
    </WebTransactionFilterPopover>
  )
}
