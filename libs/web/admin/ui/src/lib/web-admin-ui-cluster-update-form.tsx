import { Box, Stack } from '@chakra-ui/react'
import { Cluster, ClusterStatus, AdminClusterUpdateInput } from '@kin-kinetic/web/util/admin-sdk'
import { yupResolver } from '@saas-ui/forms/yup'
import { Field, Form, FormLayout, SubmitButton } from '@saas-ui/react'
import * as Yup from 'yup'

export function WebAdminUiClusterUpdateForm({
  cluster,
  onSubmit,
}: {
  cluster: Cluster
  onSubmit: (value: AdminClusterUpdateInput) => void
}) {
  const schema = Yup.object().shape({
    name: Yup.string().required().label('Name'),
    endpointPrivate: Yup.string().required().label('Endpoint Private'),
    endpointPublic: Yup.string().required().label('Endpoint Public'),
    explorer: Yup.string().required().label('Explorer url'),
    status: Yup.string().oneOf(Object.keys(ClusterStatus)).label('Status'),
  })

  return (
    <Form defaultValues={{ ...cluster }} onSubmit={onSubmit} resolver={yupResolver(schema, { stripUnknown: true })}>
      <FormLayout>
        <Stack p={4} spacing={6}>
          <Box>
            <Stack spacing={6}>
              <Field name="type" label="Type" type="string" isDisabled rules={{ required: true }} />

              <Field name="name" label="Name" type="string" rules={{ required: true }} />
              <Field name="endpointPrivate" label="Endpoint Private" type="string" rules={{ required: true }} />
              <Field name="endpointPublic" label="Endpoint Public" type="string" rules={{ required: true }} />
              <Field name="explorer" label="Explorer" type="url" rules={{ required: true }} />
              <Field
                name="status"
                label="Status"
                type="radio"
                options={Object.keys(ClusterStatus).map((value) => ({
                  value,
                }))}
              />
            </Stack>
          </Box>
          <Box>
            <SubmitButton variant="solid">Save</SubmitButton>
          </Box>
        </Stack>
      </FormLayout>
    </Form>
  )
}
