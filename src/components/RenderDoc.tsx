import { Spinner } from 'components/ui'
import { POST_DATABASE, USER_DATABASE } from 'lib/firebase/firestore'
import { docType } from 'lib/firebase/util'
import { useEffect } from 'react'
import useSnapShot from 'services/useSnapShot'

interface Props<T> {
  docId: string
  RenderComponent: (arg: docType<T>) => JSX.Element | null
  docName: typeof USER_DATABASE | typeof POST_DATABASE
  error?: JSX.Element
}

function RenderDoc<T>({ docId, RenderComponent, docName, error: err }: Props<T>) {
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
      return (
        <div className="inline-grid h-full w-full place-items-center">
          <Spinner />
        </div>
      )

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
