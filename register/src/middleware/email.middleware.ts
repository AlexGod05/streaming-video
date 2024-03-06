import { NextFunction, Request, Response } from "express";
import { HttpResponse } from "../utils/response";

/**
 * Middleware para validar el formato del email.
 * @param req La solicitud HTTP.
 * @param res La respuesta HTTP.
 * @param next La función de paso al siguiente middleware.
 */
const middlewareValidateEmail = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const email = req.query.email as string;
    validateEmail(email);
    next();
  } catch (error) {
    const statusCode = error instanceof Error ? 400 : 500;
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Error al procesar la solicitud en el middleware de validateEmail";
    HttpResponse.sendErrorResponse(res, statusCode, errorMessage);
  }
};

const validateEmail = (email: string) => {
  if (!email || typeof email !== "string") {
    throw new Error('El parametro "email" es requerido y debe ser una cadena');
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new Error(
      "El correo electrónico proporcionado no tiene un formato válido."
    );
  }
};

export { middlewareValidateEmail, validateEmail };
