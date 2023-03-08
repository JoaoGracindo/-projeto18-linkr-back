import { repoTrending } from "../repositories/tagRepository.js";

export async function getTrending(req, res){
    try {
        const {rows} = await repoTrending() 
        const tagArr = rows.map(row => row.name)
        res.send(tagArr)  
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}