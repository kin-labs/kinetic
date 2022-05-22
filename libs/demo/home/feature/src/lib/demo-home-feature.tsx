import { Button, Stack } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'

export function DemoHomeFeature() {
  const pages = [
    { label: 'Keypair', path: '/demo/keypair' },
    { label: 'SDK', path: '/demo/sdk' },
  ]
  return (
    <Stack direction="row" spacing={6}>
      {pages?.map(({ label, path }) => (
        <Link key={path} to={path}>
          <Button>{label}</Button>
        </Link>
      ))}
    </Stack>
  )
}
