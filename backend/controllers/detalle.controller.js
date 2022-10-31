import { getConnection,sql } from '../database/connection'
export const getdetalles = async (req, res) => {
    const pool = await getConnection()
    const result=await pool.request().query('select * from detalle')
    res.json(result.recordset)
}
export const createdetalle=async (req,res)=>{
    const {idReserva,idSilla,precioSilla}=req.body
    
    if(idReserva==null||idSilla==null||precioSilla==null){
        return res.status(400).json({msg:"llene todos los campos"})
    }
    const pool=await getConnection()
    await pool.request()
    .input("idReserva",sql.BigInt,idReserva)
    .input("idSilla",sql.BigInt,idSilla)
    .input("precioSilla",sql.Float,precioSilla)
    .query('INSERT INTO detalle (idReserva,idSilla,precioSilla) VALUES (@idReserva, @idSilla,@precioSilla)')
    res.json("0")
}
export const editdetalle=async (req,res)=>{
    const {idReserva,idSilla,precioSilla}=req.body
    
    if(idReserva==null||idSilla==null||precioSilla==null){
        return res.status(400).json({msg:"llene todos los campos"})
    }
    const pool=await getConnection()
    await pool.request()
    .input("idReserva",sql.BigInt,clase)
    .input("idSilla",sql.BigInt,idSilla)
    .input("precioSilla",sql.Float,precioSilla)
    .query("UPDATE detalle SET idReserva=@idReserva, idSilla=@idSilla,precioSilla=@precioSilla WHERE idReserva=@idReserva and idSilla=@idSilla")
    res.json("updated detalle")
}
export const deletedetalle=async (req,res)=>{
    const{idReserva,idSilla}=req.body
    if(idReserva==null||idSilla==null){
        return res.status(400).json({msg:"llene todos los campos"})
    }
    const pool=await getConnection()
    await pool.request()
    .input("idReserva",sql.BigInt,clase)
    .input("idSilla",sql.BigInt,idSilla)
    .query("DELETE FROM detalle WHERE idReserva=@idReserva and idSilla=@idSilla")
    res.json("deleted detalle")

}
export const deletedetalleBySilla=async(req,res)=>{
    const{idSilla}=req.params.id
    if(idSilla==null){
        return res.status(400).json({msg:"llene todos los campos"})
    }
    const pool=await getConnection()
    await pool.request()
    .input("idSilla",sql.BigInt,idSilla)
    .query("DELETE FROM detalle WHERE idSilla=@idSilla")
    res.json("deleted detalle")
}
export const deletedetalleByReserva=async(req,res)=>{
    const{idReserva}=req.params.id
    if(idReserva==null){
        return res.status(400).json({msg:"llene todos los campos"})
    }
    const pool=await getConnection()
    await pool.request()
    .input("idReserva",sql.BigInt,idReserva)
    .query("DELETE FROM detalle WHERE idReserva=@idReserva")
    res.json("deleted detalle")
}
export const getdetalle = async (req, res) => {
    const idReserva=req.params.id1
    const idSilla=req.params.id2
    const pool = await getConnection()
    const result=await pool.request()
    .input("idReserva",sql.BigInt,idReserva)
    .input("idSilla",sql.BigInt,idSilla)
    .query('select * from detalle WHERE idReserva=@idReserva and idSilla=@idSilla')
    res.json(result.recordset)
}