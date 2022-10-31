import { Router } from "express";
import {getdetalles,createdetalle,editdetalle,deletedetalle,getdetalle,deletedetalleBySilla,deletedetalleByReserva} from '../controllers/detalle.controller'
const router=Router();
router.get('/detalles',getdetalles)
router.post('/detalles',createdetalle)
router.put('/detalles',editdetalle)
router.delete('/detalles/',deletedetalle)
router.delete('/detalles/silla/:id',deletedetalleBySilla)
router.delete('/detalles/reserva/:id',deletedetalleByReserva)
router.get('detalles/:id',getdetalle)
export default router