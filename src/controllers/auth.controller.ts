import { Request, Response } from "express";
import { register } from "../services/auth.service";

const registerController = (req: Request, res: Response) => {
  try {
    // ! Configurar los responses para no mandar todo los erroes a la consola (Pero ya guarda y hashea)

    const user = req.body;
    const response = register(user);
    res.status(201).json(response);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(400).json({ message: "An unknown error occurred" });
    }
  }
};

const loginController = (req: Request, res: Response) => {
  try {
    const { body } = req;

    res.send(body);
    res.json("login!");
  } catch (error) {
    res.status(500);
    res.send("ERROR_LOGIN");
  }
};

export { registerController, loginController };
