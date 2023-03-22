import { createTag, insertTag, repoTagExist, repoTagId, repoTrending, repoDeletePostTags } from "../repositories/tagRepository.js";

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

export async function postTag(req, res){
    try {
        const { tags, post_id } = req.body

        const existentTags = await repoTagExist(tags)

        for (let i = 0; i < existentTags.length; i++) {
            if(!existentTags[i]) await createTag(tags[i])
        }


        for (let i = 0; i < tags.length; i++) {
            await insertTag(tags[i], post_id)
        }

        res.status(201).send()
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}

export async function deletePostTags(req, res){
    try {
        const { post_id } = req.params

        await repoDeletePostTags(post_id)

        res.status(204).send()
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}