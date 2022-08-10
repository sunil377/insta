import { useAsync } from 'hooks/useAsync'
import { databaseType, getDocumentOnce } from 'lib/firebase/firestore'
import { useEffect } from 'react'

function RenderDocOnce<T>({
  docId,
  database,
  renderDoc: RenderDoc,
}: {
  docId: string
  database: databaseType
  renderDoc: (props: T) => JSX.Element | null
}) {
  const { data: responseUser, run } = useAsync<T>()

  useEffect(() => {
    run(getDocumentOnce(docId, database))
  }, [run, docId, database])

  return responseUser ? <RenderDoc {...responseUser} /> : null
}

export { RenderDocOnce }
