import { AppContext } from "@/components/AppContext"
import Button from "@/components/Button"
import FormField from "@/components/FormField"
import NavBar from "@/components/NavBar"
import { makeClient } from "@/services/api"
import { Formik } from "formik"
import { useCallback, useContext, useState } from "react"
import * as yup from "yup"

const validationSchema = yup.object().shape({
  firstName: yup.string().required().label("First Name"),
  lastName: yup.string().required().label("Last Name"),
  birthDate: yup.date().required().label("Birth date"),
  email: yup.string().email().required().label("E-mail"),
  password: yup.string().min(8).required().label("Password"),
})

const initialValues = {
  firstName: "",
  lastName: "",
  birthDate: "",
  email: "",
  password: "",
}

const SignUpPage = () => {
  const [error, setError] = useState([])
  const { saveJWT } = useContext(AppContext)
  const handleFormSubmit = useCallback(async ({ email, password }) => {
    console.log(email)

    setError(null)

    try {
      const { data } = await makeClient().post("/sign-up", { email, password })
      console.log(data)

      if (!data) {
        throw new Error("Missing JWT.")
      }
    } catch (err) {
      const { response: { data, status } = {} } = err

      if (!status) {
        console.log("error js")

        return
      }

      if (data.error) {
        setError(data.error)

        return
      }

      setError("Oops, something went wrong.")
    }
  }, [])

  return (
    <>
      <NavBar />
      <Formik
        validationSchema={validationSchema}
        initialValues={initialValues}
        onSubmit={handleFormSubmit}
      >
        {({ handleSubmit, isSubmitting, isValid }) => (
          <form onSubmit={handleSubmit}>
            <FormField name="firstName" type="text" label="First Name" />
            <FormField name="lastName" type="text" label="Last Name" />
            <FormField name="birthDate" type="date" label="Birth Date" />
            <FormField name="email" type="email" label="E-mail" />
            <FormField name="password" type="password" label="Password" />
            <Button type="submit" disabled={isSubmitting || !isValid}>
              Sign in
            </Button>
          </form>
        )}
      </Formik>
    </>
  )
}

export default SignUpPage
