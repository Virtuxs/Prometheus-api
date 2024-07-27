import { Prisma, User } from "@prisma/client";
import prisma from "../models/prisma";
import bcrypt from "bcrypt";

const register = async (data: Prisma.UserCreateInput): Promise<User> => {
  const {
    document,
    firstName,
    lastName,
    phoneNumber,
    profilePicture,
    email,
    password,
    role,
  } = data;

  // * Falta:
  // Que el email sea valido (formato)
  // Que el documento sea valido (numerico entero, con min y max longitudes)
  // Que el umero de telefono sean numeros y permita el + solo al inicio
  // Inyectar las dependencias

  const existingEmail = await prisma.user.findUnique({ where: { email } });
  if (existingEmail) {
    throw new Error("This email already exists."); // * Poner los mensajes en un archivo de constantes
  }

  const existingDocument = await prisma.user.findUnique({ where: { document } });
  if (existingDocument) {
    throw new Error("This document number already exists."); // * Poner los mensajes en un archivo de constantes
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await prisma.user.create({
    data: {
      document,
      firstName,
      lastName,
      phoneNumber,
      profilePicture,
      email,
      password: hashedPassword,
      role,
    },
  });

  return newUser;  
};

export { register };