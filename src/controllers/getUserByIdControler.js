import {
  getLikesRepository,
  getUserByIdRepository,
} from "../repositories/getUserByIdRepository.js";
import { userLikedRepository } from "../repositories/postRepository.js";

export async function getUserByIdController(req, res) {
  let responseSent = false;
  const { id } = req.params;
  let liked = false;
  const user_id = res.locals.userId;
  try {
    const { rows: posts } = await getUserByIdRepository(id);
    const morePostsInfos = [];
    for (let i = 0; posts.length > i; i++) {
      const {
        count: {
          rows: [count],
        },
        users: { rows: users },
      } = await getLikesRepository(posts[i].id);

      let url_metadata = {};

      try {
        const urlMetadataResponse = await urlMetadata(posts[i].link); //url_metadata
        const { url, title, description, image } = urlMetadataResponse;
        url_metadata = { url, title, description, image };
      } catch (err) {
        console.error("Error getting metadata for URL:", posts[i].link);
        // Handle the error in some way that suits your needs, e.g. set default values for metadata
        url_metadata = { url: "", title: "", description: "", image: "" };
      }

      let likedQuery = await userLikedRepository(user_id, posts[i].id);
      if (likedQuery.rowCount > 0) {
        liked = true;
      }

      const names = users.map((user) => user.name);
      morePostsInfos.push({
        count: count.count,
        users: names,
        liked: liked,
        url_metadata,
      });
    }
    const results = [];
    for (let i = 0; posts.length > i; i++) {
      results.push({
        ...posts[i],
        likersNames: morePostsInfos[i].users,
        likesCount: morePostsInfos[i].count,
        liked: morePostsInfos[i].liked,
        url_metadata: morePostsInfos[i].url_metadata,
      });
    }

    return res.status(200).send(results);
  } catch (err) {
    console.log(err);
    if (!responseSent) res.status(500).send(err);
    console.log(err);
  }
}


