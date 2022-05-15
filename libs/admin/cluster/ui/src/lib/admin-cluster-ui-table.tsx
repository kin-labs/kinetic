import { Code, Flex, Image, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react'
import { Cluster } from '@mogami/shared/util/admin-sdk'
import React from 'react'
import { Link } from 'react-router-dom'

export interface AdminClusterUiTableProps {
  clusters: Cluster[] | null | undefined
  deleteCluster: (cluster: Cluster) => void
}

export function AdminClusterUiTable({ clusters, deleteCluster }: AdminClusterUiTableProps) {
  return (
    <TableContainer>
      <Table variant="simple" colorScheme="teal">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Type</Th>
            <Th isNumeric>Status</Th>
          </Tr>
        </Thead>
        <Tbody>
          {clusters?.map((cluster) => (
            <Tr key={cluster.id}>
              <Td>
                <Flex alignItems="center">
                  <Image mr={2} src="/assets/solana-logo.svg" h={4} />
                  <Link to={`/clusters/${cluster.id}`}>
                    <Text color="teal.500">{cluster.name}</Text>
                  </Link>
                </Flex>
              </Td>
              <Td>
                <Code colorScheme="teal">{cluster.type}</Code>
              </Td>
              <Td isNumeric>
                <Code colorScheme="teal">{cluster.status}</Code>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  )
}
