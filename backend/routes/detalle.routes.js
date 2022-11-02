import { Router } from "express";
import {getDetalleBySilla,getDetalleByReserva,getdetalles,createdetalle,editdetalle,deletedetalle,getdetalle,deletedetalleBySilla,deletedetalleByReserva} from '../controllers/detalle.controller'
const router=Router();
router.get('/detalles',getdetalles)
router.post('/detalles',createdetalle)
router.put('/detalles',editdetalle)
router.delete('/detalles/',deletedetalle)
router.delete('/detalles/silla/',deletedetalleBySilla)
router.delete('/detalles/reserva/:id',deletedetalleByReserva)
router.get('/detalles/:id',getdetalle)
router.get('/detalles/reserva/:id',getDetalleByReserva)
router.get('/detalles/silla/:id',getDetalleBySilla)
export default router 