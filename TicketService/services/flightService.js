// import pool from database
const pool = require('../services/database');


// async function for searching flight based on departure and arrival
async function searchFlight(origin, destination, date) {
    const client = await pool.connect();
    try {
        const result = await client.query(
            "SELECT * FROM available_offers WHERE origin = $1 AND Destination = $2 AND $3 = DATE_TRUNC('day' ,departure_local_time)",
            [origin, destination, date]
        )
        return result.rows;
    } finally {
        client.release();
    }
}

module.exports = {
    searchFlight
};