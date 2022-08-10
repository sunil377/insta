import { useSafeAuthContext } from 'context/AuthContext'
import { useAsync } from 'hooks/useAsync'
import { uploadPostMedia } from 'lib/firebase/storage'
import { useCallback, useEffect, useState } from 'react'
import { createPost } from 'services/post'
import { updateUser } from 'services/user'

function useCreatePost(file: File) {
  const { id, username } = useSafeAuthContext()
  const [isLoading, setLoading] = useState(false)

  const handleCreatingPost = useCallback(
    (caption: string) => {
      setLoading(true)
      return uploadPostMedia(id, file).then(({ metadata: { fullPath } }) => {
        return createPost({
          mediaPath: fullPath,
          userid: id,
          username,
          caption,
          likes: [],
          comments: [],
        }).then(({ id: postId }) => {
          return updateUser(id, 'posts', postId, 'add').then(() => setLoading(false))
        })
      })
    },
    [file, id, username],
  )

  return {
    isLoading,
    handleCreatingPost,
  }
}

function useBase64(file: File) {
  const { data: base64, run, ...rest } = useAsync<string | ArrayBuffer>()

  const handleLoadListener = useCallback(
    ({ target }: ProgressEvent<FileReader>) => {
      const result = target?.result
      result ? run(Promise.resolve(result)) : run(Promise.reject('error during converting file'))
    },
    [run],
  )

  const handleErrorListener = useCallback(
    (ev: ProgressEvent<FileReader>) => {
      run(Promise.reject(`error during uploading file`))
    },
    [run],
  )

  useEffect(() => {
    const fileReader = new FileReader()
    fileReader.addEventListener('load', handleLoadListener)
    fileReader.addEventListener('error', handleErrorListener)
    fileReader.readAsDataURL(file)

    return function cleanup() {
      fileReader.removeEventListener('load', handleLoadListener)
      fileReader.removeEventListener('error', handleErrorListener)
    }
  }, [handleLoadListener, handleErrorListener, file])

  return {
    base64,
    ...rest,
  }
}

export { useCreatePost, useBase64 }
