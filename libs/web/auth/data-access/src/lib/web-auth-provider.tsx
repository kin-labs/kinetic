import { useLoginMutation, useLogoutMutation, useMeQuery, User, UserLoginInput } from '@kin-kinetic/web/util/sdk'
import { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

export interface WebAuthProviderContext {
  loading: boolean
  loggedIn: boolean
  login: (input: UserLoginInput) => Promise<User | undefined>
  logout: () => Promise<void>
  user: User | undefined
}

const WebAuthProviderContext = createContext<WebAuthProviderContext>({} as WebAuthProviderContext)
function WebAuthProvider({ children }: { children: ReactNode }) {
  const location = useLocation()
  const [loading, setLoading] = useState(true)
  const [{ data, fetching }, refresh] = useMeQuery()
  const [, loginMutation] = useLoginMutation()
  const [, logoutMutation] = useLogoutMutation()
  const [user, setUser] = useState<User | undefined>(undefined)

  useEffect(() => {
    if (fetching || !data) return
    if (data?.me) {
      setUser(data.me)
    }
    setLoading(false)
  }, [fetching, data])

  const login = async (input: UserLoginInput) => {
    return loginMutation({ input }).then(async (res) => {
      if (res.error) {
        return Promise.reject(res.error)
      }
      await refresh()
      return res.data?.login?.user
    })
  }

  const logout = async () => {
    await logoutMutation({})
    await refresh()
    setUser(undefined)
    location.pathname = '/'
  }

  const value = {
    loading,
    loggedIn: !!data?.me,
    login,
    logout,
    user,
  }
  return <WebAuthProviderContext.Provider value={value}>{children}</WebAuthProviderContext.Provider>
}

const useWebAuth = () => useContext(WebAuthProviderContext)

export { WebAuthProvider, useWebAuth }
