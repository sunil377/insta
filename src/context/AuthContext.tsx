import { Spinner } from 'components/ui'
import { User } from 'firebase/auth'
import { onAuthListener } from 'lib/firebase/auth'
import { createContext, useContext, useEffect, useState } from 'react'
import { User as AuthorType } from 'services/user'
import useSnapShot from 'services/useSnapShot'

const AuthContext = createContext<AuthorType | null>(null)

function useAuthContext() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error(`context is used outside of AuthContext Provider`)
  }
  return context
}

function useSafeAuthContext() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error(`user is not authorized to access this page`)
  }
  return context
}

function AuthProvider({ ...props }) {
  const {
    data: state,
    snapShotRun,
    error,
    isLoading,
    isIdle,
    isError,
    isSuccess,
  } = useSnapShot<AuthorType>('user')
  const [user, setUser] = useState<User | null>(null)
  const [isPending, setPending] = useState(true)

  useEffect(() => {
    if (isPending) return
    return snapShotRun(user?.uid)
  }, [snapShotRun, user, isPending])

  useEffect(() => {
    return onAuthListener(user => {
      setUser(user)
      setPending(false)
    })
  }, [])

  switch (true) {
    case isIdle:
    case isLoading:
      return <Spinner fullScreen={true} />
    case isError:
      return <h1>something wrong {error?.toString()}</h1>
    case isSuccess:
      return <AuthContext.Provider value={state} {...props} />
    default:
      throw new Error('this should not happend')
  }
}

export { useAuthContext, AuthProvider, useSafeAuthContext }
