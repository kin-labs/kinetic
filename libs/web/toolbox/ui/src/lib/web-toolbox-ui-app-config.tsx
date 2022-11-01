import { Avatar, Badge, Box, Flex, HStack, Stack, Text, useColorModeValue } from '@chakra-ui/react'
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
  const bg = useColorModeValue('gray.100', 'gray.800')
  const color = useColorModeValue('gray.900', 'gray.300')
  return (
    <Stack borderWidth="1px" borderRadius="lg">
      <Flex justify={'space-between'} bg={bg} color={color} p={4} align="center">
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
              bg={selectedMint?.symbol === mint.symbol ? bg : ''}
              border={selectedMint?.symbol === mint.symbol ? color : ''}
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
