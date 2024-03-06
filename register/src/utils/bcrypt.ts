import { compare, hash } from "bcryptjs";

/**
 * Función para cifrar una contraseña utilizando bcryptjs.
 * @param password La contraseña a cifrar.
 * @returns Una promesa que se resuelve con el hash cifrado de la contraseña.
 */
const encrypt = async (password: string) => {
  const passwordHash = await hash(password, 8);
  return passwordHash;
};

/**
 * Función para verificar si una contraseña coincide con su hash cifrado utilizando bcryptjs.
 * @param password La contraseña a verificar.
 * @param passwordHash El hash cifrado de la contraseña.
 * @returns Una promesa que se resuelve con un valor booleano indicando si la contraseña es correcta.
 */
const verified = async (password: string, passwordHash: string) => {
  const isCorrect = await compare(password, passwordHash);
  return isCorrect;
};

export { encrypt, verified };
