import { Router } from "express";
import {
  controllerRegister,
  controllerValidateEmail,
  controllerValidateIndicativePhone,
  controllerValidateUsername,
} from "../controllers/register.controller";
import { middlewareValidateUsername } from "../middleware/username.middleware";
import { middlewareValidateEmail } from "../middleware/email.middleware";
import { middlewareValidateIndicativePhone } from "../middleware/phone.middleware";
import { validateRegister } from "../middleware/register.middleware";

const router = Router();
/**
 * @swagger
 * components:
 *  schemas:
 *    UserEmail:
 *      type: object
 *      properties:
 *        username:
 *          type: string
 *          description: nombre del usuario.
 *        email:
 *          type: string
 *          description: correo electronico del usaurio.
 *        password:
 *          type: string
 *          description: contraseña del usuario
 *        birthDate:
 *          type: string
 *          format: date
 *          description: Fecha de nacimiento del usuario en el formato YYYY-MM-DD.
 *        typeVerification:
 *          type: string
 *          enum: [EMAIL]
 *          description: Tipo de verificación (EMAIL).
 *      required:
 *        - username
 *        - email
 *        - password
 *        - birthDate
 *        - typeVerification
 *      example:
 *        username: 'AlexGod05'
 *        email: 'lozanocardona200938@gmail.com'
 *        password: 'Prueba2020+-'
 *        birthDate: '05-05-1999'
 *        typeVerification: 'EMAIL'
 *
 *    UserSMS:
 *      type: object
 *      properties:
 *        username:
 *          type: string
 *          description: nombre del usuario.
 *        indicative:
 *          type: string
 *          description: indicativo del pais del numero del celular del usuario.
 *        phone:
 *          type: string
 *          description: numero del celular del usuario.
 *        password:
 *          type: string
 *          description: contraseña del usuario
 *        birthDate:
 *          type: string
 *          format: date
 *          description: Fecha de nacimiento del usuario en el formato YYYY-MM-DD.
 *        typeVerification:
 *          type: string
 *          enum: [SMS]
 *          description: Tipo de verificación (SMS).
 *      required:
 *        - username
 *        - indicative
 *        - phone
 *        - password
 *        - birthDate
 *        - typeVerification
 *      example:
 *        username: 'AlexGod05'
 *        indicative: '+57'
 *        phone: '3014128547'
 *        password: 'Prueba2020+-'
 *        birthDate: '05-05-1999'
 *        typeVerification: 'SMS'
 *
 */

/**
 * @swagger
 * /api/auth/validate-username:
 *  get:
 *    summary: Validar disponibilidad del nombre del usuario
 *    tags: [Register]
 *    parameters:
 *      - in: query
 *        name: username
 *        required: true
 *        description: nombre de usuario a verificar
 *        type: string
 *        example: 'AlexGod05'
 *    responses:
 *      200:
 *        description: El nombre de usuario esta disponible.
 *      400:
 *        description: Error de validación de datos de entrada.
 *      500:
 *        description: Error interno del servidor.
 *
 */
router.get(
  "/validate-username",
  middlewareValidateUsername,
  controllerValidateUsername
);

/**
 * @swagger
 * /api/auth/validate-email:
 *  get:
 *    summary: Validar disponibilidad del correo electronico
 *    tags: [Register]
 *    parameters:
 *      - in: query
 *        name: email
 *        required: true
 *        description: correo electronico del usuario
 *        type: string
 *        example: 'lozanocardona200938@gmail.com'
 *    responses:
 *      200:
 *        description: El correo electronico esta disponible.
 *      400:
 *        description: Error de validación de datos de entrada.
 *      500:
 *        description: Error interno del servidor.
 *
 */
router.get("/validate-email", middlewareValidateEmail, controllerValidateEmail);

/**
 * @swagger
 * /api/auth/validate-indicative-phone:
 *  get:
 *    summary: Validar disponibilidad del celular con indicativo
 *    tags: [Register]
 *    parameters:
 *      - in: query
 *        name: phone
 *        required: true
 *        description: Numero del celular del usuario
 *        type: string
 *        example: '3014128547'
 *      - in: query
 *        name: indicative
 *        required: true
 *        description: Indicativo del celular del usuario
 *        type: string
 *        example: '+57'
 *    responses:
 *      200:
 *        description: El correo electronico esta disponible.
 *      400:
 *        description: Error de validación de datos de entrada.
 *      500:
 *        description: Error interno del servidor.
 *
 */
router.get(
  "/validate-indicative-phone",
  middlewareValidateIndicativePhone,
  controllerValidateIndicativePhone
);

/**
 * @swagger
 * /api/auth/register:
 *  post:
 *    summary: Registrar nuevo usuario
 *    tags: [Register]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            oneOf:
 *              - $ref: '#/components/schemas/UserEmail'
 *              - $ref: '#/components/schemas/UserSMS'
 *    responses:
 *      200:
 *        description: Usuario registrado correctamente.
 *      400:
 *        description: Error de validación de datos de entrada.
 *      500:
 *        description: Error interno del servidor.
 *
 */
router.post("/register", validateRegister, controllerRegister);

export default router;
