import { Flex, Tag } from '@chakra-ui/react'
import { WebUiAlert } from '@kin-kinetic/web/ui/alert'
import { WebUiCard } from '@kin-kinetic/web/ui/card'
import { AppEnv, AppMint } from '@kin-kinetic/web/util/sdk'
import { IconButton, List } from '@saas-ui/react'
import { MdDelete } from 'react-icons/md'

export function WebAdminFeatureAppEnvironments({
  appEns,
  deleteAppEnv,
}: {
  appEns: AppEnv[]
  deleteAppEnv: (env: AppEnv) => void
}) {
  if (!appEns?.length) {
    return (
      <WebUiCard>
        <WebUiAlert message={'This app has no environments.'} />
      </WebUiCard>
    )
  }

  return (
    <List
      items={appEns?.map((env) => ({
        href: '#',
        primary: env?.cluster?.name,
        secondary: (
          <Flex>
            {!env.mints?.length && (
              <Tag size="sm" variant="subtle" colorScheme="primary">
                No Mints
              </Tag>
            )}
            {env.mints?.map((item: AppMint) => (
              <Tag key={item?.id} size="sm" variant="subtle" colorScheme="primary">
                {item?.mint?.name}
              </Tag>
            ))}
          </Flex>
        ),
        tertiary: <Tag>{env?.cluster?.type}</Tag>,
        action: <IconButton onClick={() => deleteAppEnv(env)} aria-label={'Delete Environment'} icon={<MdDelete />} />,
      }))}
    />
  )
}
