import { getUsersRepository } from "../repositories/getUsersRepository.js";

export async function getUsersController(req, res) {
  const { nameSearched } = req.params;
  

  try {
    const { rows: users } = await getUsersRepository(nameSearched);

    return res.status(200).send(users);
  } catch (err) {
    console.log(err);
    return res.status(500).send(err.message);
  }
}
