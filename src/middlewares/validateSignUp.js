import connection from "../database/database.js"

export async function validateSignUp(req,res,next){

    const { email } = req.body

    try {
        
        const { rows:user } = await connection.query(`SELECT * FROM "users" WHERE email = $1`, [email])

        if(user[0]) return res.status(400).send("email invalido")

    } catch (error) {
        res.status(500).send(error.message)
    }
    next()
}