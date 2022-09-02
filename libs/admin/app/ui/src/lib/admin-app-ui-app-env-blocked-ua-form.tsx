import { Box, Button, ButtonGroup, Input, Stack } from '@chakra-ui/react'
import {
  AppEnv,
  useUserAppEnvAddBlockedUaMutation,
  useUserAppEnvRemoveBlockedUaMutation,
} from '@kin-kinetic/shared/util/admin-sdk'
import React, { ChangeEvent, useState } from 'react'

export interface AdminAppUiAppEnvBlockedUasFormProps {
  appEnv: AppEnv
}

export function AdminAppUiAppEnvBlockedUasForm({ appEnv }: AdminAppUiAppEnvBlockedUasFormProps) {
  const [, addBlockedUaMutation] = useUserAppEnvAddBlockedUaMutation()
  const [, removeBlockedUaMutation] = useUserAppEnvRemoveBlockedUaMutation()
  const [userAgent, setUserAgent] = useState('')
  return (
    <Box borderWidth="1px" rounded="lg" p={6} m="10px auto">
      <Stack direction="column" spacing={6}>
        <Box mt="1" fontWeight="semibold" fontSize="xl" as="h4" lineHeight="tight" noOfLines={1} flex={'auto'}>
          Blocked SDK User Agents
        </Box>
        <ButtonGroup>
          <Input
            size="sm"
            width="50"
            value={userAgent}
            type="text"
            onChange={(e: ChangeEvent<HTMLInputElement>) => setUserAgent(e.target?.value)}
          />
          <Button
            size="sm"
            onClick={() => {
              addBlockedUaMutation({ appEnvId: appEnv.id, ua: userAgent })
            }}
          >
            Block SDK User Agent
          </Button>
        </ButtonGroup>
        <Stack direction="column" spacing={6}>
          {appEnv?.uasBlocked?.length === 0 && <>There are none SDK user agents blocked</>}
          {appEnv?.uasBlocked?.map((userAgent) => (
            <ButtonGroup>
              <span>{userAgent}</span>
              <Button
                size="sm"
                onClick={() => {
                  removeBlockedUaMutation({ appEnvId: appEnv.id, ua: userAgent })
                }}
              >
                Unblock SDK User Agent
              </Button>
            </ButtonGroup>
          ))}
        </Stack>
      </Stack>
    </Box>
  )
}
