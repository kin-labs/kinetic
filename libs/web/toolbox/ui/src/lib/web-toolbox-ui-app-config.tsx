import { Avatar, Badge, Box, Flex, HStack, Stack, Text } from '@chakra-ui/react'
import { AppConfig, AppConfigMint } from '@kin-kinetic/sdk'

export function WebToolboxUiAppConfig({
  config,
  selectedMint,
  setSelectedMint,
}: {
  config: AppConfig
  selectedMint: AppConfigMint | undefined
  setSelectedMint: (mint: AppConfigMint) => void
}) {
  return (
    <Stack borderWidth="1px" borderRadius="lg">
      <Flex justify={'space-between'} bg="gray.700" p={4} align="center">
        <Text fontSize={'xl'}>
          {config.api.name}@{config.api.version}
        </Text>
        <Text fontSize={'xl'}>{config.environment.cluster.name}</Text>
      </Flex>
      <HStack p={2} spacing={{ base: 2, md: 6 }}>
        {config.mints.map((mint) => {
          return (
            <Flex
              as={'button'}
              onClick={() => setSelectedMint(mint)}
              borderWidth="1px"
              borderRadius="lg"
              cursor="pointer"
              p={2}
              key={mint.name}
              align="center"
              _hover={{ bg: 'gray.700' }}
              bg={selectedMint?.symbol === mint.symbol ? 'var(--chakra-colors-gray-800)' : ''}
              border={selectedMint?.symbol === mint.symbol ? '1px solid var(--chakra-colors-gray-500)' : ''}
            >
              <Avatar src={mint.logoUrl} />
              <Box mx={2}>
                <Flex key={mint.name} align="center">
                  <Text mr={2}>
                    {mint.name} ({mint.symbol}){' '}
                  </Text>
                  {mint.symbol === config.mint.symbol && <Badge>Default</Badge>}
                </Flex>
                <Text fontSize="xs">Decimals: {mint.decimals}</Text>
              </Box>
            </Flex>
          )
        })}
      </HStack>
    </Stack>
  )
}
