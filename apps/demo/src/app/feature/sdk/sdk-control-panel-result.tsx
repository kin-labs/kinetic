import React from 'react'

export function SdkControlPanelResult({ data }: { data: unknown }) {
  return data ? (
    <pre className="text-xs bg-base-300 p-4 rounded-md">
      {typeof data === 'string' ? data : JSON.stringify(data, null, 2)}
    </pre>
  ) : null
}
