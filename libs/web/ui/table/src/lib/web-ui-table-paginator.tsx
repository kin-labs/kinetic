import {
  Pagination,
  PaginationContainer,
  PaginationNext,
  PaginationPage,
  PaginationPageGroup,
  PaginationPrevious,
} from '@ajna/pagination'
import { Flex, SimpleGrid } from '@chakra-ui/react'
import { WebUiTablePaginatorPageSize } from './web-ui-table-paginator-page.size'

export function WebUiTablePaginator({
  currentPage,
  setPage,
  pagesCount,
  pages,
}: {
  currentPage: number
  setPage: (page: number) => void
  pagesCount: number
  pages: number[]
}) {
  return (
    <SimpleGrid columns={{ base: 0, lg: 3 }} gap={{ base: 6, lg: 0 }}>
      <Flex></Flex>
      <Flex justifyContent="center" alignItems="center">
        <Pagination pagesCount={pagesCount} currentPage={currentPage} onPageChange={setPage}>
          <PaginationContainer>
            <PaginationPrevious mr={1}>Previous</PaginationPrevious>
            <PaginationPageGroup>
              {pages.map((page: number) => (
                <PaginationPage
                  width={10}
                  _hover={{
                    bg: 'primary.700',
                  }}
                  _current={{
                    bg: 'primary.500',
                  }}
                  key={`pagination_page_${page}`}
                  page={page}
                />
              ))}
            </PaginationPageGroup>
            <PaginationNext ml={1}>Next</PaginationNext>
          </PaginationContainer>
        </Pagination>
      </Flex>
      <Flex key={3} justifyContent={{ base: 'center', lg: 'right' }} alignItems="center">
        <WebUiTablePaginatorPageSize setPage={setPage} options={[10, 20, 50, 100]} />
      </Flex>
    </SimpleGrid>
  )
}
