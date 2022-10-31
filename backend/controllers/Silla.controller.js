import { getConnection, sql } from '../database/connection'
export const getSillas = async (req, res) => {
    const pool = await getConnection()
    const result = await pool.request().query('select * from Silla')
    res.json(result.recordset)
}
export const createSilla = async (req, res) => {
    const { clase, estado, precio, ubicacion } = req.body

    if (clase == null || estado == null || precio == null || ubicacion == null) {
        return res.status(400).json({ msg: "llene todos los campos" })
    }
    const pool = await getConnection()
    try {
        await pool.request()
            .input("clase", sql.Int, clase)
            .input("estado", sql.Int, estado)
            .input("precio", sql.Int, precio)
            .input("ubicacion", sql.VarChar, ubicacion)
            .query('INSERT INTO Silla (clase,estado,precio,ubicacion) VALUES (@clase, @estado,@precio,@ubicacion)')
        res.json("0")
    } catch (error) {
        res.json(error)
    }



}
export const editSilla = async (req, res) => {
    const { clase, estado, precio, ubicacion, idSilla } = req.body

    if (clase == null || estado == null || precio == null || ubicacion == null || idSilla == null) {
        return res.status(400).json({ msg: "llene todos los campos" })
    }
    const pool = await getConnection()
    await pool.request()
        .input("clase", sql.Int, clase)
        .input("estado", sql.Int, estado)
        .input("precio", sql.Int, precio)
        .input("ubicacion", sql.VarChar, ubicacion)
        .input("idSilla", sql.BigInt, idSilla)
        .query("UPDATE Silla SET clase=@clase, estado=@estado,precio=@precio,ubicacion=@ubicacion WHERE idSilla=@idSilla")
    res.json("updated silla")
}
export const deleteSilla = async (req, res) => {
    const { idSilla } = req.body
    if (idSilla == null) {
        return res.status(400).json({ msg: "llene todos los campos" })
    }
    const pool = await getConnection()
    await pool.request()
        .input("idSilla", sql.BigInt, idSilla)
        .query("DELETE FROM Silla WHERE idSilla=@idSilla")
    res.json("updated silla")

}
export const getSilla = async (req, res) => {
    const ubicacion = req.params.id
    const pool = await getConnection()
    const result = await pool.request().input("ubicacion", sql.VarChar, ubicacion).query('select * from Silla WHERE ubicacion=@ubicacion')
    
    res.json(result.recordset)
}