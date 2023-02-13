// import pool from database
const pool = require('../services/database');


// async function for searching flight based on departure and arrival
async function getUserTicket(user_id) {
    const client = await pool.connect();
    try {
        const result = await client.query(
            "SELECT * FROM purchase WHERE corresponding_user_id = $1 AND transaction_result = 1",
            [user_id]
        )
        return result.rows;
    } finally {
        client.release();
    }
}

module.exports = {
    getUserTicket
};