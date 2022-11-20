import { Avatar, Badge, Flex, Stack, Tag, TagLabel, TagLeftIcon, Text, Tooltip } from '@chakra-ui/react'
import { WebUiAddress } from '@kin-kinetic/web/ui/address'
import { WebUiIdenticon } from '@kin-kinetic/web/ui/identicon'
import { Mint } from '@kin-kinetic/web/util/sdk'
import { GoPrimitiveDot } from 'react-icons/go'

export function WebAdminUiMintDetails({ mint }: { mint: Mint }) {
  return (
    <Flex direction="column">
      <Flex justifyContent="space-between" alignItems="start">
        <Flex>
          <Flex mr={4}>
            {mint?.logoUrl ? (
              <Avatar size="lg" src={mint?.logoUrl} />
            ) : (
              <WebUiIdenticon size="lg" name={mint?.symbol} />
            )}
          </Flex>
          <Stack spacing={0}>
            <Text fontSize="2xl">{mint?.name}</Text>
            <Text color="gray.500">{mint?.symbol}</Text>
            <Text color="gray.500" fontSize="xs">
              <WebUiAddress address={mint.address || ''} />
            </Text>
          </Stack>
        </Flex>
        <Stack alignItems="end" pt={2}>
          <Badge color="primary">{mint?.type}</Badge>
          <Text fontSize="sm" color="gray.500">
            {mint?.decimals} decimals
          </Text>
          {mint.airdropPublicKey && (
            <Tooltip label={`Airdrop public key: ${mint.airdropPublicKey}`}>
              <Tag size={'sm'} variant="subtle" colorScheme="primary">
                <TagLeftIcon boxSize="12px" as={GoPrimitiveDot} color={'green.300'} />
                <TagLabel>Airdrop Enabled</TagLabel>
              </Tag>
            </Tooltip>
          )}
        </Stack>
      </Flex>
    </Flex>
  )
}
