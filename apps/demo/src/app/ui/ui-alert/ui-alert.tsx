import { Alert, AlertDescription, AlertTitle, Box } from '@chakra-ui/react'
import React from 'react'

export function UiAlert({
  message,
  status = 'info',
  title,
  cyData,
}: {
  message: string
  status?: 'info' | 'success' | 'warning' | 'error' | undefined
  title?: string
  cyData?: string
}) {
  return (
    <Alert status={status} colorScheme="teal">
      <Box flex="1">
        {title && (
          <AlertTitle>
            <div cy-data={cyData}>{title}</div>
          </AlertTitle>
        )}
        {message && <AlertDescription display="block">{message}</AlertDescription>}
      </Box>
    </Alert>
  )
}
