const Pool = require('pg').Pool
const pool = new Pool({
    user: "postgres",
    password: "131022",
    host: "localhost",
    port: 5432,
    database: "torqueai"
})

module.exports = pool