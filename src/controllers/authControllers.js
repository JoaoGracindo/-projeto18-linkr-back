import connection from "../database/database.js";
import bcrypt from "bcrypt"
import { v4 as uuid }  from "uuid"


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

export async function signIn(req,res){

   
    try {

        const user = req.user

        const token = uuid()
        
        await connection.query(`DELETE FROM sessions WHERE user_id = $1`,[user.id])

        await connection.query(`INSERT INTO sessions (user_id,token)
                                VALUES ($1,$2)`,[user.id,token])
        
        res.status(200).send(token)
        
    } catch (error) {
        res.status(500).send(error.message)
    }
}

export async function logout(req,res){

    try {

        const token = req.token
        
        await connection.query(`DELETE FROM sessions WHERE token = $1`,[token])

        res.status(204).send("saiu da sessão.")

} catch (error) {
    res.status(500).send(error.message)
}
}