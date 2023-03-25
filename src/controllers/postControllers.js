import {
  insertPostRepository,
  getTimelineRepository,
  putLinkRepository,
  deleteLinkRepository,
  getPostByHashtagRepository,
  userLikedRepository,
  repostLinkRepository,
  getReposts,
  repostInPosts
} from "../repositories/postRepository.js";
import urlMetadata from "url-metadata";
import { getLikesRepository } from "../repositories/getUserByIdRepository.js";

export async function getTimelineController(req, res) {
  let responseSent = false;
  const user_id = res.locals?.userId;
  const {refresh_type, timestamp} = req.body
  try {
    const { rows: timeline } = await getTimelineRepository(refresh_type, timestamp);
    const likes = [];
    
    for (let i = 0; timeline.length > i; i++) {
      let liked = false;
      const {
        count: {
          rows: [count],
        },
        users: { rows: users },
      } = await getLikesRepository(timeline[i].id);

      let url_metadata = {};
      try {
        const urlMetadataResponse = await urlMetadata(timeline[i].link); //url_metadata
        const { url, title, description, image } = urlMetadataResponse;
        url_metadata = { url, title, description, image };
      } catch (err) {
        console.error("Error getting metadata for URL:", timeline[i].link);
        // Handle the error in some way that suits your needs, e.g. set default values for metadata
        url_metadata = { url: "", title: "", description: "", image: "" };
      }

      if (user_id) {
        let likedQuery = await userLikedRepository(user_id, timeline[i].id);
        if (likedQuery.rowCount > 0) {
          liked = true;
        }
      }

      const names = users.map((user) => user.name);
      likes.push({
        count: count.count,
        users: names,
        liked: liked,
        url_metadata,
      });
    }
    const results = [];
    for (let i = 0; timeline.length > i; i++) {
      results.push({
        ...timeline[i],
        likersNames: likes[i].users,
        likesCount: likes[i].count,
        liked: likes[i].liked,
        url_metadata: likes[i].url_metadata,
      });
    }

    responseSent = true;
    res.send(results);
  } catch (err) {
    if (!responseSent) res.status(500).send(err);
    console.log(err);
  }
}

export async function postLinkController(req, res) {
  const { userId } = res.locals;
  const { link } = req.body;
  const description = req.body.description ?? null;

  try {
    const {
      rows: [id],
    } = await insertPostRepository(userId, link, description);
    return res.status(201).send(id);
  } catch (err) {
    return res.status(500).send(err.message);
  }
}

export async function putLinkController(req, res) {
  const { id: postId } = req.params;
  const { description } = req.body;

  try {
    await putLinkRepository(description, postId);
    return res.sendStatus(200);
  } catch (err) {
    return res.status(500).send(err.message);
  }
}

export async function deleteLinkController(req, res) {
  const { id: postId } = req.params;

  try {
    await deleteLinkRepository(postId);
    return res.sendStatus(200);
  } catch (err) {
    return res.status(500).send(err.message);
  }
}

export async function getPostsByHashtag(req, res) {
  let responseSent = false;
  const { hashtag } = req.params;
  const user_id = res.locals.userId;
  const {refresh_type, timestamp} = req.body
  try {
    const { rows: posts } = await getPostByHashtagRepository(hashtag, refresh_type, timestamp);
    const morePostsInfos = [];

    for (let i = 0; posts.length > i; i++) {
      let liked = false;
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
    if (!responseSent) res.status(500).send(err);
    console.log(err);
  }
}

export async function repostLinkController(req, res) {
  try {
    const { user_id, post_id } = req.body

    repostLinkRepository(user_id,post_id)

    repostInPosts(user_id,post_id)

    res.status(201).send("ok");
  } catch (error) {
    res.status(500).send(error.message);
  }
}
