const format = require('pg-format');
const db = require('../../database/db');
const bcrypt = require('bcryptjs')
const salt = bcrypt.genSaltSync(10);

const userRegistrer = (req,res)=>{
    let {email, password, rol, lenguage}= req.body;  
    try {
        const passwordEncriptada = bcrypt.hashSync(password, salt);
        console.log(passwordEncriptada)
        password = passwordEncriptada;
        const query = format(`INSERT INTO usuarios (email, password, rol, lenguage) 
        VALUES ('%s', '%s', '%s', '%s')`,email,password,rol,lenguage);
        db.query(query);
        res.status(200).json({msg: "usuario registrado correctamente"})
    } catch (error) {
        res.status(400).json(error)
    }
}

module.exports= userRegistrer;