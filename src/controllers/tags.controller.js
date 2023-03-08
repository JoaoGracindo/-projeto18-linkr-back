import { repoTrending } from "../repositories/tagRepository.js";

export async function getTrending(req, res){
    try {
        const {rows} = await repoTrending() 
        res.send(rows)  
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}