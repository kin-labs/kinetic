import { Progress } from '@chakra-ui/react'
import { KineticSdk } from '@kin-kinetic/sdk'
import { useEffect, useState } from 'react'

export function WebToolboxUiTransactionProgress({
  finished,
  sdk,
  signature,
}: {
  finished?: () => void
  sdk: KineticSdk
  signature: string
}) {
  const [confirmations, setConfirmations] = useState<number>(0)
  const [percentage, setPercentage] = useState<number>(0)

  const updateConfirmations = () => {
    sdk.getTransaction({ signature }).then((res) => {
      const status = res.status.value
      const confirmationStatus = status?.confirmationStatus
      const confirmations = status?.confirmations ?? 0

      if (confirmationStatus === 'finalized') {
        setConfirmations(32)
        setPercentage(100)
        finished && finished()
      } else {
        setConfirmations(confirmations)
        setPercentage(Math.round((confirmations * 100) / 32))
      }
    })
  }

  useEffect(() => {
    if (!sdk || !signature) return

    const timer = setInterval(() => {
      updateConfirmations()
      if (confirmations && confirmations >= 32) {
        console.log('Confirmations are >= 32!')
        clearInterval(timer)
      }
    }, 1000)

    return () => {
      clearInterval(timer)
    }
  }, [confirmations, sdk, signature])

  return signature ? (
    <Progress colorScheme={percentage === 100 ? 'green' : 'primary'} value={percentage} isAnimated size="xs">
      {percentage} %
    </Progress>
  ) : null
}
