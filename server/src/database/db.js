const { Pool } = require('pg');
require('dotenv').config();
const {HOST, USER, PASSWORD, DATABASE} = process.env;

const db = new Pool ({
    host: HOST,
    user: USER,
    password: PASSWORD,
    database: DATABASE,
    allowExitOnIdle: true
})

db.connect((error,client,done) =>{
    if(error){
        console.log("no se logro la conexión a la DB");
    }
    else{
        console.log("conexión a la DB exitosa")
    }
})

module.exports = db;
