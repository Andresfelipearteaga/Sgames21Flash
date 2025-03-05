import pool from "../../../config/db";

const getStrategyStudent = async (id: number) => {
    const { rows } = await pool.query(
        `SELECT * FROM student WHERE id = $1`,
        [id]
    );
    return rows[0];
};

export default {
    getStrategyStudent
};