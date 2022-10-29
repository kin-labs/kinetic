import { WebUiFormModal } from '@kin-kinetic/web/ui/form'
import { AdminMintCreateInput } from '@kin-kinetic/web/util/sdk'
import { FieldValues } from '@saas-ui/react'
import * as Yup from 'yup'

export function WebAdminUiMintAddForm({ addMint }: { addMint: (input: AdminMintCreateInput) => void }) {
  const schema = Yup.object().shape({
    address: Yup.string().required().label('Address'),
    decimals: Yup.number().integer().required().label('Decimals'),
    name: Yup.string().required().label('Name'),
    symbol: Yup.string().required().label('Symbol'),
    logoUrl: Yup.string().label('Logo URL'),
  })

  return (
    <WebUiFormModal<AdminMintCreateInput>
      data={{}}
      onSubmit={(data: FieldValues) => addMint(data as AdminMintCreateInput)}
      submitLabel="Add Mint"
      schema={schema}
    />
  )
}
