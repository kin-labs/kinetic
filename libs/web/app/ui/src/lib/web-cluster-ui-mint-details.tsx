import { Avatar, Flex, Text } from '@chakra-ui/react'
import { WebUiAddress } from '@kin-kinetic/web/ui/address'
import { WebUiIdenticon } from '@kin-kinetic/web/ui/identicon'
import { Mint } from '@kin-kinetic/web/util/sdk'

export function WebClusterUiMintDetails({ mint }: { mint: Mint }) {
  return (
    <Flex direction="column">
      <Flex justifyContent="space-between" alignItems="center">
        <Flex alignItems="center">
          <Flex mr={4}>
            {mint?.logoUrl ? (
              <Avatar size="lg" src={mint?.logoUrl} />
            ) : (
              <WebUiIdenticon size="lg" name={mint?.symbol} />
            )}
          </Flex>
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
