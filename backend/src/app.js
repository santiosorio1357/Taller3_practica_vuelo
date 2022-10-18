import express from 'express'
import config from './config'
import SillaRoutes from '../routes/Silla.routes'
const app=express();

app.set('port', config.port)
app.use(SillaRoutes)

export default app