# BE Northcoders NC News Portfolio Check List
 
## Left To-Dos:  40 as of(2022/01/28)

- [🌱] Reorganise repo - take everything out of the server folder and into the root directory (not necessary to take everything but stuff like README/ package.json etc should be root level :)
- [ ] Move all your endpoint testing into app.test and have your utils testing in a utils.test
- [ ] Make tests more specific - tests the contents of an array instead of just whether it is an array

## Readme - Remove the one that was provided and write your own

- [ ] Link to hosted version
- [ ] Write a summary of what the project is
- [ ] Provide clear instructions of how to clone, install dependencies, seed local database, and run tests
- [ ] Include information about how to create `.env.test` and `.env.development` files
- [ ] Specify minimum versions of `Node.js` and `Postgres` needed to run the project

## General

- [ ] Remove any unnecessary `console.logs` and comments
- [ ] Remove all unnecessary files (e.g. old `README.md`, `error-handling.md`, `hosting.md`, `./db/utils/README.md` etc.)
- [✅] Functions and variables have descriptive names

## Creating tables

- [🌱] Use `NOT NULL` on required fields

      I'd recommend using more NOT NULLS on pretty much every column - even if there a default this can still be overwritten. This can otherwise lead to bugs in the front end!

- [✅] Default `created_at` in articles and comments tables to the current date:`TIMESTAMP DEFAULT NOW()`

## Inserting data

- [✅] Drop tables and create tables in seed function in correct order
- [✅] Make use of pg-format to insert data in the correct order

## Tests

      I'm finding the repo a little bit difficult to navigate so I'd recommend rearranging the test files so that all the endpoint testing is within app.test.js and have a util.test.js for testing seed utils :)

      Also I'm noticing that some a the tests are quite vague - for example instead of just testing the response from an endpoint is an array we should instead be making assertions against the contents of the array. We could do this with a forEach :)

- [✅] Seeding before each test
- [ ] Descriptive `it`/`test` block descriptions
- [ ] If asserting inside a `forEach`, also has an assertion to check length is at least > 0
- [ ] Evidence of building up complex query endpoints using TDD
- [👨‍💻] Ensure all tests are passing 🌱articles
- [👨‍💻] Cover all endpoints and errors

- `GET /api/topics`
2022-01-26
  - [🌱] Status 200, array of topic objects

- `GET /api/articles/:article_id`

  - [✅] Status 200, single article object (including `comment_count`)
  - [🌱] Status 400, invalid ID, e.g. string of "not-an-id"
  - [🌱] Status 404, non existent ID, e.g. 0 or 9999 // SAME?

- `PATCH /api/articles/:article_id`

  - [✅] Status 200, updated single article object
  - [✅] Status 400, invalid ID, e.g. string of "not-an-id"

        Your test is expecting a 422

2022-01-27
  - [⚽] Status 400, invalid inc_votes type, e.g. property is not a number
  - [🌱] Status 404, non existent ID, e.g. 0 or 9999 // SAME?
  - [⚽] Status 200, missing `inc_votes` key. No effect to article.

- `GET /api/articles`

  - [✅] Status 200, array of article objects (including `comment_count`, excluding `body`)
  - [✅] Status 200, default sort & order: `created_at`, `desc`
  - [⚽] Status 200, accepts `sort_by` query, e.g. `?sort_by=votes`
  - [⚽] Status 200, accepts `order` query, e.g. `?order=desc`
  - [⚽] Status 200, accepts `topic` query, e.g. `?topic=coding`
  - [] Status 400. invalid `sort_by` query, e.g. `?sort_by=bananas`
  - [] Status 400. invalid `order` query, e.g. `?order=bananas`
  - [] Status 404. non-existent `topic` query, e.g. `?topic=bananas`
  - [] Status 200. valid `topic` query, but has no articles responds with an empty array of articles, e.g. `?topic=paper`

- `GET /api/articles/:article_id/comments`

  - [✅] Status 200, array of comment objects for the specified article
  - [ ] Status 400, invalid ID, e.g. string of "not-an-id"
  - [ ] Status 404, non existent ID, e.g. 0 or 9999
  - [ ] Status 200, valid ID, but has no comments responds with an empty array of comments

- `POST /api/articles/:article_id/comments`

  - [✅] Status 201, created comment object
  - [ ] Status 400, invalid ID, e.g. string of "not-an-id"
  - [ ] Status 404, non existent ID, e.g. 0 or 9999
  - [ ] Status 400, missing required field(s), e.g. no username or body properties
  - [✅] Status 404, username does not exist
  - [ ] Status 201, ignores unnecessary properties

- `DELETE /api/comments/:comment_id`

  - [✅] Status 204, deletes comment from database
  - [✅] Status 404, non existent ID, e.g 999
  - [ ] Status 400, invalid ID, e.g "not-an-id"

- `GET /api`

  - [ ] Status 200, JSON describing all the available endpoints

## Routing

- [✅] Split into api, topics, users, comments and articles routers
- [ ] Use `.route` for endpoints that share the same path

## Controllers

- [✅] Name functions and variables well

        I'd be tempted to be more descriptive with your getComments function name - It's only getting one articles comments and it's using the id so it could be called 'getCommentsByArticleId'

- [✅] Add catch blocks to all model invocations (and don't mix use of`.catch(next);` and `.catch(err => next(err))`)

## Models

- Protected from SQL injection
- [ ] Using parameterized queries for values in `db.query` e.g `$1` and array of variables

        Double check you've parameterized everything including sort_by - there's a string literal in article models which could be an issue :)

- [✅] Sanitizing any data for tables/columns, e.g. greenlisting when using template literals or pg-format's `%s`
- [✅] Consistently use either single object argument _**or**_ multiple arguments in model functions
- [✅] Use `LEFT JOIN` for comment counts

## Errors

- [✅] Use error handling middleware functions in app and extracted to separate directory/file

        Have a look at extracting your current error handling functions :)

- [✅] Consistently use `Promise.reject` in either models _**OR**_ controllers

## Extra Tasks - To be completed after hosting

- `GET /api/users`

  - [ ] Status 200, responds with array of user objects

- `GET /api/users/:username`

  - [ ] Status 200, responds with single user object
  - [ ] Status 404, non existent ID, e.g 999
  - [ ] Status 400, invalid ID, e.g "not-an-id"

- `PATCH /api/comments/:comment_id`

  - [ ] Status 200, updated single comment object
  - [ ] Status 400, invalid ID, e.g. string of "not-an-id"
  - [ ] Status 400, invalid inc_votes type, e.g. property is not a number
  - [ ] Status 404, non existent ID, e.g. 0 or 9999
  - [ ] Status 200, missing `inc_votes` key. No effect to comment.
