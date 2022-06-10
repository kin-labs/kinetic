import { Box, Flex, Heading } from '@chakra-ui/react'
import { App } from '@mogami/shared/util/admin-sdk'
import React from 'react'
import { Link } from 'react-router-dom'

export function AdminAppUiHeader({ app }: { app: App }) {
  return (
    <Box p="6" borderWidth="1px" borderRadius="lg" overflow="hidden">
      <Flex justifyContent="space-between" alignItems="center">
        <Box fontWeight="semibold" as="h4" lineHeight="tight" noOfLines={1} flex={'auto'}>
          <Link to={`/apps/${app.id}`}>
            <Heading>{app?.name}</Heading>
          </Link>
        </Box>
        <Box fontSize="xl" as="h4">
          <code>App Index: {app?.index}</code>
        </Box>
      </Flex>
    </Box>
  )
}
