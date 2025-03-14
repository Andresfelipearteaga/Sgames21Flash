import pool from '../../../config/db';

export class AntesDeRepository {
    static async getInfoPhaseStudent(id: number) {
      const query = `
        SELECT e.etapa 
        FROM progreso_general_estudiante p
        JOIN etapas_p1 e ON p.id_etapa_p1 = e.id
        WHERE p.id_usuario = $1
        LIMIT 1;
      `;
      const values = [id];
      const client = await pool.connect();
      try {
        const result = await client.query(query, values);
        return result.rows.length > 0 ? result.rows[0] : null;
      } finally {
        client.release();
      }
    }
  }
  