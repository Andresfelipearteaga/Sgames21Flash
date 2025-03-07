import pool from '../../config/db';

export class UserRepository {
  static async registerUser(fullname: string, institution: string, username: string, password: string) {
    const query = `INSERT INTO usuario (nombre_completo, institucion, nombre_usuario, contraseña) VALUES ($1, $2, $3, $4) RETURNING id_usuario`;
    const values = [fullname, institution, username, password];

    const client = await pool.connect();
    try {
      const result = await client.query(query, values);
      return result.rows[0];
    } finally {
      client.release();
    }
  }
  static async loginUser(username: string, password: string) {
    const query = `SELECT id_usuario FROM usuario WHERE nombre_usuario = $1 AND contraseña = $2`;
    const values = [username, password];

    const client = await pool.connect();
    try {
      const result = await client.query(query, values);
      return result.rows[0];
    } finally {
      client.release();
    }

  }
  static async findUserByUsername(username: string) {
    const query = `SELECT id_usuario FROM usuario WHERE nombre_usuario = $1`;
    const values = [username];

    const client = await pool.connect();
    try {
      const result = await client.query(query, values);
      console.log(result);
      return result.rows[0]; // Retorna { id: valor } si existe, sino undefined
    } finally {
      client.release();
    }
  }

  // Actualizar contraseña por ID de usuario
  static async updatePassword(userId: number, newPassword: string) {
    const query = `UPDATE usuario SET contraseña = $1 WHERE id_usuario = $2 RETURNING id_usuario`;
    const values = [newPassword, userId];

    const client = await pool.connect();
    try {
      const result = await client.query(query, values);
      return result.rowCount! > 0; // Retorna true si se actualizó
    } finally {
      client.release();
    }
  }
}
