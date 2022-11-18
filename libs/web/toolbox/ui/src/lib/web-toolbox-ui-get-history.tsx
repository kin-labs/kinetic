import { Box, Flex, Link, Stack, Text, useToast } from '@chakra-ui/react'
import { Keypair } from '@kin-kinetic/keypair'
import { AppConfigMint, HistoryResponse, KineticSdk } from '@kin-kinetic/sdk'
import { ellipsify } from '@kin-kinetic/web/app/ui'
import { Button, ButtonGroup } from '@saas-ui/react'
import { IconCopy, IconExternalLink } from '@tabler/icons'
import { useState } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import Timeago from 'react-timeago'
import { WebToolboxUiCard } from './web-toolbox-ui-card'

export function WebToolboxUiGetHistory({
  keypair,
  sdk,
  selectedMint,
}: {
  keypair: Keypair
  sdk: KineticSdk
  selectedMint: AppConfigMint | undefined
}) {
  const [loading, setLoading] = useState<boolean>(false)
  const [response, setResponse] = useState<HistoryResponse[] | undefined>()
  const [error, setError] = useState<unknown | undefined>()

  const click = () => {
    setError(undefined)
    setLoading(true)
    setResponse(undefined)
    sdk
      .getHistory({
        account: keypair.publicKey,
        mint: selectedMint?.publicKey,
      })
      .then((res) => {
        setResponse(res)
        setLoading(false)
      })
      .catch((err) => {
        setError(err)
        setLoading(false)
      })
  }

  return (
    <WebToolboxUiCard response={response} error={error}>
      <Stack>
        <ButtonGroup>
          <Button variant="primary" size="lg" isLoading={loading} onClick={click}>
            Get History
          </Button>
          <Button size="lg" disabled={true}>
            {(response?.length ?? 0) > 0
              ? `History for ${response?.length} ${selectedMint?.symbol} account(s)`
              : `No history for account`}
          </Button>
        </ButtonGroup>
        {response?.length && (
          <Box py={4}>
            {response.map(({ account, history }) => (
              <Box key={account} p={4} borderWidth={1} fontSize="xm" borderRadius={'md'} color="gray.500">
                <Text>
                  <Link color={'primary.400'} href={sdk.getExplorerUrl('address/' + account)} target={'_blank'}>
                    {account}
                  </Link>
                </Text>
                {history.map((item) => (
                  <Flex key={item.signature} justify="space-between" py={2} align="center">
                    <ButtonGroup>
                      <Copy text={`${item.signature}`} />
                      <Button
                        variant={'outline'}
                        as={'a'}
                        href={sdk.getExplorerUrl(`tx/${item.signature}`)}
                        target={'_blank'}
                      >
                        <Flex align="center">
                          <Text mr={2}>{ellipsify(item.signature)}</Text>
                          <IconExternalLink color="gray" size={16} />
                        </Flex>
                      </Button>
                    </ButtonGroup>

                    {item?.blockTime && <Timeago date={new Date(item?.blockTime * 1000 || 0)} />}
                  </Flex>
                ))}
              </Box>
            ))}
          </Box>
        )}
      </Stack>
    </WebToolboxUiCard>
  )
}

function Copy({ text }: { text: string }) {
  const toast = useToast()
  return (
    <CopyToClipboard text={text} onCopy={() => toast({ status: 'info', title: 'Copied to clipboard' })}>
      <Button p={2} variant={'outline'}>
        <IconCopy color="gray" size={16} />
      </Button>
    </CopyToClipboard>
  )
}
