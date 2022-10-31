import express from 'express'
import config from './config'
import SillaRoutes from '../routes/Silla.routes.js'
import detalleRoutes from '../routes/detalle.routes.js'
import reservaRoutes from '../routes/Reserva.routes.js'
const cors = require('cors');
const app=express();

app.set('port', config.port)

app.use(express.json());
app.use(express.urlencoded({extended:false}))
app.use(cors({
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}));
app.use(SillaRoutes)
app.use(detalleRoutes)
app.use(reservaRoutes)
export default app