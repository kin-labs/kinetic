import { Flex, Stack, useToast } from '@chakra-ui/react'
import { WebAuthDiscordButton, WebAuthGitHubButton, WebAuthGoogleButton } from '@kin-kinetic/web/auth/ui'
import { useWebAdminConfig } from '@kin-kinetic/web/shell/data-access'
import { WebUiCard } from '@kin-kinetic/web/ui/card'
import { useNavigate } from 'react-router-dom'
import { AuthForm } from './auth-form'

export function WebAuthFeature() {
  const { config } = useWebAdminConfig()
  const navigate = useNavigate()
  const toast = useToast()

  const onError = (error: unknown) => {
    toast({
      status: 'error',
      title: `Something went wrong...`,
      description: `${error}`,
    })
  }
  const onSuccess = () => {
    toast({ status: 'success', title: `You are logged in!` })
    navigate('/apps', { replace: true })
  }

  return (
    <Flex alignItems="center" h="full" justifyContent="center">
      <WebUiCard w={400}>
        <Stack spacing={{ base: 2, md: 6 }}>
          {config?.discordEnabled && <WebAuthDiscordButton />}
          {config?.githubEnabled && <WebAuthGitHubButton />}
          {config?.googleEnabled && <WebAuthGoogleButton />}
          {config?.passwordEnabled && <AuthForm onError={onError} onSuccess={onSuccess} />}
        </Stack>
      </WebUiCard>
    </Flex>
  )
}
