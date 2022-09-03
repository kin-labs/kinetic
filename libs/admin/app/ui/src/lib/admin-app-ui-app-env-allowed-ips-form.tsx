import { Box, Button, ButtonGroup, Input, Stack } from '@chakra-ui/react'
import { AdminUiAlert } from '@kin-kinetic/admin/ui/alert'
import {
  AppEnv,
  useUserAppEnvAddAllowedIpMutation,
  useUserAppEnvRemoveAllowedIpMutation,
} from '@kin-kinetic/shared/util/admin-sdk'
import React, { ChangeEvent, useState } from 'react'

export interface AdminAppUiAppEnvAllowedIpsFormProps {
  appEnv: AppEnv
}

export function AdminAppUiAppEnvAllowedIpsForm({ appEnv }: AdminAppUiAppEnvAllowedIpsFormProps) {
  const [, addAllowedIpMutation] = useUserAppEnvAddAllowedIpMutation()
  const [, removeAllowedIpMutation] = useUserAppEnvRemoveAllowedIpMutation()
  const [ip, setIp] = useState('')
  return (
    <Box borderWidth="1px" rounded="lg" p={6} m="10px auto">
      <Stack direction="column" spacing={6}>
        <Box mt="1" fontWeight="semibold" fontSize="xl" as="h4" lineHeight="tight" noOfLines={1} flex={'auto'}>
          Allowed IPs
        </Box>
        <ButtonGroup>
          <Input
            size="sm"
            width="50"
            value={ip}
            type="text"
            onChange={(e: ChangeEvent<HTMLInputElement>) => setIp(e.target?.value)}
          />
          <Button
            size="sm"
            onClick={() => {
              addAllowedIpMutation({ appEnvId: appEnv.id, ip: ip })
            }}
          >
            Allow IP
          </Button>
        </ButtonGroup>
        <Stack direction="column" spacing={6}>
          {!appEnv?.ipsAllowed?.length && <AdminUiAlert message={'There are no allowed IP addresses'} />}
          {appEnv?.ipsAllowed?.map((ip) => (
            <ButtonGroup>
              <span>{ip}</span>
              <Button
                size="sm"
                onClick={() => {
                  removeAllowedIpMutation({ appEnvId: appEnv.id, ip: ip })
                }}
              >
                Delete
              </Button>
            </ButtonGroup>
          ))}
        </Stack>
      </Stack>
    </Box>
  )
}
