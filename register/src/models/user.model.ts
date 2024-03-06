import { Schema, model } from "mongoose";
import { User } from "../interfaces/user.interface";

const UserSchema = new Schema<User>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: false,
      unique: true,
    },
    indicative: {
      type: String,
      required: false,
    },
    phone: {
      type: String,
      required: false,
    },
    password: {
      type: String,
      required: true,
    },
    birthDate: {
      type: Date,
      required: true,
    },
    typeVerification: {
      type: String,
      required: true,
      enum: ["SMS", "EMAIL"],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const ModelUserSchema = model("users", UserSchema);

export { ModelUserSchema };
