// import pool from database
const pool = require('../services/database');


// async function for searching flight based on departure and arrival
async function searchFlight(origin, destination, date) {
    const client = await pool.connect();
    try {
        const result = await client.query(
            'SELECT * FROM available_flights WHERE origin = $1 AND Destination = $2 AND data_trunc($3) = data_trunc(departure_local_time)',
            [origin, destination, date]
        )
        return result.rows;
    } catch (e) {
        /*return error*/
        return e.message;
    } finally {
        client.release();
    }
}

module.exports = {
    searchFlight
};