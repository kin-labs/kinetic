import { MoonIcon, SunIcon } from '@chakra-ui/icons'
import { Button, useColorMode } from '@chakra-ui/react'

export function WebUiLayoutThemeToggle() {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <Button onClick={toggleColorMode} variant="ghost">
      {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
    </Button>
  )
}
