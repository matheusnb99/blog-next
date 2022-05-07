import UserModel from "../db/models/UserModel.js";
import hashPassword from "../hashPassword.js";

export const users_get_list = async (req, res) => {
  const users = await UserModel.query()
    .select("id", "email", "firstName", "lastName", "telNumber", "birthDate", "emailValidation")
    .where("deleted_at", null);
  res.send(users);
};

export const users_get_description = async (req, res) => {
  const {
    params: { userId },
    session: { userId: sessionUserId },
  } = req;

  if (Number(userId) !== sessionUserId) {
    console.log(sessionUserId);
    res.status(403).send({ error: "forbidden" });

    return;
  }

  const user = await UserModel.query().findById(userId);
  if (!user) {
    res.status(404).send({ error: "not found" });
    return;
  }
  res.send(user);
};

export const users_update = async (req, res) => {
  const {
    params: { userId: rawuserId },
    body: { email, password },
  } = req;
  const userId = Number(rawuserId);
  const user = await UserModel.query().findById(userId);
  if (!user) {
    res.status(404).send({ error: "not found" });
  }

  const [passwordHash, passwordSalt] = hashPassword(password);

  await user.$query().where({ id: userId }).update({
    email,
    passwordHash,
    passwordSalt,
  });

  res.send({ message: "success" });
};

export const users_delete = async (req, res) => {
  const {
    params: { userId: rawuserId },
  } = req;
  const userId = Number(rawuserId);

  const user = await UserModel.query().findById(userId);
  if (!user) {
    res.status(404).send({ error: "not found" });
  }
  await user.$query().where({ id: userId }).update({
    deleted_at: new Date(),
  });
  res.send({ message: "success" });
};
