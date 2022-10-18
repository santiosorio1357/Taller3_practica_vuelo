import { Router } from "express";
import {getSillas,createSilla} from '../controllers/Silla.controller'
const router=Router();
router.get('/sillas',getSillas)
router.post('/crearSilla',createSilla)
router.put('/sillas',getSillas)
router.delete('/sillas',getSillas)
export default router