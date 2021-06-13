require('dotenv').config()
const { Client } = require('pg');
const client = new Client({
    user: process.env.DB_USERNAME,
    host: process.env.DB_HOST,
    database: process.env.DB_DB,
    password: process.env.DB_PASSWORD,
    port: 5432,
});
client.connect();
client.query("SELECT table_name FROM information_schema.tables WHERE table_schema='public'AND table_type='BASE TABLE';", [], function (err, result) {
if (err) {
    console.log(err);
}
else
{
    console.log("Connected to database. Found tables :",result.rows);
}
    
});
module.exports = client;
