import connection from "../database/database.js";
import bcrypt from "bcrypt"


export async function signUp(req,res){

    const { username, email, password, pic_url} = req.body

    const hashPassword = bcrypt.hashSync(password,10)

    try {

        await connection.query(`INSERT INTO users (name, email, password, pic_url) 
                        VALUES ($1,$2,$3,$4)`,[username,email,hashPassword,pic_url])

        res.status(201).send("usuário criado com sucesso")
        
    } catch (error) {
        res.status(500).send(error.message)
    }
}



// try {
        
// } catch (error) {
//     res.status(500).send(error.message)
// }