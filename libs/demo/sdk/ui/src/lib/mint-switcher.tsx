import { Avatar, Box, Flex, Radio, RadioGroup, Stack } from '@chakra-ui/react'
import { AppConfigMint } from '@kin-kinetic/sdk'
import React from 'react'

export function MintSwitcher({
  mint,
  mints,
  selectMint,
}: {
  mint: AppConfigMint
  mints: AppConfigMint[]
  selectMint: (mint: AppConfigMint) => void
}) {
  return (
    <RadioGroup
      onChange={(v) => selectMint(mints.find((mint) => mint.publicKey === v.toString()) as AppConfigMint)}
      value={mint.publicKey}
    >
      <Stack direction="row">
        {mints.map((mint) => (
          <Radio key={mint.publicKey} value={mint.publicKey}>
            <Flex>
              <Avatar size={'xs'} src={mint.logoUrl} mr={2} />
              <Box>{mint.symbol}</Box>
            </Flex>
          </Radio>
        ))}
      </Stack>
    </RadioGroup>
  )
}
