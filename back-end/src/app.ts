import express, { json, urlencoded } from 'express'
import cookieParser from 'cookie-parser'
import logger from 'morgan'

import indexRouter from './routes/index'
import usersRouter from './routes/users'
import customersRouter from './routes/customers'
import carsRouter from './routes/cars'

import cors from 'cors'

const app = express()

// Define origines permitidas com fallback para localhost em desenvolvimento
const allowedOrigins = process.env.ALLOWED_ORIGINS 
  ? process.env.ALLOWED_ORIGINS.split(',') 
  : ['http://localhost:5173']

app.use(cors({
 origin: allowedOrigins,
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

export default app