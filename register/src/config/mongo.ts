import "dotenv/config";
import { connect } from "mongoose";

/**
 * Función asincrónica para conectar a la base de datos MongoDB utilizando Mongoose.
 * Lee la URI de la base de datos desde las variables de entorno.
 */
async function dbConnect(): Promise<void> {
  const DB_URI = <string>process.env.DB_URI;
  await connect(DB_URI);
}

export default dbConnect;
