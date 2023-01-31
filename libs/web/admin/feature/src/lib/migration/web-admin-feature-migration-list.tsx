import { Box, Button, Heading, SimpleGrid, Stack, useColorModeValue } from '@chakra-ui/react'
import { WebUiLoader } from '@kin-kinetic/web/ui/loader'
import { WebUiPage } from '@kin-kinetic/web/ui/page'
import { useAdminMigrateMutation, useAdminMigrationsQuery } from '@kin-kinetic/web/util/sdk'
import { ButtonGroup } from '@saas-ui/react'
import React, { ReactNode, useState } from 'react'

export function WebAdminFeatureMigrationList() {
  const [{ data, fetching }] = useAdminMigrationsQuery()
  const [, migrateMutation] = useAdminMigrateMutation()
  const [output, setOutput] = useState('')
  const items = data?.items ?? []

  const migrate = (key: string) => {
    setOutput('')
    migrateMutation({ key }).then((result) => {
      setOutput(JSON.stringify(result.data, null, 2))
    })
  }

  const applied = items?.filter((item) => item.status?.done)
  const pending = items?.filter((item) => !item.status?.done)

  return (
    <WebUiPage title="Migrations">
      {fetching ? (
        <WebUiLoader />
      ) : (
        <Stack>
          <Heading size="md">Pending</Heading>
          {!pending?.length ? <Heading size="sm">No migrations to run</Heading> : null}
          <SimpleGrid columns={{ base: 1, lg: 3 }} gap={{ base: 2, lg: 6 }}>
            {pending?.map(({ key, version, status }) => (
              <MigrationItem key={key}>
                <Heading size={{ base: 'base', md: 'md', lg: 'lg' }}>{key}</Heading>
                <Heading size={'sm'}>Version: {version}</Heading>
                <ButtonGroup>
                  <Button disabled={!!status?.done} onClick={() => migrate(`${key}`)}>
                    {status?.done ? 'Migration Done' : `Migrate ${status.count} items`}
                  </Button>
                </ButtonGroup>
              </MigrationItem>
            ))}
          </SimpleGrid>
          {output?.length ? (
            <Box as="pre" p="2" borderWidth="1px" borderRadius="lg" overflow="hidden" fontSize="xs">
              {output}
            </Box>
          ) : null}
          <Heading size="md">Applied</Heading>
          <SimpleGrid columns={{ base: 1, lg: 3 }} gap={{ base: 2, lg: 6 }}>
            {applied?.map(({ key, version }) => (
              <MigrationItem key={key}>
                <Heading size={{ base: 'base', md: 'md', lg: 'lg' }}>{key}</Heading>
                <Heading size={'sm'}>Version: {version}</Heading>
              </MigrationItem>
            ))}
          </SimpleGrid>
        </Stack>
      )}
    </WebUiPage>
  )
}

export function MigrationItem({ children }: { children: ReactNode }) {
  const bg = useColorModeValue('gray.100', 'gray.800')
  return (
    <Stack borderRadius="lg" p={{ base: 6 }} bg={bg} alignItems="center" justifyContent="center" spacing={6}>
      {children}
    </Stack>
  )
}
