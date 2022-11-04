import { FormControl, Input } from '@chakra-ui/react'
import { useWebTransaction } from '@kin-kinetic/web/app/data-access'
import { useState } from 'react'
import { MdNetworkCheck } from 'react-icons/md'
import { WebTransactionFilterPopover } from './web-transaction-filter-popover'

export function TransactionFilterIp() {
  const { ip, setIp } = useWebTransaction()
  const [item, setItem] = useState<string | undefined>(ip)
  const onClear = () => {
    setItem(undefined)
    setIp(undefined)
  }
  const onSave = () => {
    setIp(item)
  }
  return (
    <WebTransactionFilterPopover active={!!ip} icon={<MdNetworkCheck />} label={'IP'} onClear={onClear} onSave={onSave}>
      <FormControl>
        <Input onChange={(e) => setItem(e?.target?.value)} value={item ? item : ''} />
      </FormControl>
    </WebTransactionFilterPopover>
  )
}
