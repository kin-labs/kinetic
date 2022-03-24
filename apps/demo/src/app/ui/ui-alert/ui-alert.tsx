import React from 'react'
import { Alert } from 'react-daisyui'

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
    <Alert status={status}>
      {title ? (
        <div cy-data={cyData} className="font-bold text-lg">
          {title}
        </div>
      ) : null}
      <div>{message}</div>
    </Alert>
  )
}
