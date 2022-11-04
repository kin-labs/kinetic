import { Avatar, Flex, Tag } from '@chakra-ui/react'
import { AppUser, UserEmail } from '@kin-kinetic/web/util/sdk'
import { ListItemButton, ListItemIcon, ListItemLabel, ListItemTertiary } from '@saas-ui/react'
import { Link } from 'react-router-dom'

export function WebAdminUiAppUserListItem({ appUser }: { appUser: AppUser }) {
  return (
    <ListItemButton as={Link} to={`/admin/users/${appUser?.user?.id}`} key={appUser?.id}>
      <ListItemIcon>
        <Avatar name={appUser?.user?.name || appUser?.user?.username} src={appUser?.user?.avatarUrl || ''} />
      </ListItemIcon>
      <ListItemLabel
        primary={appUser?.user?.name || appUser?.user?.username}
        secondary={
          <Flex>
            {appUser.user?.emails?.length ? (
              appUser.user?.emails?.map((item: UserEmail) => (
                <Tag key={item?.id} size="sm" variant="subtle" colorScheme="primary">
                  {item?.email}
                </Tag>
              ))
            ) : (
              <Tag size="sm" variant="subtle" colorScheme="primary">
                No Emails
              </Tag>
            )}
          </Flex>
        }
      />
      <ListItemTertiary>
        <Tag>{appUser?.role}</Tag>
      </ListItemTertiary>
    </ListItemButton>
  )
}
