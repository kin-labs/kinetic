import { Box, Flex, useColorModeValue } from '@chakra-ui/react'
import { ReactNode } from 'react'

export function WebUiLayoutFooter() {
  const copyright: ReactNode = <p>Kin Foundation &copy; {new Date().getUTCFullYear()}</p>
  const borderColor = useColorModeValue('gray.300', 'gray.700')
  return (
    <Box borderTop={'1px'} borderColor={borderColor} color={'gray.500'}>
      <Flex h={12} fontSize="sm" alignItems={'center'} justifyContent={'center'}>
        <Flex alignItems={'center'}>
          <Box>{copyright}</Box>
        </Flex>
      </Flex>
    </Box>
  )
}
