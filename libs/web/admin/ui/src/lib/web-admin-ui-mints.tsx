import { Alert, Box, Flex, SimpleGrid, Stack, useToast } from '@chakra-ui/react'
import { Mint } from '@kin-kinetic/web/util/sdk'
import { Button } from '@saas-ui/react'
import { WebAdminUiMintDetails } from './web-admin-ui-mint-details'

export interface WebAdminUiMintsProps {
  clusterId: string
  deleteMint: (mintId: string) => Promise<void>
  importMintWallet: (mintId: string, secret: string) => Promise<void>
  mints: Mint[] | null | undefined
}

export function WebAdminUiMints({ mints, deleteMint, importMintWallet }: WebAdminUiMintsProps) {
  const toast = useToast()
  if (!mints?.length) {
    return <Alert>No mints found.</Alert>
  }

  const importWallet = (mintId: string) => {
    const secret = prompt('Enter mnemonic, secret key or byte array')
    if (!secret) return
    importMintWallet(mintId, secret).then(() => {
      toast({ status: 'success', title: 'Wallet imported' })
    })
  }
  return (
    <SimpleGrid columns={{ base: 1, lg: 2 }} gap={{ base: 2, md: 6 }}>
      {mints?.map((mint) => (
        <Box key={mint.id} p={6} borderWidth="1px" borderRadius="lg" overflow="hidden">
          <WebAdminUiMintDetails key={mint?.id} mint={mint} />
          <Flex justify={'end'} w={'full'} mt={4}>
            {mint?.id ? (
              <Stack direction={'row'}>
                <Button size={'xs'} onClick={() => deleteMint(`${mint.id}`)}>
                  Delete Mint
                </Button>
                <Button size={'xs'} onClick={() => importWallet(`${mint.id}`)}>
                  Import Airdrop Wallet
                </Button>
              </Stack>
            ) : null}
          </Flex>
        </Box>
      ))}
    </SimpleGrid>
  )
}
