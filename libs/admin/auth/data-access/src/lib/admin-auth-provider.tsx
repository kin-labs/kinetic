import {
  UserLoginInput,
  useLoginMutation,
  useLogoutMutation,
  useMeQuery,
  User,
} from '@kin-kinetic/shared/util/admin-sdk'
import React, { ReactNode, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export type AdminAuthLoginFn = (input: UserLoginInput) => Promise<boolean>
export type AdminAuthLogoutFn = () => Promise<boolean>

interface AdminAuthProps {
  login: AdminAuthLoginFn
  logout: AdminAuthLogoutFn
  loading: boolean
  user: User | undefined
}

const AdminAuthContext = React.createContext<AdminAuthProps>({} as AdminAuthProps)

const AdminAuthProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState<boolean>(true)
  const [user, setUser] = useState<User | undefined>()
  const navigate = useNavigate()

  const [, loginMutation] = useLoginMutation()
  const [, logoutMutation] = useLogoutMutation()
  const [{ data, error }, refreshMe] = useMeQuery({ pause: true })

  const login = async (input: UserLoginInput) => {
    setLoading(true)
    const result = await loginMutation({ input })
    setUser(result?.data?.login?.user)
    setLoading(false)
    return !!result.data?.login?.token
  }

  const logout = async () => {
    setUser(undefined)
    const result = await logoutMutation({})
    navigate('/')
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
