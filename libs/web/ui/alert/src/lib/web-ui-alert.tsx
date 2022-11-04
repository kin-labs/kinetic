import { AlertStatus } from '@chakra-ui/alert'
import { Alert } from '@chakra-ui/react'
import { PropsWithChildren } from 'react'

export interface WebUiAlertProps {
  message?: string
  status?: AlertStatus
}

export function WebUiAlert({ children, message, status }: PropsWithChildren<WebUiAlertProps>) {
  return (
    <Alert status={status} variant="solid">
      {message || children}
    </Alert>
  )
}
