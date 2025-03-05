import pool from "../../../config/db";

const getMessage = async (id: number) => {
  const client = await pool.connect();
  try {
    const res = await client.query(
      `SELECT * FROM agent WHERE id = $1`,
      [id]
    );
    client.release();
    return res.rows[0];
  } catch (error) {
    console.error(error);
    client.release();
    return null;
  }
};

export default {
  getMessage,
};