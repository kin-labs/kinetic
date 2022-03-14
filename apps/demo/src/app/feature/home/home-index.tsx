import React from 'react'
import { Link } from 'react-router-dom'

export function HomeIndex() {
  const pages = [
    { label: 'Keypair', path: '/keypair' },
    { label: 'SDK', path: '/sdk' },
  ]
  return (
    <div>
      <div className="flex space-x-6">
        {pages?.map(({ label, path }) => (
          <div key={path}>
            <Link className="btn btn-wide" to={path}>
              {label}
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}
