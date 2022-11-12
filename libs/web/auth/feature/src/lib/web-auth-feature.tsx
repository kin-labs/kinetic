import { Box, Flex, Stack, Text, useToast } from '@chakra-ui/react'
import { WebAuthDiscordButton, WebAuthGitHubButton, WebAuthGoogleButton } from '@kin-kinetic/web/auth/ui'
import { useWebConfig } from '@kin-kinetic/web/shell/data-access'
import { WebUiAlert } from '@kin-kinetic/web/ui/alert'
import { WebUiCard } from '@kin-kinetic/web/ui/card'
import { useNavigate } from 'react-router-dom'
import { AuthForm } from './auth-form'

export function WebAuthFeature() {
  const { config } = useWebConfig()
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

  const noneAvailable =
    !config?.discordEnabled && !config?.githubEnabled && !config?.googleEnabled && !config?.passwordEnabled

  return (
    <Flex alignItems="center" h="full" justifyContent="center">
      {noneAvailable ? (
        <WebUiAlert status={'warning'}>
          <Stack>
            <Text fontSize={'xl'} fontWeight={'black'}>
              No authentication providers available.
            </Text>
            <Text>Check your configuration.</Text>
          </Stack>
        </WebUiAlert>
      ) : (
        <Stack spacing={{ base: 2, md: 6 }}>
          {config?.discordEnabled && <WebAuthDiscordButton />}
          {config?.githubEnabled && <WebAuthGitHubButton />}
          {config?.googleEnabled && <WebAuthGoogleButton />}
          {config?.passwordEnabled && (
            <WebUiCard w={400} p={0}>
              <WebUiAlert status={'error'}>
                <Stack>
                  <Box textAlign="center">
                    Authentication using username and password is <strong>NOT SUPPORTED</strong> for production usage.
                  </Box>
                  <Box textAlign="center">
                    Please configure Kinetic to use one of the oAuth providers and disable password login.
                  </Box>
                </Stack>
              </WebUiAlert>
            </WebUiCard>
          )}
          {config?.passwordEnabled && (
            <WebUiCard w={400}>
              <AuthForm onError={onError} onSuccess={onSuccess} />
            </WebUiCard>
          )}
        </Stack>
      )}
    </Flex>
  )
}
