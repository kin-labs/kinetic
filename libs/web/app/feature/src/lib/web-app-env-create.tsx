import { Box, Flex, HStack, Spacer, Stack, Tag, TagLabel, TagLeftIcon, Text, useToast } from '@chakra-ui/react'
import { useWebApp } from '@kin-kinetic/web/app/data-access'
import { WebUiAlert } from '@kin-kinetic/web/ui/alert'
import { WebUiCard } from '@kin-kinetic/web/ui/card'
import { WebUiLoader } from '@kin-kinetic/web/ui/loader'
import { WebUiPageFull } from '@kin-kinetic/web/ui/page'
import {
  Cluster,
  ClusterStatus,
  UserAppEnvCreateInput,
  useUserClustersQuery,
  useUserCreateAppEnvMutation,
} from '@kin-kinetic/web/util/sdk'
import { Button, ButtonGroup, Field, Form } from '@saas-ui/react'
import { FocusEvent, useEffect, useState } from 'react'
import { GoPrimitiveDot } from 'react-icons/go'
import { useNavigate } from 'react-router-dom'

export function WebAppEnvCreate() {
  const toast = useToast()
  const navigate = useNavigate()
  const [selectedCluster, setSelectedCluster] = useState<Cluster | undefined>()
  const [input, setInput] = useState<UserAppEnvCreateInput>({ name: '' })
  const [, createAppEnv] = useUserCreateAppEnvMutation()
  const [{ data: clusterData, fetching, error }] = useUserClustersQuery()
  const { app } = useWebApp()

  useEffect(() => {
    if (selectedCluster || !clusterData?.items?.length) return
    setSelectedCluster(clusterData?.items[0])
  }, [clusterData?.items, selectedCluster])

  const submit = () => {
    if (!app?.id || !selectedCluster?.id || !input?.name) return
    createAppEnv({ appId: app.id, clusterId: selectedCluster.id, input })
      .then((res) => {
        if (res.data?.created) {
          toast({ status: 'success', title: 'Environment Created' })
          setTimeout(() => {
            navigate(`/apps/${app.id}/environments/${res?.data?.created?.id}`)
          }, 300)
        } else {
          toast({
            status: 'error',
            title: 'Something went wrong',
            description: `${res.error}`,
          })
        }
      })
      .catch((error) =>
        toast({
          status: 'error',
          title: 'Something went wrong',
          description: `${error}`,
        }),
      )
  }

  if (!app) {
    return <WebUiAlert status="error" message="App not found :(" />
  }

  if (fetching) {
    return <WebUiLoader />
  }

  if (error) {
    toast({
      status: 'error',
      title: 'Something went wrong',
      description: `${error}`,
    })
  }
  return (
    <WebUiPageFull title="Create Environment">
      <WebUiCard>
        <Stack spacing={{ base: 2, md: 6 }}>
          {clusterData?.items
            ?.filter((cluster) => cluster.status === ClusterStatus.Active)
            .map((cluster) => (
              <ClusterItem
                key={cluster.id}
                cluster={cluster}
                selectedCluster={selectedCluster}
                setSelectedCluster={(selected: Cluster) => {
                  setSelectedCluster(selected)
                }}
              />
            ))}
          <EnvironmentNameForm onBlur={(input) => setInput(input)} />
          <ButtonGroup width="100%">
            <Spacer />
            <Button
              label="Create"
              onClick={submit}
              isDisabled={!selectedCluster || !input.name}
              colorScheme="primary"
            />
          </ButtonGroup>
        </Stack>
      </WebUiCard>
    </WebUiPageFull>
  )
}

export function ClusterItem({
  cluster,
  selectedCluster,
  setSelectedCluster,
}: {
  cluster: Cluster
  selectedCluster: Cluster | undefined
  setSelectedCluster: (cluster: Cluster) => void
}) {
  return (
    <Stack
      borderWidth="1px"
      borderRadius="lg"
      cursor="pointer"
      borderColor={cluster?.id === selectedCluster?.id ? 'primary.500' : undefined}
      p={4}
      onClick={() => setSelectedCluster(cluster)}
    >
      <Flex justifyContent="space-between" alignItems="center">
        <HStack alignItems="center">
          <Text fontSize="2xl">{cluster.name}</Text>
          <Box>
            <Tag size={'sm'} variant="subtle" colorScheme={cluster.status === ClusterStatus.Active ? 'green' : 'red'}>
              <TagLeftIcon
                boxSize="12px"
                as={GoPrimitiveDot}
                color={cluster.status === ClusterStatus.Active ? 'green.300' : 'red.300'}
              />
              <TagLabel>{cluster.status}</TagLabel>
            </Tag>
          </Box>
        </HStack>
        <Box>
          <Tag size={'sm'} variant="subtle" colorScheme="primary">
            {cluster.type}
          </Tag>
        </Box>
      </Flex>
      <Flex justifyContent="space-between" alignItems="center">
        <HStack>
          {!cluster?.mints?.length && (
            <Tag size={'sm'} variant="subtle" colorScheme="red">
              No Mints
            </Tag>
          )}
          {cluster?.mints?.map((mint) => (
            <Tag key={mint.id} size={'sm'} variant="subtle" colorScheme="primary">
              {mint.name} ({mint.symbol})
            </Tag>
          ))}
        </HStack>
      </Flex>
    </Stack>
  )
}

function EnvironmentNameForm({
  onBlur,
  isDisabled,
}: {
  onBlur: (e: UserAppEnvCreateInput) => void
  isDisabled?: boolean
}) {
  return (
    <Form
      onSubmit={() => {
        console.log('Ignore This')
      }}
    >
      <Stack borderWidth="1px" borderRadius="lg" p={4} borderColor={isDisabled ? 'primary.500' : undefined}>
        <Field
          isDisabled={isDisabled}
          name="name"
          label="Name"
          type="text"
          help="The name of this environment"
          rules={{ required: true }}
          onBlur={(e: FocusEvent<HTMLInputElement>) => {
            onBlur({ name: e.target.value })
          }}
        />
      </Stack>
    </Form>
  )
}
