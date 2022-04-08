import { Button, Stack } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'

export function HomeIndex() {
  const pages = [
    { label: 'Keypair', path: '/keypair' },
    { label: 'SDK', path: '/sdk' },
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
