import connection from "../database/database"

export async function validateSignUp(req,res,next){

    const { email } = req.body

    try {
        
        const { rows:user } = await connection.query(`SELECT * FROM "users" WHERE email = $1`, [email])

        console.log("chegou no validate signUp")

        if(user[0]) return res.status(422).send("email invalido")

    } catch (error) {
        res.status(500).send(error.message)
    }
    next()
}