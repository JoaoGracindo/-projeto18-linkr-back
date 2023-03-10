import { repoDeleteLike, repoGetPostLikes, repoPostLike } from "../repositories/likesRepository.js";

export async function postLike(req, res) {
    const { post_id } = req.params;
    const { userId } = res.locals;

    try {
        await repoPostLike(userId, post_id)
        res.status(201).send()
    } catch (error) {
        console.log(error)
        res.status(500).send()
    }
}

export async function deleteLike(req, res) {
    const { post_id } = req.params
    const { userId } = res.locals

    try {
        await repoDeleteLike(userId, post_id)
        res.status(204).send()
    } catch (error) {
        console.log(error)
        res.status(500).send()
    }
}

export async function getPostLikes(req, res) {
    const { post_id } = req.params
    try {
        const { count: {rows: [count]}, users: {rows: users} } = await repoGetPostLikes(post_id);
        // const { rows: [count], rows: users } = await repoGetPostLikes(post_id);
        const names = users.map(user => user.users)
        console.log(count, names)
        res.status(200).send({count: count.count, users: names})
    } catch (error) {
        console.log(error)
        res.status(500).send()
    }
}