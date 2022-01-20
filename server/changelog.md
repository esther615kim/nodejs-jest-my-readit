# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html)

## Types of changes

- `Added` for new features
- `Changed` for changes in existing functionality
- `Installed` for newly installed libraries or etc
- `Removed` for now removed features
- `Fixed` for any bug fixes

## [Unreleased]

[to-dos]
GET /api/articles 🥦 add `comment_count`
GET /api/articles 🥦 add queries: `order`,`topic`
POST /api/articles/:article_id/comments 
  - `username`
  - `body`
POST /api/articles 
  - `author` which is the `username` from the users table
  - `title`
  - `body`
  - `topic`
POST /api/topics
  - `slug`
  - `description`

## [0.0.2] -2022-01-19
### Added
- essential endpoints and test codes

✅ GET /api/topics
✅ GET /api/articles/:article_id
✅ GET /api/articles
✅ GET /api/articles/:article_id/comments
✅ GET /api/users
✅ GET /api/users/:username
✅ PATCH /api/comments/:comment_id
✅ DELETE /api/comments/:comment_id (204)
✅ PATCH /api/comments/:comment_id

   DELETE /api/articles/:article_id (204)
   PATCH /api/articles/:article_id

- changelog.md to keep track of changes in my-reddit project
### Changed
- test file name from router.test.js to articles.test.js to specify the role
- package.json setting 
    "jest": {
    "setupFilesAfterEnv": ["jest-sorted"]
  }
### Fixed
- commentRouter test codes errors.
- path for commentRouter apis(REMOVE) from /articles/:id/comments to /comments/:id
### Installed
- jest-sorted

## [0.0.1] -2022-01-18
### Added
- server folder and basic settings
- topics, articles and users tables with required columns
- seeding files and test codes
### Installed
- npm i dotenv exporess nodemon pg pg-format supertest jest
### Fixed
- test(jest) setting errors

