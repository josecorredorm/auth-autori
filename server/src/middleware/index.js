const db = require('../database/db')
const bcrypt = require('bcryptjs');
const format  = require('pg-format');
const jwt = require("jsonwebtoken");
const { check, validationResult} = require('express-validator');

const {KEYTOKEN} = process.env;


const validationFieldRegistrer = [
	check('email')
		.notEmpty()
		.isEmail(),
    check('password')
		.notEmpty()
		.isLength({ min: 8 })
		.custom((value,{req})=>{
			const passwordregex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
			if(passwordregex.test(value)){
				return true
			}
			else{
				throw new Error ('La contraseña debe tener al menos una mayuscula, una minuscula, un numero y un caracter especial como @$!%*?&')
			}
		}),
	check('rol')
		.notEmpty()
		.isIn(['Frontend Developer', 'Backend Developer', 'Full Stack Developer']),
	check('lenguage')
		.notEmpty()
		.isIn(['JavaScript', 'Python', 'Ruby']),
(req, res, next) => {
	try {
		validationResult(req).throw()
		return next()
	} catch (error) {
		res.status(400).send({error: error.array()})
		
	}
}
]

const validationEmail = async(req,res,next)=>{
	const {email} = req.body;
	try {
		const query = format(`SELECT * FROM usuarios WHERE email = '%s'`,email)
		const data = await db.query(query)
		if(data.rows.length){
			res.status(409).json({
				error: "bad request",
				msg: "El usuario ya está registrado"
			})
		}
		else{
		next()
	}
	} catch (error) {
		res.status(400).json(error)
	}
}

const validationFieldLogin =[
	check('email')
		.notEmpty()
		.isEmail(),
    check('password')
		.notEmpty(),
(req,res,next)=>{
	try {
		validationResult(req).throw()
		return next()
	} catch (error) {
		res.status(400).send({error: error.array()})
	}
}
]

const validateCredentials = async(req,res,next)=>{
    const {email, password} = req.body;
    try {
        const query = format(`SELECT * FROM usuarios WHERE email = '%s'`,email)
        const { rows: [usuario], rowCount } = await db.query(query);
		const { password: passwordEncriptada } = usuario;
		const passwordEsCorrecta = bcrypt.compareSync(password, passwordEncriptada)
		console.log(passwordEsCorrecta)
        if (!passwordEsCorrecta || !rowCount){
            res.status(401).json({ msg: "Email o contraseña incorrecta" })
        }
        else{
            next();
        }
    } catch (error) {
        res.status(400).send({error: error})
    }
}

const verifyToken = (req,res,next)=>{
	try {
		const Authorization = req.header("Authorization");
		const token = Authorization.split("Bearer ")[1];
		jwt.verify(token, KEYTOKEN);
		console.log("token verificado")
		next();
	} catch (error) {
		res.status(403).send({error: error})
	}
}

module.exports={validationFieldRegistrer,validationEmail,validationFieldLogin, validateCredentials,verifyToken}