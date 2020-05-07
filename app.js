import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';

const app = express();

//Conexion a BD
const mongoose = require('mongoose');

const uri = 'mongodb://localhost:27017/ibm';
const options = {useNewUrlParser: true, useCreateIndex: true};

mongoose.connect(uri, options).then(
  () => {console.log("conectado a mongoDB");},
  err => { err}
);


// Middleware
app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, 'public')));

// Rutas
//app.get('/', (req, res) => {
//  res.send('Hello World!');
//});
app.use('/api',require('./routes/nota'));
app.use('/api',require('./routes/user'));
app.use('/api/login',require('./routes/login'));

// Middleware para Vue.js router modo history
const history = require('connect-history-api-fallback');
app.use(history());
app.use(express.static(path.join(__dirname, 'public')));

app.set('puerto', process.env.PORT || 3000);
app.listen(app.get('puerto'), () => {
  console.log('App listening on port '+ app.get('puerto'));
});