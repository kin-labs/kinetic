import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import { AdminAuthLoginFn } from '@kin-kinetic/admin/auth/data-access'
import { ChangeEvent, useState } from 'react'

export function AdminAuthLoginForm({
  githubEnabled,
  login,
  passwordEnabled,
}: {
  githubEnabled: boolean
  login: AdminAuthLoginFn
  passwordEnabled: boolean
}) {
  const [username, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const boxBg = useColorModeValue('white', 'gray.700')
  const handleLogin = async () => {
    await login({ username, password })
  }

  return (
    <Flex minH={'full'} align={'center'} justify={'center'} bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'} spacing={12}>
          <Heading fontSize={'xl'}>Sign in to your account</Heading>
          {githubEnabled && (
            <Button
              size="lg"
              as="a"
              href="/api/auth/github"
              bg="black"
              color="white"
              _hover={{
                bg: 'gray.900',
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill={'white'}>
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              <Text ml={4}>Sign in with GitHub</Text>
            </Button>
          )}
        </Stack>
        {passwordEnabled && (
          <Box rounded={'lg'} bg={boxBg} boxShadow={'lg'} p={8}>
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
        )}
      </Stack>
    </Flex>
  )
}
