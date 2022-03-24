import { Sdk } from '@mogami/sdk'
import { useLiveQuery } from 'dexie-react-hooks'
import React, { useState } from 'react'
import { Button, Navbar } from 'react-daisyui'
import { keypairDb, KeypairEntity } from '../../data-access/keypair'
import { serverDb, ServerEntity } from '../../data-access/server'
import { UiAlert } from '../../ui/ui-alert/ui-alert'
import { KeypairDropdown } from '../keypair/keypair-dropdown'
import { ServerDropdown } from '../server/server-dropdown'
import { SdkControlPanel } from './sdk-control-panel'

export function SdkIndex() {
  const [loading, setLoading] = useState(true)
  const [keypair, setKeypair] = useState<KeypairEntity | null>(null)
  const [server, setServer] = useState<ServerEntity | null>(null)
  const [sdk, setSdk] = useState<Sdk | null>(null)

  const keypairs = useLiveQuery(() =>
    keypairDb.keypair.toArray().then((res) => {
      if (res.length) {
        selectKeypair(res[0])
      }
      setLoading(false)
      return res
    }),
  )

  const servers = useLiveQuery(() =>
    serverDb.server.toArray().then((res) => {
      if (res.length) {
        selectServer(res[0])
      }
      setLoading(false)
      return res
    }),
  )

  const selectKeypair = (keypair: KeypairEntity) => {
    setLoading(true)
    setTimeout(() => {
      setKeypair(() => keypair)
      setLoading(false)
    }, 10)
  }

  const selectServer = (server: ServerEntity) => {
    Sdk.setup({ endpoint: server.endpoint })
      .then((sdk) => {
        setSdk(sdk)
        setServer(server)
      })
      .catch((err) => {
        console.log('An error occurred:', err)
      })
  }

  if (loading) {
    return <div>Loading...</div>
  }

  if (!keypairs || !keypairs?.length || !keypair) {
    return (
      <UiAlert
        cyData="card-sdk-warning"
        status="warning"
        title="No Keypairs configured."
        message="Add a new one on the Keypair page."
      />
    )
  }

  if (!servers || !servers?.length) {
    return (
      <UiAlert
        cyData="card-sdk-warning"
        status="warning"
        title="No Servers configured."
        message="Add a new one on the Servers page."
      />
    )
  }

  return (
    <div className="flex flex-col space-y-6">
      <Navbar className="shadow-lg bg-neutral text-neutral-content rounded-box">
        <Navbar.Start>
          <Button color="ghost" disabled>
            {server?.name}
          </Button>
        </Navbar.Start>
        <Navbar.End>
          <KeypairDropdown selected={keypair} setKeypair={selectKeypair} keypairs={keypairs} />
          <ServerDropdown setServer={selectServer} servers={servers} />
        </Navbar.End>
      </Navbar>

      {sdk ? (
        <SdkControlPanel keypair={keypair} sdk={sdk} />
      ) : (
        <UiAlert status="error" message={'No SDK configured.'} />
      )}
    </div>
  )
}
