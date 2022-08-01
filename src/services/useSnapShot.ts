import { doc, onSnapshot } from 'firebase/firestore'
import { useAsync } from 'hooks/useAsync'
import { firestore, POST_DATABASE, USER_DATABASE } from 'lib/firebase/firestore'
import { useCallback } from 'react'

export default function useSnapShot<T>(
  database: typeof USER_DATABASE | typeof POST_DATABASE,
) {
  const { run, ...rest } = useAsync<T>()

  const snapShotRun = useCallback(
    (docId?: string | null) => {
      if (!docId) {
        return run(Promise.resolve('no user found'))
      }
      return onSnapshot(
        doc(firestore, database, docId),
        document =>
          document.exists()
            ? run(Promise.resolve({ ...document.data(), id: document.id }))
            : run(Promise.reject("document don't exists")),
        err => {
          run(Promise.reject(err.message))
        },
      )
    },
    [database, run],
  )

  return { snapShotRun, ...rest }
}
