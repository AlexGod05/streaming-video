import { Request, Response } from "express";
import { User } from "../interfaces/user.interface";
import { ModelUserSchema } from "../models/user.model";
import { HttpResponse } from "../utils/response";
import { Model } from "mongoose";
import { encrypt } from "../utils/bcrypt";

/**
 * Servicio para validar si un nombre de usuario ya existe en la base de datos.
 * @param username El nombre de usuario a validar.
 * @returns True si el nombre de usuario no existe en la base de datos, False si existe.
 */
const serviceValidateUsername = async (req: Request, res: Response) => {
  try {
    const username = req.query.username as string;
    const isUsernameAvailable = await findUserWithUsername(username);
    const responseMessage = isUsernameAvailable
      ? "El nombre de usuario no esta disponible"
      : "El nombre de usuario esta disponible";

    HttpResponse.sendSuccessResponse(res, 200, responseMessage, {
      isUsernameAvailable: !isUsernameAvailable,
    });
  } catch (error) {
    const statusCode = error instanceof Error ? 400 : 500;
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Error al procesar la solicitud en el servicio de validateUsername";
    HttpResponse.sendErrorResponse(res, statusCode, errorMessage);
  }
};

/**
 * Servicio para validar si un email ya existe en la base de datos.
 * @param email El correo a validar.
 * @returns True si el email no existe en la base de datos, False si existe.
 */
const serviceValidateEmail = async (req: Request, res: Response) => {
  try {
    const email = req.query.email as string;
    const isEmailAvailable = await findUserWithEmail(email);
    const responseMessage = isEmailAvailable
      ? "El correo no esta disponible"
      : "El correo esta diponible";

    HttpResponse.sendSuccessResponse(res, 200, responseMessage, {
      isEmailAvailable: !isEmailAvailable,
    });
  } catch (error) {
    const statusCode = error instanceof Error ? 400 : 500;
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Error al procesar la solicitud en el servicio de validateEmail";
    HttpResponse.sendErrorResponse(res, statusCode, errorMessage);
  }
};

/**
 * Servicio para validar si un indicativePhone ya existe en la base de datos.
 * @param indicative El indicativo del pais del celular a validar.
 * @param phone El numero del celular a validar.
 * @returns True si el indicativePhone no existe en la base de datos, False si existe.
 */
const serviceValidateIndicativePhone = async (req: Request, res: Response) => {
  try {
    const phone = req.query.phone as string;
    const indicative = req.query.indicative as string;
    const isIndicativePhoneAvailable = await findUserWithIndicativePhone(
      phone,
      indicative
    );
    const responseMessage = isIndicativePhoneAvailable
      ? "El indicativo más el número de celular no están disponibles"
      : "El indicativo más el número de celular están disponibles";

    HttpResponse.sendSuccessResponse(res, 200, responseMessage, {
      isIndicativePhoneAvailable: !isIndicativePhoneAvailable,
    });
  } catch (error) {
    const statusCode = error instanceof Error ? 400 : 500;
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Error al procesar la solicitud en el servicio de validateIndicativePhone";
    HttpResponse.sendErrorResponse(res, statusCode, errorMessage);
  }
};

/**
 * Servicio para registrar un usuario en la base de datos.
 * @param req Objeto de solicitud HTTP.
 * @param res Objeto de respuesta HTTP.
 */
const serviceRegister = async (req: Request, res: Response) => {
  try {
    const { payload } = req.body;
    const { typeVerification, username, email, indicative, phone, password } =
      payload;

    await validateUsernameAvailability(username);
    await validateEmailOrIndicativePhone(
      typeVerification,
      phone,
      indicative,
      email
    );
    payload.password = await encrypt(password);
    await createUser(payload);
    HttpResponse.sendSuccessResponse(
      res,
      200,
      "Usuario registrado correctamente."
    );
  } catch (error) {
    const statusCode = error instanceof Error ? 400 : 500;
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Error al procesar la solicitud en el servicio de register";
    HttpResponse.sendErrorResponse(res, statusCode, errorMessage);
  }
};

/**
 * Valida si el username ya está registrado en la base de datos.
 * @param username El nombre de usuario a validar.
 * @throws Error si el username ya existe en la base de datos.
 */
const validateUsernameAvailability = async (username: string) => {
  const user = await findUserWithUsername(username);
  if (user) {
    throw new Error("El nombre de usuario ya está en uso.");
  }
};

/**
 * Valida el email o el indicativePhone según el tipo de verificación.
 * @param typeVerification El tipo de verificación ('SMS' o 'EMAIL').
 * @param phone El número de teléfono a validar.
 * @param indicative El indicativo del país del teléfono.
 * @param email El correo electrónico a validar.
 * @throws Error si el email o el indicativePhone no están disponibles.
 */
const validateEmailOrIndicativePhone = async (
  typeVerification: string,
  phone: string,
  indicative: string,
  email: string
) => {
  if (typeVerification === "SMS") {
    await validateIndicativePhoneAvailability(phone, indicative);
  } else if (typeVerification === "EMAIL") {
    await validateEmailAvailability(email);
  }
};

/**
 * Valida si el indicativePhone ya está registrado en la base de datos.
 * @param phone El número de teléfono a validar.
 * @param indicative El indicativo del país del teléfono.
 * @throws Error si el indicativePhone ya existe en la base de datos.
 */
const validateIndicativePhoneAvailability = async (
  phone: string,
  indicative: string
) => {
  const user = await findUserWithIndicativePhone(phone, indicative);
  if (user) {
    throw new Error("El número de teléfono ya está en uso.");
  }
};

/**
 * Valida si el email ya está registrado en la base de datos.
 * @param email El correo electrónico a validar.
 * @throws Error si el email ya existe en la base de datos.
 */
const validateEmailAvailability = async (email: string) => {
  const user = await findUserWithEmail(email);
  if (user) {
    throw new Error("El correo electrónico ya está en uso.");
  }
};

/**
 * Crea un nuevo usuario en la base de datos.
 * @param payload Los datos del usuario a crear.
 */
const createUser = async (payload: any) => {
  await ModelUserSchema.create(payload);
};

/**
 * Busca un usuario en la base de datos utilizando el número de teléfono y el indicativo específicos.
 * @param phone El número de teléfono a buscar.
 * @param indicative El indicativo asociado al número de teléfono.
 * @returns Una promesa que se resuelve con el usuario encontrado o null si no se encuentra ninguno.
 */
const findUserWithIndicativePhone = async (
  phone: string,
  indicative: string
): Promise<User | null> => {
  return await ModelUserSchema.findOne({ phone, indicative });
};

/**
 * Busca un usuario en la base de datos utilizando su dirección de correo electrónico.
 * @param email La dirección de correo electrónico del usuario a buscar.
 * @returns Una promesa que se resuelve con el usuario encontrado o null si no se encuentra ninguno.
 */
const findUserWithEmail = async (email: string): Promise<User | null> => {
  return await ModelUserSchema.findOne({ email });
};

/**
 * Busca un usuario en la base de datos utilizando su nombre de usuario.
 * @param username Nombre de usuario del usuario a buscar.
 * @returns Una promesa que se resuelve con el usuario encontrado o null si no se encuentra ninguno.
 */
const findUserWithUsername = async (username: string): Promise<User | null> => {
  return await ModelUserSchema.findOne({ username });
};

export {
  serviceValidateUsername,
  serviceValidateEmail,
  serviceValidateIndicativePhone,
  serviceRegister,
};
