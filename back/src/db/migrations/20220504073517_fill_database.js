import faker from "faker";
import "utf8";
import hashPassword from "../../hashPassword.js";

const rand = (min, max) => Math.floor(Math.random() * max - min + 1 + min);

export const up = async (knex) => {
  await knex("roles").insert([{ label: "user" }, { label: "author" }, { label: "admin" }]);

  const categories = await knex("categories")
    .insert(
      [...new Array(3)].map(() => ({
        name: faker.animal.crocodilia(),
      }))
    )
    .returning("*");

  const [passwordHash, passwordSalt] = hashPassword("password");

  const users = await knex("users")
    .insert(
      [...new Array(3)].map(() => ({
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        birthDate: faker.time.recent("date"),
        email: faker.name.middleName() + faker.animal.crocodilia() + "@gmail.com",
        passwordHash: Buffer.from(passwordHash, "utf-8").toString("hex"),
        passwordSalt: passwordSalt,
        role_id: 1,
      }))
    )
    .returning("*");

  const products = await knex("posts")
    .insert(
      [...new Array(3)].map(() => ({
        title: faker.commerce.productName(),
        content: faker.commerce.productDescription(),
        userId: users[rand(0, categories.length - 1)].id,
        category_id: categories[rand(0, categories.length - 1)].id,
      }))
    )
    .returning("id");
  console.log(categories[0].id);
};

export const down = async (knex) => {
  await knex("posts").del();
  await knex("categories").del();
  await knex("users").del();
  await knex("roles").del();
};
