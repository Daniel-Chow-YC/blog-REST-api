# Project: RESTful Blog API

## Aims
- To create a RESTful API
- The blog should have posts, comments and users (who are the authors and who have admin rights)

## About the project
- Anybody can access the blog posts and comments, and can create comments on the posts
- Only users (admins) can access certain routes ie create a post, update or delete a post, delete a comment etc...
- Users can access these posts using JSON Web Tokens
- Users get a Web Token upon a successful login
- bcryptjs is used to hash and salt the user's password before it is stored in Mongodb