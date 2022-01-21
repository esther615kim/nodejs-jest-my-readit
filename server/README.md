# 📘 Backend Server

## **Stack Used**

Node.js

Express

PSQL([node-postgres](https://node-postgres.com/))

Jest

## **1  Setup**

- `.env` files: `.env.test` and `.env.development`
- `index.js` files in data folders have the following data: `topicData`,`articleData`,`userData`,`commentData`

## **2 Tables and Seeding**

- tables created and the data from the database is seeded
- `connection.js` is used to connect the database

### **Tables**

- `topics`, `articles`, `users` and `comments`

Each topic has

- `slug` field which is a unique string that acts as the table's primary key
- `description` field which is a string giving a brief description of a given topic

Each user has

- `username` which is the primary key & unique
- `avatar_url`
- `name`

Each article has

- `article_id` which is the primary key
- `title`
- `body`
- `votes` defaults to 0
- `topic` field which references the slug in the topics table
- `author` field that references a user's primary key (username)
- `created_at` defaults to the current timestamp

Each comment has

- `comment_id` which is the primary key
- `author` field that references a user's primary key (username)
- `article_id` field that references an article's primary key
- `votes` defaults to 0
- `created_at` defaults to the current timestamp
- `body`

### **Seeding**

- `seed.js` and `seed-formatting.js` in seed folder

---

## **3 Endpoints**

- different environments set for test and development

---

**Endpoints created in the project**

`GET /topics`

`DELETE /topics`

`POST /topics`

`GET /articles ☂`

`GET /articles/:article_id`

`PATCH /articles/:article_id`

`DELETE /articles/:article_id`

`POST /articles/:article_id`

`GET /comments`

`GET/articles/:article_id/comments`

`POST /articles/:article_id/comments`

`DELETE /comments/:comment_id`

`PATCH /comments/:comment_id`

`GET /users
GET /users/:username`
`GET /api☂`

---

### **Routes**

- Click Routes APIs description file

### **Hosting**

- Write your README, including the following information:
    - [ ]  Link to hosted version
    - [x]  Write a summary of what the project is
    - [ ]  Provide clear instructions of how to clone, install dependencies, seed local database, and run tests
    - [ ]  Include information about how to create the two `.env` files
    - [ ]  Specify minimum versions of `Node.js` and `Postgres` needed to run the project