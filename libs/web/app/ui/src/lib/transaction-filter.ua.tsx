import { FormControl, Input } from '@chakra-ui/react'
import { useWebTransaction } from '@kin-kinetic/web/app/data-access'
import { useState } from 'react'
import { IoMdGlobe } from 'react-icons/io'
import { WebTransactionFilterPopover } from './web-transaction-filter-popover'

export function TransactionFilterUa() {
  const { ua, setUa } = useWebTransaction()
  const [item, setItem] = useState<string | undefined>(ua)
  const onClear = () => {
    setItem(undefined)
    setUa(undefined)
  }
  const onSave = () => {
    setUa(item)
  }
  return (
    <WebTransactionFilterPopover active={!!ua} icon={<IoMdGlobe />} label={'UA'} onClear={onClear} onSave={onSave}>
      <FormControl>
        <Input onChange={(e) => setItem(e?.target?.value)} value={item ? item : ''} />
      </FormControl>
    </WebTransactionFilterPopover>
  )
}
