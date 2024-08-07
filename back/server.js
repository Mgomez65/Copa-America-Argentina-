const express = require('express')
const dotenv = require('dotenv')
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');

app.use(express.urlencoded({extends:false}))
app.use(express.json());

app.use(cors({
    origin: 'http://localhost:5173', 
    credentials: true
}));

app.use(cookieParser())

dotenv.config({path: './.env'})

app.use('/', require('./rutas/rutas'))

const conexion = require('./database/db')

app.listen(8000, (req, res)=>{
    console.log('servidor corriendo en el puerto 8000')
})
