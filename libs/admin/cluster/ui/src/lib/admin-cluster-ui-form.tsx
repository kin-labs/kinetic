// eslint-disable @typescript-eslint/no-explicit-any
import { Box, ButtonGroup, Stack } from '@chakra-ui/react'
import { Cluster, ClusterStatus, ClusterUpdateInput } from '@mogami/shared/util/admin-sdk'
import { Formik } from 'formik'
import { InputControl, SelectControl, SubmitButton } from 'formik-chakra-ui'

import * as Yup from 'yup'

export interface AdminClusterUiProps {
  cluster?: Cluster | null | undefined
  onSubmit: (input: ClusterUpdateInput) => Promise<unknown>
}

const validationSchema = Yup.object({
  name: Yup.string(),
  endpoint: Yup.string(),
  status: Yup.string(),
})

export function AdminClusterUiForm({ cluster, onSubmit }: AdminClusterUiProps) {
  return (
    <Formik
      initialValues={{
        name: cluster?.name,
        endpoint: cluster?.endpoint,
        type: cluster?.type,
        status: cluster?.status,
      }}
      onSubmit={(values) =>
        onSubmit({
          name: values.name,
          endpoint: values?.endpoint,
          status: values?.status,
        })
      }
      validationSchema={validationSchema}
    >
      {({ handleSubmit, values, errors, dirty }) => (
        <Box as="form" onSubmit={handleSubmit as any}>
          <Stack display="block" direction="column" justify="normal" spacing={6}>
            <Box borderWidth="1px" rounded="lg" p={6} m="10px auto">
              <Stack direction="column" spacing={6}>
                <InputControl name="type" label="Type" isDisabled />
                <InputControl name="name" label="Name" />
                <InputControl name="endpoint" label="Endpoint" />
                <SelectControl name="status" label="Status" selectProps={{ placeholder: 'Select status' }}>
                  {Object.values(ClusterStatus).map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </SelectControl>
              </Stack>
            </Box>
            <ButtonGroup>
              <SubmitButton isDisabled={!dirty}>Save</SubmitButton>
            </ButtonGroup>
          </Stack>
        </Box>
      )}
    </Formik>
  )
}
