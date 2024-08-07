const jwt = require('jsonwebtoken')
const bcryptjs = require('bcryptjs')
const conexion = require('../database/db')

exports.register = async (req, res)=>{    
    try {
        const data = req.body
        conexion.query('SELECT * FROM USUARIOS WHERE gmail = ?',[data.gmail], async (err, results) => {
            if (err) throw err;       
            if (results.length > 0) {
                return res.status(400).json({ message: 'El correo ya está registrado' });
            }
            conexion.query('SELECT * FROM USUARIOS WHERE nombreUsuario = ?'[data.nombreUsuario],async(err,results)=>{
                if (err) throw err;       
                if (results.length > 0) {
                    return res.status(400).json({ message: 'El nombre de usuario ya está en uso' });
                }
                let passHash = await bcryptjs.hash(data.password, 8);    
                conexion.query('INSERT INTO usuarios SET ?', {gmail:data.gmail, nombreUsuario:data.nombreUsuario, password:passHash}, (error, results)=>{
                    if (error) {
                        console.log(error);
                        res.status(400).json({ message: 'Error al registrar usuario' });
                    } else {
                        res.status(200).json({ message: 'Usuario registrado exitosamente', });
                    }
                })
            })})
    } catch (error) {
        console.log(error)
    }       
}

exports.login = async (req,res) => {
    try {
        const data = req.body;
        conexion.query('SELECT * FROM usuarios WHERE gmail = ?', [data.gmail], async (error, resultado) => {
            if (error) {
                console.error('Error en la consulta a la base de datos:', error);
                return res.status(500).send('Error interno del servidor');
            }
            if (resultado.length == 0 || !(await bcryptjs.compare(data.password, resultado[0].password))) {
                return res.status(400).json({ message: 'Correo electrónico o contraseña no son válidos' });
            }
            const token = jwt.sign(
                { id: resultado[0].ID, user: resultado[0].nombreUsuario },
                process.env.JWT_SECRET,
                { expiresIn: process.env.JWT_EXPIRATION }
            );
            const cookieOptions = {
                expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
                secure: process.env.NODE_ENV === 'production'
            };
            res.cookie("jwt", token, cookieOptions);
            return res.status(200).json({ message: 'Inicio de sesión exitoso' });
        });

    } catch (error) {
        console.error('Error en el servidor:', error);
        return res.status(500).send('Error interno del servidor');
    }
};


exports.getUsers = (req, res) => {
    conexion.query('SELECT * FROM usuarios', (error, results) => {
        if (error) {
            console.error('Error en la consulta a la base de datos:', error);
            return res.status(500).send('Error interno del servidor');
        }
        res.status(200).json(results);
    });
};

exports.getUserById = (req, res) => {
    const userId = req.params.id;
    let consulta = conexion.query('SELECT * FROM usuarios WHERE id = ?', [userId], (error, results) => {
        if (error) {
            console.error('Error en la consulta a la base de datos:', error);
            return res.status(500).send('Error interno del servidor');
        }
        if (results.length === 0) {
            return res.status(404).send('Usuario no encontrado');
        }
        res.status(200).json(results[0]);
    });
};

exports.deleteUser = (req, res) => {
    const userId = req.params.id;
    conexion.query('DELETE FROM usuarios WHERE id = ?', [userId], (error, results) => {
        if (error) {
            console.error('Error en la consulta a la base de datos:', error);
            return res.status(500).send('Error interno del servidor');
        }
        res.status(200).json({ message: 'Usuario eliminado exitosamente' });
    });
};

exports.updateUser =  async(req, res) => {
    const userId = req.params.id;
    const data = req.body;
    const newPassword = await bcryptjs.hash(req.body.password, 8);;
    const nuevo = {
        gmail: data.gmail,
        nombreUsuario: data.nombreUsuario,
        password: newPassword
    }
    conexion.query('UPDATE usuarios SET ? WHERE id = ?', [nuevo,userId], (error, results) => {
        if (error) {
            console.error('Error en la actualización de la base de datos:', error);
            return res.status(500).send('Error interno del servidor');
        }
        res.status(200).json({ message: 'Usuario actualizado exitosamente' });
    });
};


