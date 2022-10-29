import { Box, Input, Stack, Text } from '@chakra-ui/react'
import { WebUiAlert } from '@kin-kinetic/web/ui/alert'
import { Button, ButtonGroup } from '@saas-ui/react'
import { ChangeEvent, useState } from 'react'

export function WebAppUiAppEnvAccessForm({
  addItem,
  items,
  removeItem,
  title,
}: {
  addItem: (item: string) => void
  items: string[]
  removeItem: (item: string) => void
  title: string
}) {
  const [item, setItem] = useState('')

  return (
    <Box borderWidth="1px" rounded="lg" p={6}>
      <Stack direction="column" spacing={6}>
        <Box mt="1" fontWeight="semibold" fontSize="xl" as="h4" lineHeight="tight" noOfLines={1} flex={'auto'}>
          {title}
        </Box>
        <ButtonGroup>
          <Input
            w={'full'}
            size="sm"
            width="50"
            value={item}
            type="text"
            onChange={(e: ChangeEvent<HTMLInputElement>) => setItem(e.target?.value)}
          />
          <Button
            size="sm"
            onClick={() => {
              addItem(item)
              setItem('')
            }}
          >
            Add
          </Button>
        </ButtonGroup>
        <Stack direction="column" spacing={6}>
          {!items?.length && <WebUiAlert message={`No ${title} found`} />}
          {items?.map((item) => (
            <ButtonGroup key={item} alignItems="center" justifyContent="space-between">
              <Text px={2}>{item}</Text>
              <Button size="sm" onClick={() => removeItem(item)}>
                Delete
              </Button>
            </ButtonGroup>
          ))}
        </Stack>
      </Stack>
    </Box>
  )
}
