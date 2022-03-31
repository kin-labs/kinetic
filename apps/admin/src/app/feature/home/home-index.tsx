import { useUptimeQuery } from '@mogami/shared/util/admin-sdk'
import React from 'react'
import { Hero } from 'react-daisyui'
import { Link } from 'react-router-dom'

export function HomeIndex() {
  const [{ data }] = useUptimeQuery()
  const pages = [{ label: 'About', path: '/about' }]
  return (
    <div>
      <Hero>
        <Hero.Overlay className="bg-opacity-60" />
        <Hero.Content className="text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">Hello there!</h1>
            <p className="py-6">For now, this is just a placeholder!</p>
            <div className="flex space-x-2 justify-center">
              {pages?.map(({ label, path }) => (
                <div key={path}>
                  <Link className="btn btn-primary" to={path}>
                    {label}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </Hero.Content>
      </Hero>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  )
}
