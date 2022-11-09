import { Avatar, Badge, Box, Flex, Stack, Tag, TagLabel, TagLeftIcon, Text, Tooltip } from '@chakra-ui/react'
import { WebUiAddress } from '@kin-kinetic/web/ui/address'
import { WebUiFormModal } from '@kin-kinetic/web/ui/form'
import { AdminMintUpdateInput, Mint } from '@kin-kinetic/web/util/sdk'
import { FieldValues } from '@saas-ui/react'
import { GoPrimitiveDot } from 'react-icons/go'
import * as Yup from 'yup'

export function WebAdminUiMintDetails({ mint }: { mint: Mint }) {
  const updateMint = (data: AdminMintUpdateInput) => {
    console.log('updateMint', data)
  }
  const schema = Yup.object().shape({
    name: Yup.string().label('Name'),
    address: Yup.string().nullable().label('Address'),
    symbol: Yup.string().nullable().label('Symbol'),
    logoUrl: Yup.string().nullable().label('Logo URL'),
    decimals: Yup.number().nullable().label('Decimals'),
    order: Yup.number().nullable().label('Order'),
    // airdropAmount: Yup.number().nullable().label('Airdrop Amount'),
    // airdropMax: Yup.number().nullable().label('Airdrop Max'),
    airdropPublicKey: Yup.string().nullable().label('Airdrop PublicKey'),
    coinGeckoId: Yup.string().nullable().label('CoinGecko ID'),
    // addMemo: Yup.boolean().nullable().label('Add Memo'),
    // default: Yup.boolean().nullable().label('Default Mint'),
    // enabled: Yup.boolean().nullable().label('Enabled'),
  })
  return (
    <Box>
      <Flex justifyContent="space-between" alignItems="start">
        <Flex>
          {mint?.logoUrl && <Avatar mr={4} size="lg" src={mint?.logoUrl} />}
          <Stack spacing={0}>
            <Text fontSize="2xl">{mint?.name}</Text>
            <Text color="gray.500">{mint?.symbol}</Text>
            <Text color="gray.500" fontSize="xs">
              <WebUiAddress address={mint.address || ''} />
            </Text>
          </Stack>
        </Flex>
        <Stack alignItems="end" pt={2}>
          <Badge color="primary">{mint?.type}</Badge>
          <Text fontSize="sm" color="gray.500">
            {mint?.decimals} decimals
          </Text>
          {mint.airdropPublicKey && (
            <Tooltip label={`Airdrop public key: ${mint.airdropPublicKey}`} bg={'gray.800'}>
              <Tag size={'sm'} variant="subtle" colorScheme="primary">
                <TagLeftIcon boxSize="12px" as={GoPrimitiveDot} color={'green.300'} />
                <TagLabel>Airdrop Enabled</TagLabel>
              </Tag>
            </Tooltip>
          )}
        </Stack>
      </Flex>
      <WebUiFormModal<AdminMintUpdateInput>
        data={mint}
        onSubmit={(data: FieldValues) => updateMint(data as AdminMintUpdateInput)}
        title="Edit Mint"
        submitLabel="Save"
        schema={schema}
      />
    </Box>
  )
}
