import { Spinner } from 'components/ui'
import { POST_DATABASE, USER_DATABASE } from 'lib/firebase/firestore'
import { useEffect } from 'react'
import useSnapShot from 'services/useSnapShot'

type docType<R> = R extends any ? R & { id: string } : never

interface Props<T> {
  docId: string
  RenderComponent: (arg: docType<T>) => JSX.Element | null
  docName: typeof USER_DATABASE | typeof POST_DATABASE
  error?: JSX.Element
}

function RenderDoc<T>({
  docId,
  RenderComponent,
  docName,
  error: err,
}: Props<T>) {
  const {
    data: responseData,
    snapShotRun,
    error,
    isError,
    isIdle,
    isLoading,
    isSuccess,
  } = useSnapShot<docType<T>>(docName)

  useEffect(() => snapShotRun(docId), [docId, snapShotRun])

  switch (true) {
    case isIdle:
    case isLoading:
      return <Spinner />

    case isError:
      if (err) return err
      return <div role="alert">{error && error.toString()}</div>

    case isSuccess:
      if (!responseData) return null
      return <RenderComponent key={responseData.id} {...responseData} />

    default:
      throw new Error('this should not be happend')
  }
}

export { RenderDoc }
