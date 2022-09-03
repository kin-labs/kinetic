import { Box, Button, ButtonGroup, Input, Stack } from '@chakra-ui/react'
import { AdminUiAlert } from '@kin-kinetic/admin/ui/alert'
import {
  AppEnv,
  useUserAppEnvAddAllowedUaMutation,
  useUserAppEnvRemoveAllowedUaMutation,
} from '@kin-kinetic/shared/util/admin-sdk'
import React, { ChangeEvent, useState } from 'react'

export interface AdminAppUiAppEnvAllowedUasFormProps {
  appEnv: AppEnv
}

export function AdminAppUiAppEnvAllowedUasForm({ appEnv }: AdminAppUiAppEnvAllowedUasFormProps) {
  const [, addAllowedUaMutation] = useUserAppEnvAddAllowedUaMutation()
  const [, removeAllowedUaMutation] = useUserAppEnvRemoveAllowedUaMutation()
  const [userAgent, setUserAgent] = useState('')
  return (
    <Box borderWidth="1px" rounded="lg" p={6} m="10px auto">
      <Stack direction="column" spacing={6}>
        <Box mt="1" fontWeight="semibold" fontSize="xl" as="h4" lineHeight="tight" noOfLines={1} flex={'auto'}>
          Allowed SDK User Agents
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
              addAllowedUaMutation({ appEnvId: appEnv.id, ua: userAgent })
            }}
          >
            Allow SDK User Agent
          </Button>
        </ButtonGroup>
        <Stack direction="column" spacing={6}>
          {!appEnv?.uasAllowed?.length && <AdminUiAlert message="There are no allowed SDK user agents" />}
          {appEnv?.uasAllowed?.map((userAgent) => (
            <ButtonGroup>
              <span>{userAgent}</span>
              <Button
                size="sm"
                onClick={() => {
                  removeAllowedUaMutation({ appEnvId: appEnv.id, ua: userAgent })
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
