import express, { json, urlencoded } from 'express'
import cookieParser from 'cookie-parser'
import logger from 'morgan'


import indexRouter from './routes/index'
import usersRouter from './routes/users'
import customersRouter from './routes/customers'
import carsRouter from './routes/cars'
import { AppError } from './errors/AppError'



import cors from 'cors'


const app = express()

app.use(cors({
 origin: process.env.ALLOWED_ORIGINS.split(','),
}))



app.use(logger('dev'))
app.use(json())
app.use(urlencoded({ extended: false }))
app.use(cookieParser())


/***************** ROTAS *************************/


app.use('/', indexRouter)
app.use('/users', usersRouter)


app.use('/customers', customersRouter)
app.use('/cars', carsRouter)

app.use((error: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  if (error instanceof AppError) {
    res.status(error.statusCode).json({ message: error.message })
    return
  }

  console.error(error)
  res.status(500).json({ message: 'Erro interno do servidor.' })
})

export default app
