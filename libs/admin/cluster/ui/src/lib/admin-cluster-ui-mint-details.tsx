import { Avatar, Flex, Text, Tooltip } from '@chakra-ui/react'
import { Mint } from '@mogami/shared/util/admin-sdk'
import React from 'react'

function elipsify(str = '', len = 4) {
  if (str.length > 30) {
    return str.substr(0, len) + '...' + str.substr(str.length - len, str.length)
  }
  return str
}
export function AdminClusterUiMintDetails({ mint }: { mint: Mint }) {
  return (
    <Flex justifyContent="space-between" alignItems="center">
      <Flex alignItems="center">
        {mint?.logoUrl && <Avatar mr={4} size="lg" src={mint?.logoUrl} />}
        <Flex direction="column">
          <Text fontSize="2xl">{mint?.name}</Text>
          <Text color="gray.500">{mint?.symbol}</Text>
          <Text color="gray.500" fontSize="xs">
            <Tooltip title={mint.address || ''}>{elipsify(mint?.address || '')}</Tooltip>
          </Text>
        </Flex>
      </Flex>
      <Flex alignItems="center">
        <Flex direction="column" alignItems="end">
          <Text fontSize="lg">{mint?.decimals} decimals</Text>
          <Text color="gray.500">{mint?.type}</Text>
        </Flex>
      </Flex>
    </Flex>
  )
}
