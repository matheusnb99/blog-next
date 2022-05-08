export const up = async (knex) => {
  await knex.schema.createTable("roles", (table) => {
    table.increments("id").notNullable().unique()
    table.text("label").notNullable()
  })
  await knex.schema.createTable("users", (table) => {
    table.increments("id")
    table.text("email").notNullable().unique()
    table.text("firstName")
    table.text("lastName")
    table.text("telNumber")
    table.date("birthDate")
    table.boolean("emailValidation")
    table.datetime("deleted_at").defaultTo(null)
    table.text("passwordHash").notNullable()
    table.text("passwordSalt").notNullable()
    table.integer("role_id").notNullable()
    table.foreign("role_id").references("id").inTable("roles").onDelete("SET NULL")
  })
  await knex.schema.createTable("categories", (table) => {
    table.increments("id")
    table.text("name").notNullable()
  })

  await knex.schema.createTable("posts", (table) => {
    table.increments("id")
    table.text("title").notNullable()
    table.text("content").notNullable()
    table.integer("userId").notNullable()
    table.foreign("userId").references("id").inTable("users")
    table.datetime("created_at").notNullable().defaultTo(knex.fn.now())
    table.datetime("deleted_at").defaultTo(null)
    table.integer("category_id")
    table.foreign("category_id").references("id").inTable("categories").onDelete("SET NULL")
  })
  await knex.schema.createTable("comments", (table) => {
    table.increments("id")
    table.text("content").notNullable()
    table.integer("userId").notNullable()
    table.integer("post_id").notNullable()
    table.datetime("deleted_at").defaultTo(null)
    table.foreign("userId").references("id").inTable("users").onDelete("SET NULL")
    table.foreign("post_id").references("id").inTable("posts").onDelete("SET NULL")
    table.datetime("created_at").notNullable().defaultTo(knex.fn.now())
  })
}

export const down = async (knex) => {
  await knex.schema.dropTable("roles")
  await knex.schema.dropTable("comments")
  await knex.schema.dropTable("posts")
  await knex.schema.dropTable("categories")
  await knex.schema.dropTable("users")
}
