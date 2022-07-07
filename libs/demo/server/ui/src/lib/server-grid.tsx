import { DeleteIcon, ViewIcon } from '@chakra-ui/icons'
import { Button, ButtonGroup, Code, Flex, SimpleGrid, Stack, Text, useColorModeValue } from '@chakra-ui/react'
import { DemoServerEntity } from '@kin-kinetic/demo/server/data-access'
import React from 'react'

export function ServerGrid({
  deleteServer,
  servers,
  showServer,
}: {
  deleteServer: (server: DemoServerEntity) => void
  servers: DemoServerEntity[]
  showServer: (server: DemoServerEntity) => void
}) {
  const bgColor = useColorModeValue('gray.100', 'gray.900')
  return (
    <SimpleGrid columns={2} gap={6}>
      {servers?.map((server) => (
        <Flex
          key={server.id}
          justifyContent="space-between"
          alignItems="center"
          bg={bgColor}
          p={4}
          borderWidth="1px"
          borderRadius="md"
        >
          <Stack spacing={2}>
            <Code>{server.name}</Code>
            <Code fontSize="sm">endpoint: {server.endpoint}</Code>
            <Code fontSize="sm">environment: {server.environment}</Code>
          </Stack>
          <ButtonGroup variant="outline" spacing="2">
            <Button size="xs" onClick={() => showServer(server)} colorScheme="teal">
              <ViewIcon />
            </Button>
            <Button size="xs" onClick={() => deleteServer(server)}>
              <DeleteIcon />
            </Button>
          </ButtonGroup>
        </Flex>
      ))}
    </SimpleGrid>
  )
}
