import { ModalDismissButton } from 'components/modal'
import { Spinner } from 'components/ui'
import { useSafeAuthContext } from 'context/AuthContext'
import { useBase64 } from 'hooks/useBase64'
import { useChangeInput } from 'hooks/useChangeInput'
import { useCreatePost } from './hooks'

export default function AddCaption({ file }: AddCaptionProps) {
  const authUser = useSafeAuthContext()
  const [caption, handleCaption] = useChangeInput()
  const handleCreatingPost = useCreatePost(file)
  const { base64, isSuccess } = useBase64(file)

  return (
    <section className="w-[75vw] sm:w-[50vw] h-[75vh]">
      <div className="flex justify-between px-3 py-2 border-b border-gray-300">
        <ModalDismissButton>arrowleft</ModalDismissButton>
        <h3 className="text-center">create new post</h3>
        <ModalDismissButton
          className="text-primary-main text-sm"
          onClick={() => handleCreatingPost(caption)}
        >
          Share
        </ModalDismissButton>
      </div>
      <div className="grid grid-cols-2 ">
        <div className="px-4 bg-gray-50 border-r border-gray-300">
          {isSuccess ? (
            <img
              src={base64?.toString()}
              alt={file.name}
              className="max-h-[280px] mx-auto"
            />
          ) : (
            <Spinner />
          )}
        </div>
        <div className="bg-white">
          <div className="flex gap-2">
            <img src="" alt="" />
            <h4 className="text-sm">{authUser.email}</h4>
          </div>
          <hr className="border-gray-300 my-1.5" />
          <div className="px-2">
            <textarea
              className="text-sm w-full px-2 py-0.5"
              rows={5}
              value={caption}
              onChange={handleCaption}
              placeholder="write caption..."
            />
          </div>
          <hr className="border-gray-300 my-1.5" />
        </div>
      </div>
    </section>
  )
}

interface AddCaptionProps {
  file: File
}
