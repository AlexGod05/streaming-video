import { Request, Response } from "express";
import {
  serviceRegister,
  serviceValidateEmail,
  serviceValidateIndicativePhone,
  serviceValidateUsername,
} from "../services/register.service";
import { HttpResponse } from "../utils/response";

/**
 * Controlador para validar el nombre de usuario.
 * @param req La solicitud HTTP.
 * @param res La respuesta HTTP.
 */
const controllerValidateUsername = async (req: Request, res: Response) => {
  try {
    await serviceValidateUsername(req, res);
  } catch (error) {
    const statusCode = error instanceof Error ? 400 : 500;
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Error al procesar la solicitud en el controlador de validateUsername";
    HttpResponse.sendErrorResponse(res, statusCode, errorMessage);
  }
};

/**
 * Controlador para validar el email del usuario
 * @param req La solicitud HTTP.
 * @param res La respuesta HTTP.
 */
const controllerValidateEmail = async (req: Request, res: Response) => {
  try {
    await serviceValidateEmail(req, res);
  } catch (error) {
    const statusCode = error instanceof Error ? 400 : 500;
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Error al procesar la solicitud en el controlador de validateEmail";
    HttpResponse.sendErrorResponse(res, statusCode, errorMessage);
  }
};

/**
 * Controlador para validar el indicativePhone del usuario
 * @param req La solicitud HTTP.
 * @param res La respuesta HTTP.
 */
const controllerValidateIndicativePhone = async (
  req: Request,
  res: Response
) => {
  try {
    await serviceValidateIndicativePhone(req, res);
  } catch (error) {
    const statusCode = error instanceof Error ? 400 : 500;
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Error al procesar la solicitud en el controlador de validateIndicativePhone";
    HttpResponse.sendErrorResponse(res, statusCode, errorMessage);
  }
};

/**
 * Controlador para el registro del usuario
 * @param req La solicitud HTTP.
 * @param res La respuesta HTTP.
 */
const controllerRegister = async (req: Request, res: Response) => {
  try {
    await serviceRegister(req, res);
  } catch (error) {
    const statusCode = error instanceof Error ? 400 : 500;
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Error al procesar la solicitud en el controlador de Register";
    HttpResponse.sendErrorResponse(res, statusCode, errorMessage);
  }
};

export {
  controllerValidateUsername,
  controllerValidateEmail,
  controllerValidateIndicativePhone,
  controllerRegister,
};
