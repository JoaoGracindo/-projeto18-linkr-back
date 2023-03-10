import {
  insertPostRepository,
  getTimelineRepository,
  putLinkRepository,
  deleteLinkRepository,
  getPostByHashtagRepository,
} from "../repositories/postRepository.js";
import { getLikesRepository } from "../repositories/getUserByIdRepository.js";

export async function getTimelineController(req, res) {
  try {
    const { rows: timeline } = await getTimelineRepository();
    const likes = [];
    for (let i = 0; timeline.length > i; i++) {
      const {count: {rows: [count]}, users: {rows: users}} = await getLikesRepository(timeline[i].id);
      
      const names = users.map(user => user.name)
      likes.push({
        count: count.count,
        users: names
      });
    }
    const results = [];
    for (let i = 0; timeline.length > i; i++) {
      results.push({ ...timeline[i], likersNames: likes[i].users, likesCount: likes[i].count });
    }

    return res.status(200).send(results);
  } catch (err) {
    return res.status(500).send(err.message);
  }
}

export async function postLinkController(req, res) {
  const { userId } = res.locals;
  const { link } = req.body;
  const description = req.body.description ?? null;

  try {
    await insertPostRepository(userId, link, description);
    return res.sendStatus(201);
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
  const { hashtag } = req.params;
  try {
    const { rows: userInfos } = await getPostByHashtagRepository(hashtag);
    const likes = [];
    for (let i = 0; userInfos.length > i; i++) {
      const {count: {rows: [count]}, users: {rows: users}} = await getLikesRepository(userInfos[i].id);
      
      const names = users.map(user => user.name)
      likes.push({
        count: count.count,
        users: names
      });
    }
    const results = [];
    for (let i = 0; userInfos.length > i; i++) {
      results.push({ ...userInfos[i], likersNames: likes[i].users, likesCount: likes[i].count });
    }

    return res.status(200).send(results);
  } catch (err) {
    console.log(err);
    return res.status(500).send(err.message);
  }
}