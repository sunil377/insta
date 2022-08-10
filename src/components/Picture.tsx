import { useAsync } from 'hooks/useAsync'
import { getMediaURL } from 'lib/firebase/storage'
import { useEffect, useRef } from 'react'
import { Image } from 'util/type'
import { Spinner } from './ui'

function Picture({ path, ...props }: Image & { path: string }) {
  const { data, run, isIdle, isLoading, isError, error, isSuccess } = useAsync<string>()

  const imgRef = useRef(document.createElement('img'))

  useEffect(() => {
    const { current } = imgRef
    const handleLoad = () => run(Promise.resolve(current.src))

    async function main() {
      const url = await getMediaURL(path)
      current.addEventListener('load', handleLoad)
      current.src = url
    }
    main()

    return () => current.removeEventListener('load', handleLoad)
  }, [path, run])

  switch (true) {
    case isIdle:
    case isLoading:
      return (
        <div className="inline-grid h-full w-full place-items-center">
          <Spinner />
        </div>
      )
    case isError:
      return <p role="alert">{error?.toString()}</p>
    case isSuccess:
      if (!data) return null
      // eslint-disable-next-line jsx-a11y/alt-text
      return <img src={data} {...props} />
    default:
      throw new Error("this can't happen")
  }
}

export { Picture }
