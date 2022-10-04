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
  discordEnabled,
  githubEnabled,
  googleEnabled,
  login,
  passwordEnabled,
}: {
  discordEnabled: boolean
  githubEnabled: boolean
  googleEnabled: boolean
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
          {discordEnabled && (
            <Button
              size="lg"
              as="a"
              href="/api/auth/discord"
              bg="#5865F2"
              color="white"
              _hover={{
                bg: 'gray.900',
              }}
            >
              <svg data-name="Layer 1" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M10.13831,10.62982h-.00013a1.05288,1.05288,0,1,0,.00013,0Zm3.75427,0a1.14582,1.14582,0,1,0,1.04907,1.14166A1.09586,1.09586,0,0,0,13.89258,10.62982Zm4.99878-8.6297H5.10864A2.11364,2.11364,0,0,0,3,4.119V18.02527A2.11368,2.11368,0,0,0,5.10864,20.1441H16.77258l-.54516-1.90289,1.31653,1.224,1.24462,1.152L21,22.57153V4.119A2.11364,2.11364,0,0,0,18.89136,2.00012ZM14.92114,15.43323v.00006s-.37036-.44232-.67895-.83319a3.2459,3.2459,0,0,0,1.86181-1.224,5.87837,5.87837,0,0,1-1.18286.60681,6.76974,6.76974,0,0,1-1.49145.44232,7.206,7.206,0,0,1-2.66394-.01025,8.64456,8.64456,0,0,1-1.51209-.44226,6.03735,6.03735,0,0,1-.75085-.34973c-.03089-.02063-.06165-.03089-.09253-.05146a.14171.14171,0,0,1-.04114-.03082c-.18506-.10284-.28809-.17487-.28809-.17487A3.19975,3.19975,0,0,0,9.8811,14.57953c-.30847.39093-.68908.8537-.68908.8537a3.72892,3.72892,0,0,1-3.13709-1.56342A13.775,13.775,0,0,1,7.536,7.87323a5.08641,5.08641,0,0,1,2.89026-1.08l.10278.12348A6.93762,6.93762,0,0,0,7.824,8.2641s.22632-.12341.60682-.29828a7.722,7.722,0,0,1,2.335-.64795,1.00465,1.00465,0,0,1,.17492-.02063,8.702,8.702,0,0,1,2.07764-.02051,8.384,8.384,0,0,1,3.096.98737,6.84576,6.84576,0,0,0-2.561-1.30628l.14392-.16449a5.08575,5.08575,0,0,1,2.89026,1.08,13.77368,13.77368,0,0,1,1.4812,5.99652A3.75972,3.75972,0,0,1,14.92114,15.43323Z"
                  fill="white"
                />
              </svg>

              <Text ml={4}>Sign in with Discord</Text>
            </Button>
          )}
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
          {googleEnabled && (
            <Button
              size="lg"
              as="a"
              href="/api/auth/google"
              bg="white"
              color="black"
              _hover={{
                bg: 'gray.200',
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="24px" height="24px">
                <path
                  fill="#FFC107"
                  d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                />
                <path
                  fill="#FF3D00"
                  d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                />
                <path
                  fill="#4CAF50"
                  d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                />
                <path
                  fill="#1976D2"
                  d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                />
              </svg>

              <Text ml={4}>Sign in with Google</Text>
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
