import { Box, Collapse, Flex, Heading, Stack, Tag } from '@chakra-ui/react'
import { AppEnv, AppMint } from '@kin-kinetic/web/util/sdk'
import {
  IconButton,
  ListItemAction,
  ListItemButton,
  ListItemIcon,
  ListItemLabel,
  ListItemTertiary,
  useCollapse,
} from '@saas-ui/react'
import { GoChevronDown, GoChevronRight } from 'react-icons/go'
import { MdDelete } from 'react-icons/md'
import { WebAdminUiAppEnvSummary } from './web-admin-ui-app-env-summary'

export function WebAdminUiAppEnvListItem({
  appEnv,
  deleteAppEnv,
}: {
  appEnv: AppEnv
  deleteAppEnv: (appEnv: AppEnv) => void
}) {
  const { isOpen, getToggleProps, getCollapseProps, onToggle } = useCollapse({
    defaultIsOpen: false,
  })

  return (
    <Stack>
      <ListItemButton onClick={() => onToggle()}>
        <ListItemIcon as={isOpen ? GoChevronDown : GoChevronRight} />
        <ListItemLabel
          primary={
            <Heading size="md" {...getToggleProps()}>
              {appEnv.name}
            </Heading>
          }
          secondary={
            <Flex>
              {appEnv.mints?.length ? (
                appEnv.mints?.map((item: AppMint) => (
                  <Tag key={item?.id} size="sm" variant="subtle" colorScheme="primary">
                    {item?.mint?.name} ({item?.mint?.symbol})
                  </Tag>
                ))
              ) : (
                <Tag size="sm" variant="subtle" colorScheme="primary">
                  No Mints
                </Tag>
              )}
            </Flex>
          }
        />
        <ListItemTertiary alignItems="center" mr={12}>
          <Tag>{appEnv?.cluster?.type}</Tag>
        </ListItemTertiary>
        <ListItemAction>
          <IconButton onClick={() => deleteAppEnv(appEnv)} aria-label={'Delete Environment'} icon={<MdDelete />} />
        </ListItemAction>
      </ListItemButton>

      <Collapse {...getCollapseProps()}>
        <Box px={4} mx={4} borderWidth="1px" borderRadius="lg">
          <WebAdminUiAppEnvSummary appEnv={appEnv} />
        </Box>
      </Collapse>
    </Stack>
  )
}
