import Button from "@/components/Button"
import FormField from "@/components/FormField"
import TextArea from "@/components/TextArea"
import { makeClient } from "@/services/api"
import { Formik } from "formik"
import { useCallback } from "react"

const initialValues = {
  email: "",
  password: "",
}

const AddComment = (props) => {
  const { postId, userId } = props

  const handleFormSubmit = useCallback(
    async ({ content }) => {
      await makeClient().post("/comments", {
        content,
        postId,
        userId,
      })
    },
    [postId, userId]
  )

  return (
    <Formik initialValues={initialValues} onSubmit={handleFormSubmit}>
      {({ handleSubmit, isSubmitting, isValid }) => (
        <form className="flex gap-x-2" onSubmit={handleSubmit}>
          <FormField name="content" as={TextArea} />
          <Button
            disabled={isSubmitting && !isValid}
            className="w-auto self-center"
            type="submit"
          >
            Send
          </Button>
        </form>
      )}
    </Formik>
  )
}

export default AddComment
