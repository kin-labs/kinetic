import { Flex, Text } from '@chakra-ui/react'
import { useMemo } from 'react'

function formatCurrency(amount: number) {
  const currencyFractionDigits = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'KIN',
  }).resolvedOptions().maximumFractionDigits

  return amount.toLocaleString('en-US', {
    maximumFractionDigits: currencyFractionDigits,
  })
}

export function WebToolboxUiBalanceAmount({ amount, symbol }: { amount: string; symbol: string }) {
  const amountFormatted = useMemo(() => formatCurrency(Number(amount)), [amount])

  return (
    <Flex>
      <Text>{amountFormatted}</Text>
      <Text ml={2}>{symbol}</Text>
    </Flex>
  )
}
