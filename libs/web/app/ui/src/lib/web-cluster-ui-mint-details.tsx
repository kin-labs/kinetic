import { Avatar, Flex, Text } from '@chakra-ui/react'
import { WebUiAddress } from '@kin-kinetic/web/ui/address'
import { Mint } from '@kin-kinetic/web/util/admin-sdk'

export function WebClusterUiMintDetails({ mint }: { mint: Mint }) {
  return (
    <Flex direction="column">
      <Flex justifyContent="space-between" alignItems="center">
        <Flex alignItems="center">
          {mint?.logoUrl && <Avatar mr={4} size="lg" src={mint?.logoUrl} />}
          <Flex direction="column">
            <Text fontSize="2xl">{mint?.name}</Text>
            <Text color="gray.500">{mint?.symbol}</Text>
            <Text color="gray.500" fontSize="xs">
              <WebUiAddress address={mint.address || ''}></WebUiAddress>
            </Text>
          </Flex>
        </Flex>
        <Flex alignItems="center">
          <Flex direction="column" alignItems="end">
            <Text fontSize="lg">{mint?.decimals} decimals</Text>
            <Text color="gray.500">{mint?.type}</Text>
            {mint.airdropPublicKey && (
              <Text color="gray.500" fontSize="xs">
                <Text as="span" mr={2}>
                  Airdrop:
                </Text>
                <WebUiAddress address={mint.airdropPublicKey} />
              </Text>
            )}
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  )
}
