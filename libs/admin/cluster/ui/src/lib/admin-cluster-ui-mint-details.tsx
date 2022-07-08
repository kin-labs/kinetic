import { Avatar, Flex, FormControl, FormLabel, Switch, Text } from '@chakra-ui/react'
import { AdminUiAddress } from '@kin-kinetic/admin/ui/address'
import { Mint } from '@kin-kinetic/shared/util/admin-sdk'
import React, { useState } from 'react'

export function AdminClusterUiMintDetails({ mint }: { mint: Mint }) {
  const [addMemo, setAddMemo] = useState(false)
  return (
    <Flex direction="column">
      <Flex justifyContent="space-between" alignItems="center">
        <Flex alignItems="center">
          {mint?.logoUrl && <Avatar mr={4} size="lg" src={mint?.logoUrl} />}
          <Flex direction="column">
            <Text fontSize="2xl">{mint?.name}</Text>
            <Text color="gray.500">{mint?.symbol}</Text>
            <Text color="gray.500" fontSize="xs">
              <AdminUiAddress address={mint.address || ''}></AdminUiAddress>
            </Text>
          </Flex>
        </Flex>
        <Flex alignItems="center">
          <Flex direction="column" alignItems="end">
            <Text fontSize="lg">{mint?.decimals} decimals</Text>
            <Text color="gray.500">{mint?.type}</Text>
            {mint.airdropPublicKey && (
              <Text color="gray.500" fontSize="xs">
                <Text mr={2}>Airdrop:</Text>
                <AdminUiAddress address={mint.airdropPublicKey} />
              </Text>
            )}
          </Flex>
        </Flex>
      </Flex>
      <FormControl display="flex" alignItems="center">
        <FormLabel htmlFor="add-memo" mb="0">
          Add Memo Instruction
        </FormLabel>
        <Switch id="add-memo" isChecked={addMemo} onChange={() => setAddMemo(!addMemo)} />
      </FormControl>
    </Flex>
  )
}
