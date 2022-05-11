import jsonwebtoken from "jsonwebtoken"
import config from "../config.js"
import UserModel from "../db/models/UserModel.js"
import hashPassword from "../hashPassword.js"

export const security_signin = async (req, res) => {
  const {
    body: { email, password },
  } = req

  const user = await UserModel.query().findOne({ email })

  if (!user) {
    res.status(401).send({ error: "invalid email or password" })

    return
  }

  const [passwordHash] = hashPassword(password, user.passwordSalt)

  if (passwordHash !== user.passwordHash) {
    res.status(401).send({ error: "invalid email or password" })

    return
  }

  const jwt = jsonwebtoken.sign({ payload: { userId: user.id } }, config.security.session.secret, {
    expiresIn: config.security.session.expiresIn,
  })
  res.send({ jwt })
}

export const security_signup = async (req, res) => {
  const {
    body: { email, password },
  } = req

  const userExists = await UserModel.query().findOne("email", email)

  if (userExists) {
    res.status(403).send({ error: "invalid email or password" })

    return
  }

  const [passwordHash, passwordSalt] = hashPassword(password)
  const user = await UserModel.query().insertAndFetch({
    email,
    passwordHash,
    passwordSalt,
    role_id: 1,
  })

  const jwt = jsonwebtoken.sign({ payload: { userId: user.id } }, config.security.session.secret, {
    expiresIn: config.security.session.expiresIn,
  })
  res.send({ jwt })
}
