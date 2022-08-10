import { doc, getDoc, getFirestore } from 'firebase/firestore'
import { firebaseApp } from './app'
import { docType } from './util'

const firestore = getFirestore(firebaseApp)
const USER_DATABASE = 'user'
const POST_DATABASE = 'post'
const COMMENT_DATABASE = 'comment'

export type databaseType = typeof USER_DATABASE | typeof POST_DATABASE | typeof COMMENT_DATABASE

async function getDocumentOnce<T>(docId: string, document: databaseType) {
  const responseDoc = await getDoc(doc(firestore, document, docId))
  if (responseDoc.exists()) {
    return { id: docId, ...responseDoc.data() } as docType<T>
  } else {
    return Promise.reject("document don't exists")
  }
}

export { firestore, POST_DATABASE, USER_DATABASE, COMMENT_DATABASE, getDocumentOnce }
