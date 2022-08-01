import {
  arrayRemove,
  arrayUnion,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore'
import { firestore, USER_DATABASE } from 'lib/firebase/firestore'
import { queryFor } from './util'

export interface UserWithoutId {
  username: string
  fullName: string
  email: string
  profile: string | null
  followers: string[]
  following: string[]
  posts: string[]
  saved: string[]
}

export interface User extends UserWithoutId {
  id: string
}

export function createUser(docId: string, data: UserWithoutId) {
  return setDoc(doc(firestore, USER_DATABASE, docId), data)
}

export async function getUser(docId: string) {
  const document = await getDoc(doc(firestore, USER_DATABASE, docId))
  return document.exists()
    ? ({ ...document.data(), id: document.id } as User)
    : Promise.reject(`document doesn't exists`)
}

export function getAllUserByUsername(username: string) {
  return queryFor<User>(USER_DATABASE, where('username', '==', username))
}

export function updateUser(
  docId: string,
  field: 'posts' | 'saved' | 'following' | 'followers',
  value: string,
  config: 'add' | 'remove',
) {
  switch (config) {
    case 'add':
      return updateDoc(doc(firestore, USER_DATABASE, docId), {
        [field]: arrayUnion(value),
      })
    case 'remove':
      return updateDoc(doc(firestore, USER_DATABASE, docId), {
        [field]: arrayRemove(value),
      })
    default:
      throw new Error('invalid config in updateUser')
  }
}

export function updateUserProfile(docId: string, imgURL: string) {
  return updateDoc(doc(firestore, USER_DATABASE, docId), {
    profile: imgURL,
  })
}
