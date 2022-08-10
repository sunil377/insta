import { addDoc, collection, Timestamp } from 'firebase/firestore'
import { COMMENT_DATABASE, firestore } from 'lib/firebase/firestore'

export interface ICommentWithoutId {
  title: string
  postId: string
  userId: string
  username: string
  createdAt?: Timestamp
}

export interface IComment extends ICommentWithoutId {
  id: string
}

export function createComment(
  title: string,
  postId: string,
  userId: string,
  username: string,
  createdAt = Timestamp.fromDate(new Date()),
) {
  return addDoc(collection(firestore, COMMENT_DATABASE), {
    title,
    username,
    postId,
    userId,
    createdAt,
  })
}
