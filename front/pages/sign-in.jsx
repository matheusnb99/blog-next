import { AppContext } from "@/components/AppContext"
import Button from "@/components/Button"
import FormField from "@/components/FormField"
import NavBar from "@/components/NavBar"
import { makeClient } from "@/services/api"
import { Formik } from "formik"
import { Router } from "next/router"
import { useCallback, useContext, useState } from "react"
import * as yup from "yup"

const validationSchema = yup.object().shape({
  email: yup.string().email().required().label("E-mail"),
  password: yup.string().min(8).required().label("Password"),
})

const initialValues = {
  email: "",
  password: "",
}

const SignInPage = () => {
  const [error, setError] = useState([])
  const { saveJWT } = useContext(AppContext)
  const handleFormSubmit = useCallback(async ({ email, password }) => {
    setError(null)

    try {
      const {
        data: { jwt },
      } = await makeClient().post("/sign-in", { email, password })
      console.log(jwt)

      if (!jwt) {
        throw new Error("Missing JWT.")
      }

      saveJWT(jwt)
      await Router.push("/")
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
            {error ? (
              <p className="bg-red-600 text-white front-bold px-4 py-2">
                {error}
              </p>
            ) : null}
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

export default SignInPage
