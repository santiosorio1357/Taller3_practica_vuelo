import { getConnection } from '../database/connection'
export const getSillas = async (req, res) => {
    const pool = await getConnection()
    const result=await pool.request().query('select * from Silla')
    res.json(result.recordset)
}
export const createSilla=async (req,res)=>{
    res.json("new silla")
}