import { SmailySvg } from 'assets/svg'
import { Formik, Form, Field } from 'formik'
import { useCommentFormik } from './hooks'

function AddComment({ postId }: { postId: string }) {
  const { initialValues, onSubmit, validationSchema } = useCommentFormik()
  return (
    <div className="grid grid-cols-[32px,1fr] gap-x-1 border-t py-2">
      <button
        type="button"
        title="emoji"
        className="inline-grid aspect-square cursor-pointer place-items-center rounded outline-none focus-visible:ring-1 focus-visible:ring-black focus-visible:ring-opacity-75"
      >
        <SmailySvg />
      </button>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        validateOnMount={true}
        onSubmit={onSubmit(postId)}
      >
        {({ isSubmitting, isValid }) => {
          return (
            <Form className="grid grid-cols-[1fr,64px]">
              <Field name="comment" placeholder="Add A Comment..." className="outline-none" />
              <button
                type="submit"
                disabled={isSubmitting || !isValid}
                className=" cursor-pointer rounded border-0 font-bold text-blue-500 outline-none focus-visible:ring-1 focus-visible:ring-black focus-visible:ring-opacity-75 disabled:pointer-events-none disabled:opacity-50"
              >
                Post
              </button>
            </Form>
          )
        }}
      </Formik>
    </div>
  )
}

export { AddComment }
