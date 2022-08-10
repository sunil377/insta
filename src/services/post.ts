import {
  addDoc,
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  limit,
  Timestamp,
  updateDoc,
  where,
} from 'firebase/firestore'
import { firestore, getDocumentOnce, POST_DATABASE } from '../lib/firebase/firestore'
import { queryFor } from './util'

export interface PostWithoutId {
  userid: string
  username: string
  mediaPath: string
  caption: string
  comments: string[]
  likes: string[]
  createdAt?: Timestamp
}

export interface Post extends PostWithoutId {
  id: string
}

export function createPost({ createdAt = Timestamp.fromDate(new Date()), ...data }: PostWithoutId) {
  return addDoc(collection(firestore, POST_DATABASE), {
    createdAt,
    ...data,
  })
}

export async function getPost(docId: string) {
  return await getDocumentOnce<Post>(docId, POST_DATABASE)
}

export function getAllPosts(userId: string) {
  return queryFor<Post>(POST_DATABASE, where('userid', '!=', userId), limit(10))
}

export function updatePost(
  docId: string,
  field: 'likes' | 'comments',
  id: string,
  config: 'add' | 'remove',
) {
  switch (config) {
    case 'add':
      return updateDoc(doc(firestore, POST_DATABASE, docId), {
        [field]: arrayUnion(id),
      })
    case 'remove':
      return updateDoc(doc(firestore, POST_DATABASE, docId), {
        [field]: arrayRemove(id),
      })
  }
}
