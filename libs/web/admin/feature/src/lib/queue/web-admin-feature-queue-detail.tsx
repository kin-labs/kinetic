import { Badge, Box, Button, Stack, Text, Tooltip, useToast } from '@chakra-ui/react'
import { WebUiAlert } from '@kin-kinetic/web/ui/alert'
import { WebUiCard } from '@kin-kinetic/web/ui/card'
import { WebUiLoaderPage } from '@kin-kinetic/web/ui/loader'
import { WebUiPage, WebUiPageBackButton } from '@kin-kinetic/web/ui/page'
import {
  JobStatus,
  QueueType,
  useAdminQueueCleanMutation,
  useAdminQueueLoadMutation,
  useAdminQueuePauseMutation,
  useAdminQueueQuery,
  useAdminQueueResumeMutation,
} from '@kin-kinetic/web/util/sdk'
import { ButtonGroup, Field, Form, SubmitButton } from '@saas-ui/react'
import { useEffect, useState } from 'react'
import { MdDelete, MdPause, MdPlayArrow, MdRefresh } from 'react-icons/md'
import { useParams } from 'react-router-dom'
import { QueueCountStats } from './queue-count.stats'
import { QueueJobListFeature } from './queue-job-list.feature'

const DEFAULT_TIMEOUT = 5000

export function WebAdminFeatureQueueDetail() {
  const toast = useToast()
  const [timeout, setTimeout] = useState(DEFAULT_TIMEOUT)
  const { type } = useParams<{ type: string }>()
  const [{ data, fetching }, refresh] = useAdminQueueQuery({
    variables: { type: `${type}` as QueueType },
  })

  const [, cleanQueue] = useAdminQueueCleanMutation()
  const [, pauseQueue] = useAdminQueuePauseMutation()
  const [, resumeQueue] = useAdminQueueResumeMutation()
  const [, loadQueue] = useAdminQueueLoadMutation()

  useEffect(() => {
    if (!type) return

    const timer = setInterval(() => {
      refresh()
    }, timeout)

    return () => {
      clearInterval(timer)
    }
  }, [timeout, type])

  useEffect(() => {
    if (!data?.item || data?.item?.isPaused || (data?.item?.count?.waiting ?? 0) < 1) {
      if (timeout !== DEFAULT_TIMEOUT) {
        console.log('Setting timeout to 5 seconds')
        setTimeout(DEFAULT_TIMEOUT)
      }
      return
    }
    if (timeout !== 1000) {
      console.log('Setting timeout to 1 second')
      setTimeout(1000)
    }
  }, [data?.item?.count, data?.item?.isPaused, timeout])

  const toastError = (description: string) => {
    toast({
      title: 'Error',
      description,
      status: 'error',
      duration: 5000,
      isClosable: true,
    })
  }
  const toastSuccess = (description: string) => {
    toast({
      title: 'Success',
      description,
      status: 'success',
      duration: 5000,
      isClosable: true,
    })
  }

  const clearQueue = (status?: JobStatus) => {
    cleanQueue({ type: type as QueueType, status: status as JobStatus })
      .then((res) => {
        if (res.error) {
          return toastError(res.error.message)
        }
        refresh()
        toastSuccess('Queue cleaned')
      })
      .catch((error) => toastError(error.message))
  }

  const resume = () => {
    resumeQueue({ type: type as QueueType })
      .then((res) => {
        if (res.error) {
          return toastError(res.error.message)
        }
        refresh()
        toastSuccess('Queue resumed')
      })
      .catch((error) => toastError(error.message))
  }
  const pause = () => {
    pauseQueue({ type: type as QueueType })
      .then((res) => {
        if (res.error) {
          return toastError(res.error.message)
        }
        refresh()
        toastSuccess('Queue paused')
      })
      .catch((error) => toastError(error.message))
  }
  const submit = ({ environment, index, payload }: { environment: string; index: number; payload: unknown }) => {
    loadQueue({ input: { type: type as QueueType, environment, index: Number(index), payload } })
      .then((res) => {
        if (res.error) {
          return toastError(res.error.message)
        }
        toastSuccess('Queue loaded')
      })
      .catch((error) => toastError(error.message))
  }

  if (!data?.item && fetching) {
    return <WebUiLoaderPage />
  }

  if (!data?.item) {
    return <WebUiAlert status="error" message="Queue not found :(" />
  }

  return (
    <WebUiPage
      title={`${data?.item?.name}`}
      actionLeft={<WebUiPageBackButton />}
      actionRight={
        <ButtonGroup alignItems="center">
          <Box>
            <Badge>{data?.item?.isPaused ? 'Paused' : 'Started'}</Badge>
          </Box>
          {data?.item?.isPaused ? (
            <Button onClick={() => resume()} leftIcon={<MdPlayArrow />}>
              Resume
            </Button>
          ) : (
            <Button onClick={() => pause()} leftIcon={<MdPause />}>
              Pause
            </Button>
          )}
          <Tooltip label={`Automatic refresh each ${timeout / 1000} seconds`}>
            <Button onClick={() => refresh()} leftIcon={<MdRefresh />}>
              Refresh
            </Button>
          </Tooltip>
          <Tooltip label={`This will remove all the jobs from the queue.`}>
            <Button onClick={() => clearQueue()} leftIcon={<MdDelete />}>
              Clear queue
            </Button>
          </Tooltip>
        </ButtonGroup>
      }
    >
      {data?.item?.count ? (
        <WebUiCard>
          <QueueCountStats count={data.item.count} clearQueue={clearQueue} />
        </WebUiCard>
      ) : null}
      {data?.item?.info ? (
        <WebUiCard>
          <Box as="pre" p="2" borderWidth="1px" borderRadius="lg" overflow="hidden" fontSize="2xs">
            {JSON.stringify(data?.item?.info, null, 2)}
          </Box>
        </WebUiCard>
      ) : null}
      <WebUiCard>
        <Stack spacing={4}>
          <Stack>
            <Text fontSize="2xl">{type}</Text>
            {type === QueueType.CloseAccount ? (
              <Text>The payload for the CloseAccount queue is a newline-separated list of accounts to close.</Text>
            ) : null}
          </Stack>
          <Form
            defaultValues={{
              environment: 'local',
              index: 1,
              payload: '',
            }}
            onSubmit={({ environment, index, payload }) => submit({ environment, index, payload })}
          >
            <Stack>
              <Field name="environment" label="Environment" />
              <Field type="number" name="index" label="Index" />
              <Field type="textarea" name="payload" label="Payload" />
              <Box>
                <SubmitButton>Load Queue</SubmitButton>
              </Box>
            </Stack>
          </Form>
        </Stack>
      </WebUiCard>
      <WebUiCard>
        {data.item.type ? <QueueJobListFeature type={data.item.type} /> : null}
        {/*<Box as="pre" p="2" borderWidth="1px" borderRadius="lg" overflow="hidden" fontSize="2xs">*/}
        {/*  {JSON.stringify(data, null, 2)}*/}
        {/*</Box>*/}
      </WebUiCard>
    </WebUiPage>
  )
}
