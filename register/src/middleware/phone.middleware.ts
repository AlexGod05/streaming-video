import { NextFunction, Request, Response } from "express";
import { HttpResponse } from "../utils/response";

/**
 * Middleware para validar el formato del número de celular con indicativo.
 * @param req La solicitud HTTP.
 * @param res La respuesta HTTP.
 * @param next La función de paso al siguiente middleware.
 */
const middlewareValidateIndicativePhone = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const phone = req.query.phone as string;
    const indicative = req.query.indicative as string;
    validateIndicativePhone(phone, indicative);

    next();
  } catch (error) {
    const statusCode = error instanceof Error ? 400 : 500;
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Error al procesar la solicitud en el middleware de validateIndicativePhone";
    HttpResponse.sendErrorResponse(res, statusCode, errorMessage);
  }
};

const validateIndicativePhone = (phone: string, indicative: string) => {
  if (!phone || typeof phone !== "string") {
    throw new Error('El parámetro "phone" es requerido y debe ser una cadena.');
  }

  if (!indicative || typeof indicative !== "string") {
    throw new Error(
      'El parámetro "indicative" es requerido y debe ser una cadena.'
    );
  }

  const phoneRegex = /^[0-9]{9,14}$/;

  if (!phoneRegex.test(phone)) {
    throw new Error(
      "El número de teléfono proporcionado no tiene un formato válido. Debe contener entre 9 y 14 dígitos."
    );
  }

  const indicativeRegex = /^\+[0-9]{1,3}$/;

  if (!indicativeRegex.test(indicative)) {
    throw new Error(
      'El indicativo proporcionado no tiene un formato válido. Debe comenzar con un signo "+" seguido de entre 1 y 3 dígitos.'
    );
  }

  const indicativePhone = indicative + phone;

  const phoneNumberRegex = /^\+(?:[0-9]{1,3})?[0-9]{9,14}$/;

  if (!phoneNumberRegex.test(indicativePhone)) {
    throw new Error(
      "El número de celular proporcionado no tiene un formato válido. Debe contener un indicativo de país y de 10 a 15 dígitos en total."
    );
  }
};

export { middlewareValidateIndicativePhone, validateIndicativePhone };
