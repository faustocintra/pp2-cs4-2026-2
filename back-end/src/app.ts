import express, { json, urlencoded } from 'express'
import cookieParser from 'cookie-parser'
import logger from 'morgan'

import indexRouter from './routes/index.js'
import usersRouter from './routes/users.js'
import customersRouter from './routes/customers.js'
import carsRouter from './routes/cars.js'
import { errorHandler } from './middlewares/errorHandler.js'
import { NotFoundError } from './errors/NotFoundError.js'
import cors from 'cors'

const app = express()

// Libera o acesso do front-end (origens separadas por vírgula em ALLOWED_ORIGINS)
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(',') || [],
}))

app.use(logger('dev'))
app.use(json())
app.use(urlencoded({ extended: false }))
app.use(cookieParser())

app.use('/', indexRouter)
app.use('/users', usersRouter)
app.use('/customers', customersRouter)
app.use('/cars', carsRouter)
app.use((_req, _res, next) => next(new NotFoundError()))
app.use(errorHandler)

export default app
