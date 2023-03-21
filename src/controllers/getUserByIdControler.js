import {
  getLikesRepository,
  getUserByIdRepository,
} from "../repositories/getUserByIdRepository.js";

export async function getUserByIdController(req, res) {
  const { id } = req.params;
  try {
    const { rows: userInfos } = await getUserByIdRepository(id);
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
// names.map((name) => {
//           return name.name;
//         }
