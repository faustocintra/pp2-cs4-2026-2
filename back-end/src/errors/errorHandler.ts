import type { ErrorRequestHandler } from 'express';
import { Prisma } from '../../generated/prisma/client.js';
import { AppError } from './AppError.js';

export const errorHandler: ErrorRequestHandler = (error, _req, res, _next) => {
  if (error instanceof AppError) {
    res.status(error.statusCode).json({ error: error.message });
  } else if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
    res.status(409).json({ error: 'Documento ou e-mail já cadastrado.' });
  } else if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
    res.status(404).json({ error: 'Customer não encontrado.' });
  } else if (error instanceof Prisma.PrismaClientValidationError || error.type === 'entity.parse.failed') {
    res.status(400).json({ error: 'Dados da requisição inválidos.' });
  } else {
    res.status(500).json({ error: 'Erro interno ao processar a requisição.' });
  }
};
