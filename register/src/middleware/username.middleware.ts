import { NextFunction, Request, Response } from "express";
import { HttpResponse } from "../utils/response";

/**
 * Middleware para validar el formato del username.
 * @param req La solicitud HTTP.
 * @param res La respuesta HTTP.
 * @param next La función de paso al siguiente middleware.
 */
const middlewareValidateUsername = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const username = req.query.username as string;
    validateUsername(username);
    next();
  } catch (error) {
    const statusCode = error instanceof Error ? 400 : 500;
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Error al procesar la solicitud en el middleware de validateUsername";
    HttpResponse.sendErrorResponse(res, statusCode, errorMessage);
  }
};

const validateUsername = (username: string) => {
  if (!username || typeof username !== "string") {
    throw new Error(
      'El parametro "username" es requerido y debe ser una cadena.'
    );
  }

  if (username.length < 4 || username.length > 25) {
    throw new Error("El nombre de usuario debe tener entre 4 y 25 caracteres.");
  }
};

export { middlewareValidateUsername, validateUsername };
