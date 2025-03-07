import { UserRepository } from "./user.repository";
import { Meta } from "../../interfaces/meta.interface";

export class UserService {
  static async register(fullname: string, institution: string, username: string, password: string): Promise<Meta> {
    if (!fullname || !institution || !username || !password) {
      throw new Error("Todos los campos son obligatorios");
    }

    try {
      const newUser = await UserRepository.registerUser(fullname, institution, username, password);
      return {
        success: true,
        message: "Usuario registrado correctamente",
        data: newUser,
      };
    } catch (error: any) {
      throw new Error("Error al registrar el usuario: " + error.message);
    }
  }

  static async login(username: string, password: string): Promise<Meta> {
    if (!username || !password) {
      throw new Error("Usuario y contraseña son obligatorios");
    }

    try {
      const user = await UserRepository.loginUser(username, password);
      if (!user) {
        throw new Error("Credenciales incorrectas");
      }
      console.log(user);
      return {
        success: true,
        message: "Login exitoso",
        data: { id_usuario: user.id_usuario },
      };
    } catch (error: any) {
      throw new Error("Error en el login: " + error.message);
    }
  }

  static async checkUserExists(username: string): Promise<Meta> {
    if (!username) {
      throw new Error("El username es obligatorio");
    }

    try {
      const user = await UserRepository.findUserByUsername(username);
      return {
        success: true,
        message: user ? "El usuario existe" : "El usuario no existe",
        data: { ...user },
      };
    } catch (error: any) {
      throw new Error("Error al buscar el usuario: " + error.message);
    }
  }

   // Actualiza la contraseña de un usuario por ID
   static async updatePassword(userId: number, newPassword: string): Promise<Meta> {
    if (!userId || !newPassword) {
      throw new Error("El ID de usuario y la nueva contraseña son obligatorios");
    }

    try {
      const updated = await UserRepository.updatePassword(userId, newPassword);
      if (!updated) {
        throw new Error("No se pudo actualizar la contraseña");
      }

      return {
        success: true,
        message: "Contraseña actualizada correctamente",
      };
    } catch (error: any) {
      throw new Error("Error al actualizar la contraseña: " + error.message);
    }
  }

  
}
