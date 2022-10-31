import sql from 'mssql'
const dbsettings = {
    user: 'EJS',
    password: 'emasantijuli',
    server: 'localhost',
    database: 'aerolinea',
    port: 3001,
    options: {
        encrypt: true, // for azure
        trustServerCertificate: true // change to true for local dev / self-signed certs
    }
}
export const getConnection = async () => {
    try {
        const pool = await sql.connect(dbsettings)
        return pool
    } catch (error) {
        console.error(error)
    }

}
export {sql}
