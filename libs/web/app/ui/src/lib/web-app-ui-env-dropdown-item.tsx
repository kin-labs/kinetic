import { MenuItem, Stack, Text } from '@chakra-ui/react'
import { WebUiSettingsLink } from '@kin-kinetic/web/ui/link'
import { AppEnv } from '@kin-kinetic/web/util/sdk'
import { Link } from 'react-router-dom'

export interface WebAppUiEnvDropdownItemProps {
  env: AppEnv
  link: string
}

export function WebAppUiEnvDropdownItem({ link, env }: WebAppUiEnvDropdownItemProps) {
  return (
    <MenuItem key={env.id} minWidth={350} alignItems="center" justifyContent="space-between" p={0}>
      <Stack
        as={Link}
        to={`${link}/${env.id}`}
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        px={4}
        py={2}
        w="full"
      >
        <Text>{env.name}</Text>
      </Stack>
      <WebUiSettingsLink to={`${link}/${env.id}/settings`} label={'Environment Settings'} />
    </MenuItem>
  )
}
