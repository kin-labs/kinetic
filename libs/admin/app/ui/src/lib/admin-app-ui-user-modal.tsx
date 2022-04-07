import {
  Button,
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
  useDisclosure,
} from '@chakra-ui/react'
import { AutoComplete, AutoCompleteInput, AutoCompleteItem, AutoCompleteList } from '@choc-ui/chakra-autocomplete'
import { AppUser, AppUserRole, useUsersQuery } from '@mogami/shared/util/admin-sdk'
import React from 'react'

export function AdminAppUiUserModal({
  addRole,
  updateRole,
  user,
}: {
  addRole?: ({ role, userId }: { role: AppUserRole; userId: string }) => void
  updateRole?: ({ role, appUserId }: { role: AppUserRole; appUserId: string }) => void
  user?: AppUser | null | undefined
}) {
  const create = !user?.user
  const [userId, setUserId] = React.useState<string | undefined>(user?.user?.id)
  const [role, setRole] = React.useState<AppUserRole>(user?.role || AppUserRole.Member)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [{ data: userData }] = useUsersQuery()

  const userOptions = (userData?.items || []).map((user) => ({ userId: user.id, name: user.name }))
  const onSubmit = () => {
    if (userId && role) {
      if (create && addRole) {
        addRole({ userId, role })
      }
      if (!create && updateRole && user) {
        updateRole({ role, appUserId: user.id })
      }
    }
  }
  const roles = Object.values(AppUserRole)

  return (
    <>
      <Button size={create ? 'md' : 'xs'} onClick={onOpen}>
        {create ? 'Add User' : 'Edit'}
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{create ? 'Add User' : 'Edit User'}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <RadioGroup onChange={(val) => setRole(val as AppUserRole)} value={role}>
              <Stack direction="row">
                {roles.map((role) => (
                  <Radio key={role} value={role}>
                    {role}
                  </Radio>
                ))}
              </Stack>
            </RadioGroup>
          </ModalBody>
          {!user?.user && (
            <ModalBody>
              <AutoComplete rollNavigation value={userId} onChange={(e) => setUserId(e)}>
                <AutoCompleteInput variant="filled" placeholder="Search..." autoFocus />
                <AutoCompleteList>
                  {userOptions.map((option, oid) => (
                    <AutoCompleteItem key={`option-${oid}`} value={option.userId} textTransform="capitalize">
                      {option.name}
                    </AutoCompleteItem>
                  ))}
                </AutoCompleteList>
              </AutoComplete>
            </ModalBody>
          )}
          <ModalFooter>
            <Button disabled={!userId || !role} colorScheme="teal" mr={3} onClick={onSubmit}>
              {create ? 'Add' : 'Update'}
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
