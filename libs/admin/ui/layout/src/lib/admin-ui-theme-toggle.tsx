import { MoonIcon, SunIcon } from '@chakra-ui/icons'
import { Button, useColorMode } from '@chakra-ui/react'
import React from 'react'

export function AdminUiThemeToggle() {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <Button variant="ghost" onClick={toggleColorMode}>
      {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
    </Button>
  )
}
