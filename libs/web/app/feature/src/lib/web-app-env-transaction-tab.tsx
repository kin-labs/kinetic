import { WebUiAlert } from '@kin-kinetic/web/ui/alert'
import { WebUiLoader } from '@kin-kinetic/web/ui/loader'
import { WebUiPageFull } from '@kin-kinetic/web/ui/page'
import { App, AppEnv, TransactionStatus, useUserTransactionQuery } from '@kin-kinetic/web/util/sdk'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { WebTransactionDetail } from './web-transaction-detail'

export function WebAppEnvTransactionTab({ app, env }: { app: App; env: AppEnv }) {
  const { transactionId } = useParams<{ transactionId: string }>()
  const [{ data, fetching, error }, refresh] = useUserTransactionQuery({
    variables: {
      appId: app.id,
      appEnvId: env.id,
      transactionId: transactionId || '',
    },
  })

  useEffect(() => {
    if (
      !fetching &&
      !error &&
      data?.item?.status &&
      ![TransactionStatus.Failed, TransactionStatus.Finalized].includes(data?.item?.status)
    ) {
      const id = setTimeout(() => refresh(), 5000)
      return () => clearTimeout(id)
    }
    return
  }, [fetching, refresh])

  if (error) {
    return <WebUiAlert status={'error'} message={error.message} />
  }
  if (fetching && !data?.item) {
    return <WebUiLoader />
  }
  return (
    <WebUiPageFull title={'Back to transactions'} to="../transactions">
      {data?.item ? (
        <WebTransactionDetail env={env} transaction={data.item} />
      ) : (
        <WebUiAlert status={'info'} message={'Transaction Not Found'} />
      )}
    </WebUiPageFull>
  )
}
