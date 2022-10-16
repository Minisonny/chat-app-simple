import express from 'express'
import { createServer } from 'http'
import usersRouter from './routes/user'
import chatRouter from './routes/chat'
import createSocketServer from './socket'
import initializeDb from './models'
import authRouter from './routes/auth'
import { authenticateJWT } from './middlewares/authentication'
import cors from 'cors'

export const app = express()
const server = createServer(app)

let ready = false

initializeDb()

app.use(express.json())
app.use(cors())
app.use('/auth', authRouter)
app.use('/users', authenticateJWT, usersRouter)
app.use('/threads', authenticateJWT, chatRouter)
app.get('/health', (_req, res) => {
  res.status(ready ? 204 : 404).send()
})

const io = createSocketServer(server)
app.set('socketServer', io)

server.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`)
  ready = true
})
