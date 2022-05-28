import { LoginInput, useLoginMutation, useLogoutMutation, useMeQuery, User } from '@mogami/shared/util/admin-sdk'
import React, { ReactNode, useEffect, useState } from 'react'

export type AdminAuthLoginFn = (input: LoginInput) => Promise<boolean>
export type AdminAuthLogoutFn = () => Promise<boolean>

interface AdminAuthProps {
  login: AdminAuthLoginFn
  logout: AdminAuthLogoutFn
  loading: boolean
  user: User | undefined
}

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const AdminAuthContext = React.createContext<AdminAuthProps>(null!)

const AdminAuthProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState<boolean>(true)
  const [user, setUser] = useState<User | undefined>()

  const [, loginMutation] = useLoginMutation()
  const [, logoutMutation] = useLogoutMutation()
  const [{ data, error }, refreshMe] = useMeQuery({ pause: true })

  const login = async (input: LoginInput) => {
    setLoading(true)
    const result = await loginMutation({ input })
    setUser(result?.data?.login?.user)
    setLoading(false)
    return !!result.data?.login?.token
  }

  const logout = async () => {
    setUser(undefined)
    const result = await logoutMutation()
    return !!result.data?.logout
  }

  useEffect(() => {
    if (!loading || user) return
    refreshMe()
    if (error) {
      setUser(undefined)
      setLoading(false)
    }
    if (data?.me) {
      setUser(data.me)
      setLoading(false)
    }
  }, [data, error, loading, refreshMe, user])

  return <AdminAuthContext.Provider value={{ login, logout, loading, user }}>{children}</AdminAuthContext.Provider>
}

const useAdminAuth = () => {
  return React.useContext(AdminAuthContext)
}

export { useAdminAuth, AdminAuthProvider }
