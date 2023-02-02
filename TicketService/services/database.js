/**
 * create pool
 */
const {Pool} = require('pg');

const pool = new Pool({
    host: process.env.PG_HOST,
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE,
    port: process.env.PG_PORT,
});

pool.on('error', (err) => {
    console.error('Unexpected error on idle client', err)
    process.exit(-1)
});

// test connection
pool.query('SELECT NOW()', (err) => {
//     if err config wrong
    if (err) {
        console.log(err);
        process.exit(-1);
    }
});

module.exports = pool;