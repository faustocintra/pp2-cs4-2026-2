import type { ErrorRequestHandler } from 'express'
import { AppError } from '../errors/AppError.js'
import { Prisma } from '../../generated/prisma/client.js'

export const errorHandler: ErrorRequestHandler = (error, _req, res, _next) => {
  if (error instanceof AppError) {
    res.status(error.statusCode).json({ message: error.message })
    return
  }
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === 'P2002') {
      res
        .status(409)
        .json({ message: 'Documento de identidade ou e-mail já cadastrado.' })
      return
    }
    if (error.code === 'P2003') {
      res
        .status(400)
        .json({ message: 'Registro relacionado inexistente (customer_id não corresponde a um cliente).' })
      return
    }
    if (error.code === 'P2025') {
      res.status(404).json({ message: 'Customer não encontrado.' })
      return
    }
    if (['P2000', 'P2006', 'P2007', 'P2011'].includes(error.code)) {
      res.status(400).json({ message: 'Dados de cliente inválidos.' })
      return
    }
  }
  if (
    error instanceof Prisma.PrismaClientValidationError ||
    error?.type === 'entity.parse.failed'
  ) {
    res.status(400).json({ message: 'Dados de cliente ou JSON inválidos.' })
    return
  }
  console.error(error)
  res.status(500).json({ message: 'Erro interno do servidor.' })
}
