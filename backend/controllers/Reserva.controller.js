import { getConnection, sql } from '../database/connection'
export const getReservas = async (req, res) => {
    const pool = await getConnection()
    const result = await pool.request().query('select * from Reserva')
    res.json(result.recordset)
}
export const createReserva = async (req, res) => {
    const { cedulaCliente, nombreCliente, precioTotal } = req.body

    if (cedulaCliente == null || nombreCliente == null || precioTotal == null) {
        return res.status(400).json({ msg: "llene todos los campos" })
    }
    const pool = await getConnection()
    pool.request()
        .input("cedulaCliente", sql.Int, cedulaCliente)
        .input("nombreCliente", sql.VarChar, nombreCliente)
        .input("precioTotal", sql.Float, precioTotal)
        .query(`
        INSERT INTO Reserva (cedulaCliente, nombreCliente, precioTotal) VALUES (@cedulaCliente, @nombreCliente, @precioTotal)
        SELECT @@IDENTITY AS 'Identity';
        `)
        .then(Response => {
            res.json(Response.recordset[0].Identity)
            
        })

}
export const editReserva = async (req, res) => {
    const { idReserva, cedulaCliente, nombreCliente, precioTotal } = req.body

    if (idReserva == null || cedulaCliente == null || nombreCliente == null || precioTotal == null) {
        return res.status(400).json({ msg: "llene todos los campos" })
    }
    const pool = await getConnection()
    await pool.request()
        .input("idReserva", sql.BigInt, idReserva)
        .input("cedulaCliente", sql.Int, cedulaCliente)
        .input("nombreCliente", sql.VarChar, nombreCliente)
        .input("precioTotal", sql.Float, precioTotal)
        .query("UPDATE Reserva SET cedulaCliente=@cedulaCliente,nombreCliente=@nombreCliente,precioTotal=@precioTotal WHERE idReserva=@idReserva")
    res.json("updated Reserva")
}
export const deleteReserva = async (req, res) => {
    let idReserva = req.params.id

    if (idReserva == null) {
        return res.status(400).json({ msg: "llene todos los campos" })
    }

    const pool = await getConnection()
    await pool.request()
        .input("idReserva", sql.BigInt, idReserva)
        .query("DELETE FROM Reserva WHERE idReserva=@idReserva")
    res.json("deleted Reserva")

}
export const getReserva = async (req, res) => {
    const idReserva = req.params.id

    const pool = await getConnection()
    const result = await pool.request().input("idReserva", sql.BigInt, idReserva).query('select * from Reserva WHERE idReserva=@idReserva')
    res.json(result.recordset)
}