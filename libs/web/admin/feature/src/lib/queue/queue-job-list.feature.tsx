import { DeleteIcon } from '@chakra-ui/icons'
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Alert,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Flex,
  Stack,
  Text,
} from '@chakra-ui/react'
import { WebUiAlert } from '@kin-kinetic/web/ui/alert'
import { WebUiLoader } from '@kin-kinetic/web/ui/loader'
import {
  Job,
  JobStatus,
  QueueType,
  useAdminQueueDeleteJobMutation,
  useAdminQueueJobsQuery,
} from '@kin-kinetic/web/util/sdk'
import { ButtonGroup } from '@saas-ui/react'
import { useState } from 'react'

export function QueueJobListFeature({ type }: { type: QueueType }) {
  const [status, setStatus] = useState<JobStatus>(JobStatus.Active)
  const [{ data, fetching }, refresh] = useAdminQueueJobsQuery({
    variables: { type, statuses: [status.toLowerCase() as JobStatus] },
  })
  const [, deleteJob] = useAdminQueueDeleteJobMutation()

  return (
    <Stack spacing={8}>
      <Box>
        <ButtonGroup>
          {Object.keys(JobStatus).map((status) => (
            <Button key={status} onClick={() => setStatus(status as JobStatus)}>
              {status}
            </Button>
          ))}
        </ButtonGroup>
      </Box>
      {fetching ? (
        <WebUiLoader />
      ) : (
        <QueueJobList
          deleteJob={(jobId) => deleteJob({ type, jobId })}
          jobs={data?.items ?? []}
          refresh={() => refresh()}
          status={status}
          type={type}
        />
      )}
    </Stack>
  )
}

export function QueueJobList({
  deleteJob,
  jobs,
  status,
  refresh,
  type,
}: {
  deleteJob: (jobId: string) => void
  jobs: Job[]
  refresh: () => void
  status: JobStatus
  type: QueueType
}) {
  return (
    <Stack>
      {!jobs?.length ? (
        <WebUiAlert status="info" message={`The ${type} queue has no ${status} jobs`} />
      ) : (
        <Stack spacing={4}>
          <WebUiAlert status="info" message={`The ${type} queue has ${jobs?.length} ${status} jobs`} />

          <Accordion defaultIndex={[]} allowMultiple allowToggle>
            {jobs?.map((job) => (
              <AccordionItem key={job.id}>
                <Stack mb={2}>
                  <Flex>
                    <Button>
                      <DeleteIcon
                        onClick={() => {
                          deleteJob(`${job.id}`)
                          refresh()
                        }}
                      />
                    </Button>
                    <AccordionButton>
                      <Box flex="1" textAlign="left" fontFamily="mono" fontSize="xs">
                        {job.id}
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </Flex>
                  {job.failedReason ? (
                    <Alert status="error" size={'sm'}>
                      <AlertIcon />
                      <AlertTitle>{job.failedReason}</AlertTitle>
                    </Alert>
                  ) : null}
                </Stack>
                <AccordionPanel pb={4}>
                  <QueueJobListItem job={job} type={type} />
                </AccordionPanel>
              </AccordionItem>
            ))}
          </Accordion>
        </Stack>
      )}
      {/*<Box as="pre" p="2" borderWidth="1px" borderRadius="lg" overflow="hidden" fontSize="2xs">*/}
      {/*  {JSON.stringify(jobs, null, 2)}*/}
      {/*</Box>*/}
    </Stack>
  )
}

export function QueueJobListItem({ job, type }: { job: Job; type: QueueType }) {
  return (
    <Stack>
      {job.stacktrace?.length ? (
        <Stack>
          <Text size="lg">Stack Trace</Text>
          <Box as="pre" p="2" borderWidth="1px" borderRadius="lg" overflow="hidden" fontSize="xs">
            {job.stacktrace}
          </Box>
        </Stack>
      ) : null}
      <Text size="lg">Requested Account</Text>
      <Box as="pre" p="2" borderWidth="1px" borderRadius="lg" overflow="hidden" fontSize="xs">
        {JSON.stringify(
          {
            account: job?.data?.account,
            mint: job?.data?.mint,
            info: job?.data?.info,
          },
          null,
          2,
        )}
      </Box>

      <Text size="lg">Requested Environment</Text>
      <Box as="pre" p="2" borderWidth="1px" borderRadius="lg" overflow="hidden" fontSize="xs">
        {JSON.stringify(
          {
            environment: job?.data?.environment,
            index: job?.data?.index,
            mints: job?.data?.mints,
            wallets: job?.data?.wallets,
          },
          null,
          2,
        )}
      </Box>
      {/*<Box as="pre" p="2" borderWidth="1px" borderRadius="lg" overflow="hidden" fontSize="xs">*/}
      {/*  {JSON.stringify({ type, job }, null, 2)}*/}
      {/*</Box>*/}
    </Stack>
  )
}
