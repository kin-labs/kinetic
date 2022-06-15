import { Box, Button, Flex, FormControl, FormLabel, Heading, Input, Stack, useColorModeValue } from '@chakra-ui/react'
import { AdminAuthLoginFn } from '@kin-kinetic/admin/auth/data-access'
import { ChangeEvent, useState } from 'react'

export function AdminAuthLoginForm({ login }: { login: AdminAuthLoginFn }) {
  const [username, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const handleLogin = async () => {
    await login({ username, password })
  }

  return (
    <Flex minH={'full'} align={'center'} justify={'center'} bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Sign in to your account</Heading>
        </Stack>
        <Box rounded={'lg'} bg={useColorModeValue('white', 'gray.700')} boxShadow={'lg'} p={8}>
          <Stack spacing={4}>
            <FormControl id="username">
              <FormLabel>Username</FormLabel>
              <Input
                type="username"
                value={username}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target?.value)}
              />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                value={password}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target?.value)}
              />
            </FormControl>
            <Stack spacing={10}>
              <Button
                onClick={handleLogin}
                disabled={!username?.length || !password?.length}
                bg={'teal.400'}
                color={'white'}
                _hover={{
                  bg: 'teal.500',
                }}
              >
                Sign in
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  )
}
