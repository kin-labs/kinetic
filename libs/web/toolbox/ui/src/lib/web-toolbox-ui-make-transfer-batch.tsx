import { Box } from '@chakra-ui/react'
import { Keypair } from '@kin-kinetic/keypair'
import { AppConfigMint, KineticSdk } from '@kin-kinetic/sdk'
import { yupResolver } from '@saas-ui/forms/yup'
import {
  ArrayFieldAddButton,
  ArrayFieldContainer,
  ArrayFieldRemoveButton,
  ArrayFieldRowContainer,
  ArrayFieldRowFields,
  ArrayFieldRows,
  ButtonGroup,
  Field,
  Form,
  SubmitButton,
} from '@saas-ui/react'
import { useState } from 'react'
import * as Yup from 'yup'
import { WebToolboxUiCard } from './web-toolbox-ui-card'

export function WebToolboxUiMakeTransferBatch({
  // keypair,
  sdk,
}: // selectedMint,
{
  keypair: Keypair
  sdk: KineticSdk
  selectedMint: AppConfigMint | undefined
}) {
  const [error, setError] = useState<unknown | undefined>()
  const [loading, setLoading] = useState<boolean>(false)
  const [response, setResponse] = useState<unknown | undefined>()

  const onSubmit = (data: unknown) => {
    console.log(data)
    return
    setResponse(undefined)
    setError(undefined)
    setLoading(true)

    // sdk
    //   .makeTransfer({
    //     amount,
    //     destination,
    //     mint: selectedMint?.publicKey,
    //     owner: keypair,
    //   })
    //   .then((res) => {
    //     setResponse(res);
    //     setLoading(false);
    //   })
    //   .catch((err) => {
    //     setError(err);
    //     setLoading(false);
    //   });
  }

  const destinationSchema = Yup.object().shape({
    amount: Yup.string(),
    destination: Yup.string(),
  })

  const schema = Yup.object().shape({
    destinations: Yup.array().min(1).max(15).of(destinationSchema),
  })

  return (
    <WebToolboxUiCard
      response={response}
      error={error}
      // explorer={response?.signature && sdk?.getExplorerUrl(`tx/${response?.signature}`)}
    >
      <Form
        defaultValues={
          {
            // destinations: [
            //   {
            //     amount: '100',
            //     destination: 'ALisrzsaVqciCxy8r6g7MUrPoRo3CpGxPhwBbZzqZ9bA',
            //   },
            //   {
            //     amount: '100',
            //     destination: 'BobQoPqWy5cpFioy1dMTYqNH9WpC39mkAEDJWXECoJ9y',
            //   },
            // ],
          }
        }
        resolver={yupResolver(schema)}
        onSubmit={onSubmit}
      >
        <ButtonGroup>
          <Box>
            <SubmitButton isLoading={loading} size="lg" disableIfUntouched>
              Make Transfer Batch
            </SubmitButton>
          </Box>
          <ArrayFieldContainer name="destinations" defaultValue={{}} keyName="key" min={1} max={15}>
            <ArrayFieldRows>
              {(fields) => (
                <>
                  {fields.map((field, i) => {
                    return (
                      <ArrayFieldRowContainer key={i} index={i}>
                        <ArrayFieldRowFields columns={1}>
                          <ButtonGroup>
                            <Box>
                              <Field
                                size="lg"
                                name="amount"
                                width={70}
                                placeholder="Amount"
                                type="text"
                                rules={{ required: true }}
                              />
                            </Box>
                            <Field
                              size="lg"
                              name="destination"
                              placeholder="Destination Address"
                              type="text"
                              rules={{ required: true }}
                            />
                          </ButtonGroup>
                        </ArrayFieldRowFields>
                        <ArrayFieldRemoveButton />
                      </ArrayFieldRowContainer>
                    )
                  })}
                </>
              )}
            </ArrayFieldRows>
            <ArrayFieldAddButton />
          </ArrayFieldContainer>

          {/*{response?.status && (*/}
          {/*  <Box>*/}
          {/*    <Button size="lg" disabled={true}>*/}
          {/*      {response?.status}*/}
          {/*    </Button>*/}
          {/*  </Box>*/}
          {/*)}*/}
        </ButtonGroup>
      </Form>
    </WebToolboxUiCard>
  )
}
