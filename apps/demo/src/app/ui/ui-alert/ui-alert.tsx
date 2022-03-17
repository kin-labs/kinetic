import React from 'react'
import { Alert } from 'react-daisyui'

export function UiAlert({
  message,
  status = 'info',
  title,
}: {
  message: string
  status?: 'info' | 'success' | 'warning' | 'error' | undefined
  title?: string
}) {
  return (
    <Alert status={status}>
      {title ? <div className="font-bold text-lg">{title}</div> : null}
      <div>{message}</div>
    </Alert>
  )
}
