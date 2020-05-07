import express from 'express';
const router = express.Router();

// importar el modelo nota
import Nota from '../models/nota';

//Importamos los middlewares
const {verificarAuth,verificarAdministrador} = require('../middlewares/autenticacion.js');

// Agregar una nota
router.post('/nueva-nota',verificarAuth, async(req, res) => {
    
  const body = req.body;  
  //Traemos el usuario del middleware, donde req.usuario fue creado desde el middleware
  body.usuarioId = req.usuario._id;

  try {
    const notaDB = await Nota.create(body);
    res.status(200).json(notaDB); 
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ocurrio un error',
      error
    })
  }
});
//Get con parametros
router.get('/nota/:id',async(req,res)=>{
    const _id = req.params.id;

    try {
        const notaDB = await Nota.findOne({_id});
        res.json(notaDB);
    } catch (error) {
        return res.status(400).json({
            mensaje: 'Ocurrio un error',
            error
        })
    }
});
//Get con todos los documentos
router.get('/nota',verificarAuth,async(req,res)=>{
    const usuarioId = req.usuario._id;
    try {
        const notaDB = await Nota.find({usuarioId});
        res.json(notaDB);
    } catch (error) {
        return res.status(400).json({
            mensaje: 'Ocurrio un error',
            error
        })
    }
});
//Delete eliminar una nota
router.delete('/nota/:id',async(req,res)=>{
    const _id  = req.params.id;
    try {
        const notaDB = await Nota.findOneAndDelete({_id});
        if(!notaDB){
            return res.status(400).json({
                mensaje: 'No se encontro el Id indicado',
                error
            })
        }
        res.json(notaDB);
    } catch (error) {
        return res.status(400).json({
            mensaje: 'Ocurrio un error',
            error
        })
    }
});
//Put actualizar
router.put('/nota/:id',async(req,res)=>{
    const _id = req.params.id;
    const body = req.body;

    try {
        const notaDB = await Nota.findByIdAndUpdate(_id,body, {new: true});

        res.json(notaDB);
    } catch (error) {
        return res.status(400).json({
            mensaje: 'Ocurrio un error',
            error
        })
    }
});

// Exportamos la configuración de express app
module.exports = router;