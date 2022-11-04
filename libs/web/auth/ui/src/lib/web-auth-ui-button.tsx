import { Text } from '@chakra-ui/react'
import { Button } from '@saas-ui/react'
import { ReactNode } from 'react'

export function WebAuthUiButton({ name, link, icon }: { name: string; link: string; icon: ReactNode }) {
  return (
    <Button size={'lg'} as={'a'} href={link}>
      {icon}
      <Text ml={2}>Sign in with {name}</Text>
    </Button>
  )
}
