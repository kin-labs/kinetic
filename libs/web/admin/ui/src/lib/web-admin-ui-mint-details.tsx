import { Avatar, Badge, Flex, Stack, Tag, TagLabel, TagLeftIcon, Text, Tooltip } from '@chakra-ui/react'
import { WebUiAddress } from '@kin-kinetic/web/ui/address'
import { Mint } from '@kin-kinetic/web/util/admin-sdk'
import { GoPrimitiveDot } from 'react-icons/go'

export function WebAdminUiMintDetails({ mint }: { mint: Mint }) {
  return (
    <Flex direction="column">
      <Flex justifyContent="space-between" alignItems="start">
        <Flex>
          {mint?.logoUrl && <Avatar mr={4} size="lg" src={mint?.logoUrl} />}
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
            <Tooltip label={`Airdrop public key: ${mint.airdropPublicKey}`} bg={'gray.800'}>
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
