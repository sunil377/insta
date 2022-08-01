import { useSafeAuthContext } from 'context/AuthContext'
import { uploadProfile } from 'lib/firebase/storage'
import { ChangeEvent } from 'react'
import { Post, updatePost } from 'services/post'
import { updateUser, updateUserProfile } from 'services/user'

const isTrue = (arg: boolean) => (arg ? 'remove' : 'add')

function useActionFollowing(followerId: string) {
  const { id, following } = useSafeAuthContext()
  const isFollowings = following.includes(followerId)
  const toggleFollowing = async () => {
    await updateUser(id, 'following', followerId, isTrue(isFollowings))
    await updateUser(followerId, 'followers', id, isTrue(isFollowings))
  }
  return {
    isFollowings,
    toggleFollowing,
  }
}

function useActionButton(post: Post) {
  const { id, saved } = useSafeAuthContext()
  const isSaved = saved.includes(post.id)
  const isLiked = post.likes.includes(id)
  const followingAction = useActionFollowing(post.userid)

  const toggleLike = () => updatePost(post.id, 'likes', id, isTrue(isLiked))
  const toggleSaved = () => updateUser(id, 'saved', post.id, isTrue(isSaved))

  return {
    isSaved,
    isLiked,
    toggleLike,
    toggleSaved,
    ...followingAction,
  }
}

function useUploadProfile() {
  const { id } = useSafeAuthContext()

  const handleUpload = async ({ target }: ChangeEvent<HTMLInputElement>) => {
    const files = target.files
    if (!files) return

    const file = files[0]
    const {
      metadata: { fullPath },
    } = await uploadProfile(id, file)
    return await updateUserProfile(id, fullPath)
  }

  return handleUpload
}

export { useActionButton, useUploadProfile, useActionFollowing }
