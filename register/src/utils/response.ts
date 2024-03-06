import { Response } from "express";

interface ApiResponse {
  status: number;
  message: string;
  data?: any;
}

export class HttpResponse {
  /**
   * Método privado para enviar una respuesta HTTP.
   * @param res El objeto de respuesta de Express.
   * @param status El estado HTTP de la respuesta.
   * @param message El mensaje de la respuesta.
   * @param data Los datos opcionales de la respuesta.
   */
  private static sendResponse(
    res: Response,
    status: number,
    message: string,
    data?: any
  ) {
    if (!res) {
      console.error(
        "No se pudo enviar la respuesta. Objeto de respuesta no válido."
      );
      return;
    }

    if (!Number.isInteger(status) || status < 100 || status > 599) {
      console.error("No se pudo enviar la respuesta. Estado HTTP no válido.");
      return;
    }

    const response: ApiResponse = {
      status,
      message,
      data,
    };
    res.status(status).json(response);
  }

  /**
   * Método estático para enviar una respuesta de éxito.
   * @param res El objeto de respuesta de Express.
   * @param status El estado HTTP de la respuesta.
   * @param message El mensaje de éxito.
   * @param data Los datos opcionales de la respuesta.
   */
  static sendSuccessResponse(
    res: Response,
    status: number,
    message: string,
    data?: any
  ) {
    HttpResponse.sendResponse(res, status, message, data);
  }

  /**
   * Método estático para enviar una respuesta de error.
   * @param res El objeto de respuesta de Express.
   * @param status El estado HTTP de la respuesta.
   * @param message El mensaje de error o el objeto Error.
   */
  static sendErrorResponse(
    res: Response,
    status: number,
    message: string | Error
  ) {
    let errorMessage: string;
    if (message instanceof Error) {
      errorMessage = message.message;
    } else if (typeof message === "string" && message.trim() !== "") {
      errorMessage = message.trim();
    } else {
      console.error(
        "No se pudo enviar la respuesta de error. Mensaje no válido."
      );
      return;
    }

    HttpResponse.sendResponse(res, status, errorMessage);
  }
}
