import mongoose from 'mongoose';
const Schema = mongoose.Schema;
 
const uniqueValidator = require('mongoose-unique-validator');

const roles = {
    values: ['ADMIN','USER'],
    message: '{VALUE} ROL no valido' 
}

const userSchema = new Schema({
  nombre: {type: String, required: [true, 'Nombre obligatorio']},
  email: {
      type: String, 
      required: [true, 'El email es obligatorio'],
      unique:true
    },
  pass: {type: String, required: [true,'El email es obligatorio']},
  date:{type: Date, default: Date.now},
  role: {type: String, default: 'USER', enum: roles},
  activo: {type:Boolean, default: true}
});

userSchema.plugin(uniqueValidator,{message: 'Error, esperaba {PATH} unico.'});

userSchema.methods.toJSON = function() {
    var obj = this.toObject();
    delete obj.pass;
    return obj;
   }

const User = mongoose.model('User',userSchema);
export default User;