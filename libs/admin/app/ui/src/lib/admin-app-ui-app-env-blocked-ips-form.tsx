import { Box, Button, ButtonGroup, Input, Stack } from '@chakra-ui/react'
import { AppEnv, useUserAppEnvAddBlockedIpMutation } from '@kin-kinetic/shared/util/admin-sdk'
import React, { ChangeEvent, useState } from 'react'

export interface AdminAppUiAppEnvBlockedIpsFormProps {
  appEnv: AppEnv
}

export function AdminAppUiAppEnvBlockedIpsForm({ appEnv }: AdminAppUiAppEnvBlockedIpsFormProps) {
  const [, addBlockedIpMutation] = useUserAppEnvAddBlockedIpMutation()
  const [ip, setIp] = useState('')
  return (
    <Box borderWidth="1px" rounded="lg" p={6} m="10px auto">
      <Stack direction="column" spacing={6}>
        <Box mt="1" fontWeight="semibold" fontSize="xl" as="h4" lineHeight="tight" noOfLines={1} flex={'auto'}>
          Blocked IPs
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
              addBlockedIpMutation({ appEnvId: appEnv.id, ip: ip })
            }}
          >
            Block IP
          </Button>
        </ButtonGroup>
      </Stack>
    </Box>
  )
}
