import { Box, Button, Heading, SimpleGrid, Stack, useColorModeValue } from '@chakra-ui/react'
import { WebUiLoader } from '@kin-kinetic/web/ui/loader'
import { WebUiPage } from '@kin-kinetic/web/ui/page'
import { useAdminMigrateMutation, useAdminMigrationsQuery } from '@kin-kinetic/web/util/sdk'
import { ButtonGroup } from '@saas-ui/react'
import React, { useState } from 'react'

export function WebAdminFeatureMigrationList() {
  const [{ data, fetching }] = useAdminMigrationsQuery()
  const [, migrateMutation] = useAdminMigrateMutation()
  const [output, setOutput] = useState('')
  const bg = useColorModeValue('gray.100', 'gray.800')
  const items = data?.items ?? []

  const migrate = (key: string) => {
    setOutput('')
    migrateMutation({ key }).then((result) => {
      setOutput(JSON.stringify(result.data, null, 2))
    })
  }

  return (
    <WebUiPage title="Migrations">
      {fetching ? (
        <WebUiLoader />
      ) : (
        <Stack>
          <SimpleGrid columns={{ base: 1, lg: 3 }} gap={{ base: 2, lg: 6 }}>
            {items?.map(({ key, version, status }) => (
              <Stack
                borderRadius="lg"
                p={{ base: 6 }}
                bg={bg}
                key={key}
                alignItems="center"
                justifyContent="center"
                spacing={6}
              >
                <Heading size={{ base: 'base', md: 'md', lg: 'lg' }}>{key}</Heading>
                <Heading size={'sm'}>Version: {version}</Heading>
                <ButtonGroup>
                  <Button disabled={!!status?.done} onClick={() => migrate(`${key}`)}>
                    {status?.done ? 'Migration Done' : 'Migrate'}
                  </Button>
                </ButtonGroup>
              </Stack>
            ))}
          </SimpleGrid>

          <Box as="pre" p="2" borderWidth="1px" borderRadius="lg" overflow="hidden" fontSize="xs">
            {output?.length ? output : 'No Output'}
          </Box>
        </Stack>
      )}
    </WebUiPage>
  )
}
