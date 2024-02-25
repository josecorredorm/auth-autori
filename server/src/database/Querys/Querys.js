const getUsers = `SELECT * FROM usuarios WHERE email = '%s'`;
const addUser = `INSERT INTO usuarios (email, password, rol, lenguage) 
VALUES ('%s', '%s', '%s', '%s')`

module.exports ={getUsers}