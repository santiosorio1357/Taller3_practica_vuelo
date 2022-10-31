import { Router } from "express";
import {getReservas,createReserva,editReserva,deleteReserva,getReserva} from '../controllers/Reserva.controller'
const router=Router();
router.get('/Reservas',getReservas)
router.post('/Reservas',createReserva)
router.put('/Reservas',editReserva)
router.delete('/Reservas/:id',deleteReserva)
router.get('/Reservas/:id',getReserva)
export default router