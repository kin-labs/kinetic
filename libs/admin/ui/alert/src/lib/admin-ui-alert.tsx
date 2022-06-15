import { Alert, AlertDescription, AlertTitle, Box } from '@chakra-ui/react'
import React from 'react'

export interface AdminUiAlertProps {
  message: string
  status?: 'info' | 'success' | 'warning' | 'error' | undefined
  title?: string
}

export function AdminUiAlert({ message, status = 'info', title }: AdminUiAlertProps) {
  return (
    <Alert status={status} colorScheme="teal">
      <Box flex="1">
        {title && (
          <AlertTitle>
            <div>{title}</div>
          </AlertTitle>
        )}
        {message && <AlertDescription display="block">{message}</AlertDescription>}
      </Box>
    </Alert>
  )
}
