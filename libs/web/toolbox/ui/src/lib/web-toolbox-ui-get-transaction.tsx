import { Box, useToast } from '@chakra-ui/react'
import { GetTransactionResponse, KineticSdk } from '@kin-kinetic/sdk'
import { Button, ButtonGroup, Field, Form, SubmitButton } from '@saas-ui/react'
import { useState } from 'react'
import { WebToolboxUiCard } from './web-toolbox-ui-card'

export function WebToolboxUiGetTransaction({ sdk }: { sdk: KineticSdk }) {
  const toast = useToast()
  const [error, setError] = useState<unknown | undefined>()
  const [loading, setLoading] = useState<boolean>(false)
  const [response, setResponse] = useState<GetTransactionResponse | undefined>()

  const onSubmit = ({ signature }: { signature: string }) => {
    setResponse(undefined)
    setError(undefined)
    setLoading(true)

    sdk
      .getTransaction({ signature })
      .then((res) => {
        setResponse(res)
        setLoading(false)
      })
      .catch((err) => {
        setError(err)
        setLoading(false)
        toast({
          title: 'Error',
          description: err.message,
          status: 'error',
        })
      })
  }

  return (
    <WebToolboxUiCard response={response} error={error}>
      <Form defaultValues={{ signature: '' }} onSubmit={onSubmit}>
        <ButtonGroup>
          <Box>
            <SubmitButton disableIfUntouched isLoading={loading} type="submit" size="lg">
              Get Transaction
            </SubmitButton>
          </Box>
          <Field size="lg" name="signature" type="text" rules={{ required: true }} />
          {response?.status && (
            <Box>
              <Button size="lg" disabled={true}>
                {response?.status?.value?.confirmationStatus}
              </Button>
            </Box>
          )}
        </ButtonGroup>
      </Form>
    </WebToolboxUiCard>
  )
}
