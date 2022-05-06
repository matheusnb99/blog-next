import { createContext, useCallback, useEffect, useState } from "react"

export const AppContext = createContext(null)

export const AppContextProvider = (props) => {
  const [jwt, setJWT] = useState(null)
  const saveJWT = useCallback((jwt) => {
    localStorage.setItem("session_jwt", jwt)
  }, [])

  useEffect(() => {
    const jwt = localStorage.getItem("session_jwt")

    setJWT(jwt)
  }, [])

  return <AppContext.Provider {...props} value={{ saveJWT, jwt }} />
}
