import { Box, Button, Text } from '@chakra-ui/react'
import { useWebToolbox } from '@kin-kinetic/web/toolbox/data-access'
import { WebUiAlert } from '@kin-kinetic/web/ui/alert'
import { WebUiPage } from '@kin-kinetic/web/ui/page'

export function WebToolboxIndexFeature() {
  const { keypair, server } = useWebToolbox()
  console.log({ keypair, server })

  const generateKeypair = () => {
    console.log('generateKeypair')
  }

  return (
    <WebUiPage title={'Toolbox'}>
      {!keypair && (
        <WebUiAlert>
          <Text>No keypair configured.</Text>
          <Button onClick={generateKeypair}>Generate</Button>
        </WebUiAlert>
      )}
      {!server && <WebUiAlert message={'No server configured.'} />}
      {server && keypair && (
        <Box as="pre" p="6" borderWidth="1px" borderRadius="lg" overflow="hidden" fontSize="xs">
          {JSON.stringify(server, null, 2)}
          {JSON.stringify(keypair, null, 2)}
        </Box>
      )}
    </WebUiPage>
  )
}
