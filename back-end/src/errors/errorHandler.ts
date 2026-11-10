import type { ErrorRequestHandler } from "express";

import { AppError } from "./AppError";

interface ApiError extends Error {
  code?: string;
  meta?: {
    target?: unknown;
  };
  type?: string;
}

function isApiError(error: unknown): error is ApiError {
  return error instanceof Error;
}

function getUniqueConstraintMessage(target: unknown): string {
  const fields = Array.isArray(target)
    ? target.join(" ")
    : typeof target === "string"
      ? target
      : "";

  if (fields.includes("ident_document")) {
    return "Já existe um cliente cadastrado com este CPF.";
  }

  if (fields.includes("email")) {
    return "Já existe um cliente cadastrado com este e-mail.";
  }

  return "Já existe um registro com esses dados.";
}

export const errorHandler: ErrorRequestHandler = (
  error: unknown,
  _req,
  res,
  _next
) => {
  if (error instanceof AppError) {
    res.status(error.statusCode).json({ message: error.message });
    return;
  }

  if (isApiError(error)) {
    if (error.type === "entity.parse.failed") {
      res.status(400).json({ message: "O corpo da requisição não é um JSON válido." });
      return;
    }

    switch (error.code) {
      case "P2000":
        res.status(400).json({
          message: "Um dos campos informados excede o tamanho permitido.",
        });
        return;
      case "P2002":
        res.status(409).json({
          message: getUniqueConstraintMessage(error.meta?.target),
        });
        return;
      case "P2003":
        res.status(409).json({
          message: "Este registro está relacionado a outros dados e não pode ser removido.",
        });
        return;
      case "P2025":
        res.status(404).json({ message: "Registro não encontrado." });
        return;
    }
  }

  console.error("Erro não tratado na API:", error);
  res.status(500).json({ message: "Erro interno ao processar a requisição." });
};
