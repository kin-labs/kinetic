import {
  Avatar,
  Button,
  ButtonGroup,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Radio,
  RadioGroup,
  Stack,
  Text,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react'
import { WebUiLoader } from '@kin-kinetic/web/ui/loader'

import {
  AppUser,
  AppUserRole,
  UserAppUserAddInput,
  UserAppUserUpdateRoleInput,
  useUserSearchUsersQuery,
} from '@kin-kinetic/web/util/sdk'
import { FieldValues } from '@saas-ui/forms'
import { Field, Form, List, SubmitHandler } from '@saas-ui/react'
import React, { FocusEvent, useState } from 'react'

export function WebAppUiAppUserModal({
  addRole,
  updateRole,
  user,
}: {
  addRole?: ({ role, userId }: UserAppUserAddInput) => void
  updateRole?: ({ role, userId }: UserAppUserUpdateRoleInput) => void
  user?: AppUser | null | undefined
}) {
  const bg = useColorModeValue('gray.100', 'gray.800')
  const create = !user?.user
  const [query, setQuery] = useState<string>('')
  const [tempQuery, setTempQuery] = useState<string>('')
  const [userId, setUserId] = useState<string | undefined>(user?.user?.id)
  const [role, setRole] = useState<AppUserRole>(user?.role || AppUserRole.Member)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [{ data: userData, fetching }] = useUserSearchUsersQuery({
    variables: { input: { query } },
  })

  const userOptions = (userData?.items || []).map((user) => ({
    userId: user.id,
    name: user.name,
    username: user.username,
    avatarUrl: user.avatarUrl,
  }))
  const onSubmit = () => {
    if (userId && role) {
      if (create && addRole) {
        addRole({ userId, role })
      }
      if (!create && updateRole && user?.user?.id) {
        updateRole({ role, userId: user?.user?.id })
      }
    }
  }
  const roles = Object.values(AppUserRole)

  return (
    <>
      <Button onClick={onOpen}>{create ? 'Add User' : 'Edit'}</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg={bg}>
          <ModalHeader>{create ? 'Add User' : 'Edit User'}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {!user?.user && (
              <Form onSubmit={undefined as unknown as SubmitHandler<FieldValues>}>
                <ButtonGroup alignItems={'end'} w={'full'}>
                  <Field
                    w={'full'}
                    name="query"
                    label="Search Users"
                    type="string"
                    onBlur={(e: FocusEvent<HTMLInputElement>) => {
                      setTempQuery(e.target.value)
                    }}
                    rules={{ required: true }}
                  />
                  <Button onClick={() => setQuery(tempQuery)}>Search</Button>
                </ButtonGroup>
              </Form>
            )}
            {fetching && <WebUiLoader />}
            {!user?.user && userOptions?.length > 0 && (
              <Stack mt={4}>
                <Text px={2}>{userOptions?.length} users found...</Text>
                <List
                  items={[
                    ...userOptions.map((u) => ({
                      primary: <Text color={u.userId === userId ? 'primary.500' : undefined}>{u.name}</Text>,
                      secondary: u.username,
                      icon: <Avatar src={u.avatarUrl || ''} />,
                      onClick: () => setUserId(u.userId),
                    })),
                  ]}
                />
              </Stack>
            )}
            {userId && (
              <Stack pt={4} px={4}>
                <RadioGroup onChange={(val) => setRole(val as AppUserRole)} value={role}>
                  <Stack direction="row">
                    {roles.map((role) => (
                      <Radio key={role} value={role}>
                        {role}
                      </Radio>
                    ))}
                  </Stack>
                </RadioGroup>
              </Stack>
            )}
          </ModalBody>
          <ModalFooter>
            {(!user?.user || userId) && (
              <>
                <Button disabled={!userId || !role} colorScheme="purple" mr={3} onClick={onSubmit}>
                  {create ? 'Add' : 'Update'}
                </Button>
                <Button variant="ghost" onClick={onClose}>
                  Close
                </Button>
              </>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
