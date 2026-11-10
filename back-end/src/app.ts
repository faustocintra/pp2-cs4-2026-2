import express, { json, urlencoded } from 'express'
import cookieParser from 'cookie-parser'
import logger from 'morgan'


import indexRouter from './routes/index'
import usersRouter from './routes/users'
import customersRouter from './routes/customers'
import carsRouter from './routes/cars'
import { errorHandler } from './errors/errorHandler'

import cors from 'cors'

const app = express()

app.use(cors({
 origin: (process.env.ALLOWED_ORIGINS ?? '')
  .split(',')
  .map((origin) => origin.trim())
  .filter((origin) => origin.length > 0),
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
app.use('/api/customers', customersRouter)
app.use('/api/cars', carsRouter)

app.use(errorHandler)

export default app