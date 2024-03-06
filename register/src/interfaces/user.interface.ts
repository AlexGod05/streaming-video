export interface User {
  username: string;
  password: string;
  birthDate: Date;
  indicative: string;
  phone: string;
  email: string;
  typeVerification: "SMS" | "EMAIL";
}
