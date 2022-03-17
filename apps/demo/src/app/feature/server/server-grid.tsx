import { EyeIcon, TrashIcon } from '@heroicons/react/outline'
import React from 'react'
import { Card } from 'react-daisyui'
import { ServerEntity } from '../../data-access/server'

export function ServerGrid({
  deleteServer,
  servers,
  showServer,
}: {
  deleteServer: (server: ServerEntity) => void
  servers: ServerEntity[]
  showServer: (server: ServerEntity) => void
}) {
  return (
    <div className="grid grid-cols-2 gap-6">
      {servers?.map((server) => (
        <Card key={server.id} className="bg-base-300">
          <Card.Body>
            <div className="flex justify-between items-center">
              <div className="flex flex-col space-y-2">
                <code>{server.name}</code>
                <span className="text-sm">{server.endpoint}</span>
              </div>
              <div className="flex space-x-2">
                <button onClick={() => showServer(server)}>
                  <EyeIcon className="w-6 h-6 text-gray-500" />
                </button>
                <button onClick={() => deleteServer(server)}>
                  <TrashIcon className="w-6 h-6 text-red-500" />
                </button>
              </div>
            </div>
          </Card.Body>
        </Card>
      ))}
    </div>
  )
}
