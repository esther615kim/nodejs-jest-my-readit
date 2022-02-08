<h1 align="center"> MyReadit</h1><p align="center">
<div align="center">
<img src="https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E" alt="JavaScript"/> <img src="https://img.shields.io/badge/Express.js-0F9A41?style=for-the-badge&logo=express" alt="Express" /> <img src="https://img.shields.io/badge/Postgres-32668E?style=for-the-badge&logo=postgresql&logoColor=FFF" alt="Postgres" /> <img src="https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest" alt="Jest" /> 
<p align="center">TDD-based restful APIs project </p>
<p align="center"><a href="https://ek-reddit.herokuapp.com/articles">Heroku-hoisted server</a></p>


## Project

  The project environment of "MyReadit" has helped me broaden my JavaScript knowledge to the backend development. Throughout the project, I've learned how to Juggle and apply a couple of newly-learned concepts such as SQL databases, TDD workflow, and the MVC pattern into a real-world project, which made me feel increadibly rewarded when I completed most of the listed APIs.


##  How to Run

- Click [here](https://ek-reddit.herokuapp.com/articles) to view the deployed server to Heroku

- To run the app, clone the repo and run it with `npm install`. Create `.env` files and run the followings: `npm run dbs`. then, `npm run seed`.

- Finally, run `npm run test` to see the tests or `npm run dev` to run the server.

- minimum versions of `Node.js` and `Postgres` needed to run the project: 

## List of APIs 
| Status Method | ✅| Queries | 
| :--: | :-----------------: | :------------: |
| GET /api/topics |✅||  
|GET /api/articles/:article_id|✅|| 
|PATCH /api/articles/:article_id (inc_votes)|✅|| 
|GET /api/articles|✅|sort_by,order,topic| 
|GET /api/articles/:article_id/comments|✅|| 
|POST /api/articles/:article_id/comments|✅|| 
|DELETE /api/comments/:comment_id|✅|| 
|GET /api/users|✅|| 
|GET /api/users/:username|✅|| 
|PATCH /api/comments/:comment_id|✅|| 
|POST /api/articles (comment_count)|✅|| 
|GET /api/comments|✅|| 
|POST /api/topics|✅|| 
|DELETE /api/articles/:id (on delete cascade)|✅|| 
|GET /api|✏|| 

## Lessons  Learned

- How to design `SQL databases` and referencing tables

- How to maintain the `MVC` design pattern 

- How to write test code using various `jest matchers` and `supertest`

- How to use the docs or open-sourced materials to learn anything new 


## Ideas for Improvement

- [ ]  Add more test cases for 400s code
- [ ]  Pagination  middleware


## Special Thanks
to Duncan-NC and Hamas
