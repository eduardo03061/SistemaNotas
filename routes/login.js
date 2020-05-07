import express from 'express';
const router = express.Router();
const jwt = require('jsonwebtoken');

// importar el modelo nota
import User from '../models/user';

const bcrypt = require('bcrypt');
const saltRounds = 10;

router.post('/',async(req,res)=>{
    const body = req.body;
    try {
        const usuarioDB = await User.findOne({email: body.email})

        //Evaluando el email
        if(!usuarioDB){
            return res.status(400).json({
                mensaje: 'Email incorrecto'
              })
        }

        //Evaluar la contraseña
        if(!bcrypt.compareSync(body.pass, usuarioDB.pass)){
            return res.status(400).json({
                mensaje: 'Contraseña incorrecta'
              })
        }
        //Generar token
        let token = jwt.sign({
            data: usuarioDB
        }, 'secret', { expiresIn: 60 * 60 * 24 * 30}) // Expira en 30 días

        // Pasó las validaciones
        res.json({
            usuarioDB,
            token: token
        })
    } catch (error) {
        return res.status(400).json({
            mensaje: 'Ocurrio un error',
            error
          })
    }
});




module.exports = router;