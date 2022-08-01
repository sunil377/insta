import { useSafeAuthContext } from 'context/AuthContext'
import { uploadPostMedia } from 'lib/firebase/storage'
import { useCallback } from 'react'
import { createPost } from 'services/post'
import { updateUser } from 'services/user'

function useCreatePost(file: File) {
  const { id, username } = useSafeAuthContext()

  return useCallback(
    (caption: string) =>
      uploadPostMedia(id, file).then(({ metadata: { fullPath } }) => {
        return createPost({
          mediaPath: fullPath,
          userid: id,
          username,
          caption,
          likes: [],
          comments: [],
        }).then(({ id: postId }) => {
          return updateUser(id, 'posts', postId, 'add')
        })
      }),
    [file, id, username],
  )
}

export { useCreatePost }
