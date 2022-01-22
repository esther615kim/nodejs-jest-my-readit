### **GET /api/topics**

Responds with:

- an array of topic objects, each of which should have the following properties:
    - `slug`
    - `description`

---

### **GET /api/articles/:article_id**

Responds with:

- an article object, which should have the following properties:
    - `author` which is the `username` from the users table
    - `title`
    - `article_id`
    - `body`
    - `topic`
    - `created_at`
    - `votes`
    - `comment_count` which is the total count of all the comments with this article_id - you should make use of queries to the database in order to achieve this

---

### **PATCH /api/articles/:article_id**

Request body accepts:

- an object in the form `{ inc_votes: newVote }`
    - `newVote` will indicate how much the `votes` property in the database should be updated by
    
    e.g.
    
    `{ inc_votes : 1 }` would increment the current article's vote property by 1
    
    `{ inc_votes : -100 }` would decrement the current article's vote property by 100
    

Responds with:

- the updated article

---

### **GET /api/articles**

Responds with:

- an `articles` array of article objects, each of which should have the following properties:
    - `author` which is the `username` from the users table
    - `title`
    - `article_id`
    - `topic`
    - `created_at`
    - `votes`
    - `comment_count` which is the total count of all the comments with this article_id - you should make use of queries to the database in order to achieve this

Should accept queries:

- `sort_by`, which sorts the articles by any valid column (defaults to date)
- `order`, which can be set to `asc` or `desc` for ascending or descending (defaults to descending)
- `topic`, which filters the articles by the topic value specified in the query

---

### **GET /api/articles/:article_id/comments**

Responds with:

- an array of comments for the given `article_id` of which each comment should have the following properties:
    - `comment_id`
    - `votes`
    - `created_at`
    - `author` which is the `username` from the users table
    - `body`

---

### **POST /api/articles/:article_id/comments**

Request body accepts:

- an object with the following properties:
    - `username`
    - `body`

Responds with:

- the posted comment

---

### **DELETE /api/comments/:comment_id**

Should:

- delete the given comment by `comment_id`

Responds with:

- status 204 and no content

---

### **GET /api**

Responds with:

- JSON describing all the available endpoints on your API, see the [endpoints.json](https://github.com/northcoders/be-nc-news/blob/main/endpoints.json) for an (incomplete) example that you could build on, or create your own from scratch!

---

### **STOP POINT: Hosting and README!**

- If you *have* already hosted your app at this point, remember to push up to `heroku` your updated code
- If you haven't already hosted your app, now is the time! Follow the instructions in [hosting.md](https://github.com/northcoders/be-nc-news/blob/main/hosting.md)
- Write your README, including the following information:
    - [ ]  Link to hosted version
    - [ ]  Write a summary of what the project is
    - [ ]  Provide clear instructions of how to clone, install dependencies, seed local database, and run tests
    - [ ]  Include information about how to create the two `.env` files
    - [ ]  Specify minimum versions of `Node.js` and `Postgres` needed to run the project

**Remember that this README is targetted at people who will come to your repo (potentially from your CV or portfolio website) and want to see what you have created, and try it out for themselves(not *just* to look at your code!). So it is really important to include a link to the hosted version, as well as implement the above `GET /api` endpoint so that it is clear what your api does.**

---

### **Further Routes**

### **GET /api/users**

Responds with:

- an array of objects, each object should have the following property:
    - `username`

---

### **GET /api/users/:username**

Responds with:

- a user object which should have the following properties:
    - `username`
    - `avatar_url`
    - `name`

---

### **PATCH /api/comments/:comment_id**

Request body accepts:

- an object in the form `{ inc_votes: newVote }`
    - `newVote` will indicate how much the `votes` property in the database should be updated by
    
    e.g.
    
    `{ inc_votes : 1 }` would increment the current comment's vote property by 1
    
    `{ inc_votes : -1 }` would decrement the current comment's vote property by 1
    

Responds with:

- the updated comment

---

### ***Even more* endpoints/tasks**

### **Adding pagination to GET /api/articles - adding pagination**

> To make sure that an API can handle large amounts of data, it is often necessary to use pagination. Head over to Google, and you will notice that the search results are broken down into pages. It would not be feasible to serve up all the results of a search in one go. The same is true of websites / apps like Facebook or Twitter (except they hide this by making requests for the next page in the background, when we scroll to the bottom of the browser). We can implement this functionality on our /api/articles and /api/comments endpoints.
> 
- Should accepts the following queries:
    - `limit`, which limits the number of responses (defaults to 10)
    - `p`, stands for page which specifies the page at which to start (calculated using limit)
- add a `total_count` property, displaying the total number of articles (**this should display the total number of articles with any filters applied, discounting the limit**)

---

### **Adding pagination to GET /api/articles/:article_id/comments**

Should accept the following queries:

- `limit`, which limits the number of responses (defaults to 10)
- `p`, stands for page which specifies the page at which to start (calculated using limit)

---

### **POST /api/articles**

Request body accepts:

- an object with the following properties:
    - `author` which is the `username` from the users table
    - `title`
    - `body`
    - `topic`

Responds with:

- the newly added article, with all the above properties as well as:
    - `article_id`
    - `votes`
    - `created_at`
    - `comment_count`

### **POST /api/topics**

Request body accepts:

- an object in the form:

`{
  "slug": "topic name here",
  "description": "description here"
}`

Responds with:

- a topic object containing the newly added topic

### **DELETE /api/articles/:article_id**

Should:

- delete the given article by article_id

Respond with:

- status 204 and no content

### **Further Routes**

### **GET /api/users**

Responds with:

- an array of objects, each object should have the following property:
    - `username`

---

### **GET /api/users/:username**

Responds with:

- a user object which should have the following properties:
    - `username`
    - `avatar_url`
    - `name`

---

### **PATCH /api/comments/:comment_id**

Request body accepts:

- an object in the form `{ inc_votes: newVote }`
    - `newVote` will indicate how much the `votes` property in the database should be updated by
    
    e.g.
    
    `{ inc_votes : 1 }` would increment the current comment's vote property by 1
    
    `{ inc_votes : -1 }` would decrement the current comment's vote property by 1
    

Responds with:

- the updated comment

---

### ***Even more* endpoints/tasks**

### **Adding pagination to GET /api/articles - adding pagination**

> To make sure that an API can handle large amounts of data, it is often necessary to use pagination. Head over to Google, and you will notice that the search results are broken down into pages. It would not be feasible to serve up all the results of a search in one go. The same is true of websites / apps like Facebook or Twitter (except they hide this by making requests for the next page in the background, when we scroll to the bottom of the browser). We can implement this functionality on our /api/articles and /api/comments endpoints.
> 
- Should accepts the following queries:
    - `limit`, which limits the number of responses (defaults to 10)
    - `p`, stands for page which specifies the page at which to start (calculated using limit)
- add a `total_count` property, displaying the total number of articles (**this should display the total number of articles with any filters applied, discounting the limit**)

---

### **Adding pagination to GET /api/articles/:article_id/comments**

Should accept the following queries:

- `limit`, which limits the number of responses (defaults to 10)
- `p`, stands for page which specifies the page at which to start (calculated using limit)

---

### **POST /api/articles**

Request body accepts:

- an object with the following properties:
    - `author` which is the `username` from the users table
    - `title`
    - `body`
    - `topic`

Responds with:

- the newly added article, with all the above properties as well as:
    - `article_id`
    - `votes`
    - `created_at`
    - `comment_count`

### **POST /api/topics**

Request body accepts:

- an object in the form:

`{
  "slug": "topic name here",
  "description": "description here"
}`

Responds with:

- a topic object containing the newly added topic

### **DELETE /api/articles/:article_id**

Should:

- delete the given article by article_id

Respond with:

- status 204 and no content