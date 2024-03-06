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

router.get(
  "/validate-username",
  middlewareValidateUsername,
  controllerValidateUsername
);

router.get("/validate-email", middlewareValidateEmail, controllerValidateEmail);

router.get(
  "/validate-indicative-phone",
  middlewareValidateIndicativePhone,
  controllerValidateIndicativePhone
);

router.post("/register", validateRegister, controllerRegister);

export { router };
