const db = require('../../database/db');
const jwt = require("jsonwebtoken");
const format = require('pg-format');

const userAccess = async (req,res)=>{
    const Authorization = req.header("Authorization");
    const token = Authorization.split("Bearer ")[1];
    console.log(token);
    const { email } = jwt.decode(token)
    console.log(email)
    const query = format(`SELECT * FROM usuarios WHERE email = '%s'`,email)
    const data = await db.query(query);
    const {rows} = data;
    const [{id, rol, lenguage}] = rows;
    const usuario =[{
        id: id,
        email: email,
        rol: rol,
        lenguage: lenguage
    }]
    console.log(usuario)
    res.status(200).json({data: usuario})

} 

module.exports = userAccess;