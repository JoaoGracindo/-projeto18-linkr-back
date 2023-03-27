import {
    checkFollow,
    follow,
    unfollow
} from '../repositories/followRepository.js';

export async function followController(req, res){

    const {id} = req.params;
    const {userId} = res.locals;

    try{
        const {rowCount} = await checkFollow(id, userId);
        console.log(rowCount, "rows count")
        if(rowCount === 0){
            await follow(id, userId);
            return res.status(201).send("Followed");
        }else{
            await unfollow(id, userId);
            return res.status(201).send("Unfollowed");
        }

        

    }catch(err){
        return res.status(500).send(err.message);
    }

}