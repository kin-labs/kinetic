// eslint-disable @typescript-eslint/no-explicit-any
import { Box, ButtonGroup, Stack } from '@chakra-ui/react'
import { ClusterTokenInput } from '@mogami/shared/util/admin-sdk'
import { Formik } from 'formik'
import { InputControl, SubmitButton } from 'formik-chakra-ui'

import * as Yup from 'yup'

export interface AdminClusterUiProps {
  input: Partial<ClusterTokenInput>
  onSubmit: (input: Partial<ClusterTokenInput>) => unknown
}

const validationSchema = Yup.object({
  address: Yup.string(),
  name: Yup.string(),
  symbol: Yup.string(),
})

export function AdminClusterUiMintForm({ input, onSubmit }: AdminClusterUiProps) {
  return (
    <Formik
      initialValues={{
        address: input.address,
        name: input.name,
        symbol: input.symbol,
      }}
      onSubmit={(values) => {
        onSubmit({
          address: values?.address,
          name: values.name,
          symbol: values?.symbol,
        })
      }}
      validationSchema={validationSchema}
    >
      {({ handleSubmit, values, errors, dirty }) => (
        <Box as="form" onSubmit={handleSubmit as any}>
          <Stack display="block" direction="column" justify="normal" spacing={6}>
            <Stack direction="column" spacing={6}>
              <InputControl name="address" label="Address" />
              <InputControl name="name" label="Name" />
              <InputControl name="symbol" label="Symbol" />
            </Stack>
            <ButtonGroup>
              <SubmitButton isDisabled={!dirty}>Search</SubmitButton>
            </ButtonGroup>
          </Stack>
        </Box>
      )}
    </Formik>
  )
}
