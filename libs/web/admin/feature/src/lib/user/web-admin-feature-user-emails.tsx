import { WebAdminUiUserEmailTable } from '@kin-kinetic/web/admin/ui'
import { UserEmail } from '@kin-kinetic/web/util/admin-sdk'
import { Maybe } from 'graphql/jsutils/Maybe'

export function WebAdminFeatureUserEmails({ emails }: { emails: Maybe<UserEmail[]> }) {
  return <WebAdminUiUserEmailTable emails={emails || []} />
}
