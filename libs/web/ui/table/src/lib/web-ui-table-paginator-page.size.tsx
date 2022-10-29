import { MenuItemOption, Stack } from '@chakra-ui/react'
import { Select } from '@saas-ui/react'
import { useSearchParams } from 'react-router-dom'

export function WebUiTablePaginatorPageSize({
  options,
  setPage,
}: {
  options: number[]
  setPage: (page: number) => void
}) {
  const [searchParams, setSearchParams] = useSearchParams()

  const page = searchParams.has('page') ? Number(searchParams.get('page')) : 1
  const limit = searchParams.has('limit') ? Number(searchParams.get('limit')) : 10

  const handlePageSizeChange = (size: string) => {
    const firstTransaction = (page - 1) * limit + 1
    const newLimit = Number(size)
    const newPage = Math.ceil(firstTransaction / newLimit)
    setPage(newPage)
    setSearchParams({ limit: `${newLimit}`, page: `${newPage}` })
  }

  return (
    <Stack>
      <Select defaultValue={`${limit}`} onChange={(item) => handlePageSizeChange(item as string)}>
        {options?.map((value) => (
          <MenuItemOption key={value} value={`${value}`}>
            {value} items
          </MenuItemOption>
        ))}
      </Select>
    </Stack>
  )
}
