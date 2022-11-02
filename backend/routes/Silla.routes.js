import { Router } from "express";
import {getSillas,createSilla,editSilla,deleteSilla,getSilla,getSillaU} from '../controllers/Silla.controller'
const router=Router();
router.get('/sillas',getSillas)
router.post('/sillas',createSilla)
router.put('/sillas',editSilla)
router.delete('/sillas/',deleteSilla)
router.get('/sillas/:id',getSilla)
router.get('/sillasUbicacion/:id',getSillaU)
export default router