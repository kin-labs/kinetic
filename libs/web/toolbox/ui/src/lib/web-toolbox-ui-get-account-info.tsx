import { Badge, Box } from '@chakra-ui/react'
import { Keypair } from '@kin-kinetic/keypair'
import { AccountInfo, KineticSdk } from '@kin-kinetic/sdk'
import { ButtonGroup, Field, Form, SubmitButton } from '@saas-ui/react'
import { useEffect, useState } from 'react'
import { WebToolboxUiCard } from './web-toolbox-ui-card'

export function WebToolboxUiGetAccountInfo({ keypair, sdk }: { keypair: Keypair; sdk: KineticSdk }) {
  const [error, setError] = useState<unknown | undefined>()
  const [loading, setLoading] = useState<boolean>(false)
  const [response, setResponse] = useState<AccountInfo | undefined>()

  function getBalance({ account }: { account: string }) {
    setResponse(undefined)
    setError(undefined)
    setLoading(true)

    sdk
      .getAccountInfo({ account })
      .then((res) => {
        setResponse(res)
        setLoading(false)
      })
      .catch((err) => {
        setError(err)
        setLoading(false)
      })
  }

  useEffect(() => {
    console.log(`getBalance: Public key updated ${keypair.publicKey}`)
    getBalance({ account: keypair.publicKey })
  }, [keypair.publicKey])

  return (
    <WebToolboxUiCard response={response} error={error}>
      <Form defaultValues={{ account: keypair.publicKey }} onSubmit={getBalance}>
        <ButtonGroup alignItems="center">
          <Box>
            <SubmitButton isLoading={loading} type="submit" size="lg">
              Get Account Info
            </SubmitButton>
          </Box>
          <Box>
            <Field size="lg" name="account" placeholder="Account" type="text" rules={{ required: true }} />
          </Box>
          <Box alignItems="center">
            {response?.isMint ? (
              <Badge colorScheme="violet" variant="outline">
                Mint
              </Badge>
            ) : null}
            {response?.isOwner ? (
              <Badge colorScheme="green" variant="outline">
                Owner Account
              </Badge>
            ) : null}
            {response?.isTokenAccount ? (
              <Badge colorScheme="cyan" variant="outline">
                Token Account
              </Badge>
            ) : null}
          </Box>
        </ButtonGroup>
      </Form>
    </WebToolboxUiCard>
  )
}
