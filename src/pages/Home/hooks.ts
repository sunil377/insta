import { useSafeAuthContext } from 'context/AuthContext'
import { FormikHelpers } from 'formik'
import { createComment } from 'services/comment'
import { updatePost } from 'services/post'
import * as yup from 'yup'

function useCommentFormik() {
  const authUser = useSafeAuthContext()
  const initialValues = {
    comment: '',
  }

  const validationSchema = () => {
    return yup.object({
      comment: yup.string().required(),
    })
  }

  const onSubmit =
    (postId: string) =>
    async (
      values: typeof initialValues,
      { setSubmitting, resetForm }: FormikHelpers<typeof initialValues>,
    ) => {
      const { id: commentId } = await createComment(
        values.comment,
        postId,
        authUser.id,
        authUser.username,
      )
      await updatePost(postId, 'comments', commentId, 'add')
      setSubmitting(false)
      resetForm()
    }

  return {
    initialValues,
    validationSchema,
    onSubmit,
  }
}

export { useCommentFormik }
