import { NextFunction, Request, Response } from "express";
import { validateEmail } from "./email.middleware";
import { validateIndicativePhone } from "./phone.middleware";
import { validateUsername } from "./username.middleware";
import { HttpResponse } from "../utils/response";

/**
 * Middleware para validar los campos requeridos según el medio de verificación (SMS o EMAIL).
 * Además, valida la seguridad de la contraseña y la edad mínima de 18 años para la fecha de nacimiento.
 * @param req La solicitud HTTP.
 * @param res La respuesta HTTP.
 * @param next La función de paso al siguiente middleware.
 */
const validateRegister = (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      typeVerification,
      username,
      indicative,
      phone,
      email,
      password,
      birthDate,
    } = req.body;
    validateUsername(username);
    if (!typeVerification) {
      return res
        .status(400)
        .json({ error: "No se ha ingresado el typeVerification" });
    } else if (typeVerification === "SMS") {
      if (!username || !indicative || !phone || !password || !birthDate) {
        return res.status(400).json({
          error:
            "Para la verificacion por SMS, se require los campos username, indicative, phone, password y birthDate",
        });
      }
      validateIndicativePhone(phone, indicative);
      req.body.payload = {
        username,
        indicative,
        phone,
        password,
        birthDate,
        typeVerification,
      };
    } else if (typeVerification === "EMAIL") {
      if (!username || !email || !password || !birthDate) {
        return res.status(400).json({
          error:
            "Para la verificación por EMAIL, se requieren los campos username, email, password y birthdate.",
        });
      }
      validateEmail(email);
      req.body.payload = {
        username,
        email,
        password,
        birthDate,
        typeVerification,
      };
    } else {
      return res.status(400).json({
        error:
          "El medio de verificación especificado no es válido, SMS o EMAIL",
      });
    }

    if (!isSecurePassword(password)) {
      return res.status(400).json({
        error:
          "La contraseña debe tener al menos 8 caracteres, contener al menos una letra minúscula, una letra mayúscula, un número y un carácter especial.",
      });
    }

    if (!isSecureBirthDate(birthDate)) {
      return res.status(400).json({
        error: "La fecha de nacimiento debe ser para mayores de 18 años.",
      });
    }

    next();
  } catch (error) {
    const statusCode = error instanceof Error ? 400 : 500;
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Error al procesar la solicitud en el middleware de Register";
    HttpResponse.sendErrorResponse(res, statusCode, errorMessage);
  }
};

/**
 * Función para validar la seguridad de la birthDate.
 * @param birthDate la fecha de nacimiento a validar.
 * @returns true si birthDate cumple con los criterios de seguridad, false de lo contrario.
 */
const isSecureBirthDate = (birthDate: string): boolean => {
  const eighteenYearsAgo = new Date();
  eighteenYearsAgo.setUTCFullYear(eighteenYearsAgo.getUTCFullYear() - 18);
  return new Date(birthDate) < eighteenYearsAgo;
};

/**
 * Función para validar la seguridad del password.
 * @param password La contraseña a validar.
 * @returns true si password cumple con los criterios de seguridad, false de lo contrario.
 */
const isSecurePassword = (password: string): boolean => {
  // Al menos 8 caracteres, una letra minúscula, una letra mayúscula, un número y un carácter especial
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&+-])[A-Za-z\d@$!%*?&+-]{8,}$/;
  return passwordRegex.test(password);
};

export { validateRegister };
