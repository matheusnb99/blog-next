import cors from "cors"
import express, { json } from "express"
import knex from "knex"
import { Model } from "objection"
import config from "./src/config.js"
import knexfile from "./src/db/knexfile.js"
import commentsRoute from "./src/routes/comments.js"
import postsRoute from "./src/routes/posts.js"
import securityRoute from "./src/routes/security.js"
import usersRoute from "./src/routes/users.js"

const app = express()
const db = knex(knexfile)

Model.knex(db)

app.use(json())
app.use(cors())

usersRoute({ app })
postsRoute({ app })
// commentRoute({ app })
securityRoute({ app })
commentsRoute({ app })

// eslint-disable-next-line no-console
app.listen(config.port, () => console.log(`Listening on : ${config.port}`))
