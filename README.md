
# Eventer Backend

## Required Versions
Node.js version >= 8.x
npm version >= 3

## Project Install
npm install

## Global Install
npm install -g --save \<package-name>

## Project Run Method (in project route)
npm start

## Project Dependencies
**Js Lib**
-   bcrypt
-   body-parser
-   express
-   googleapis
-   jsonwebtoken
-   mongoose
-   morgan
-   multer
-  request

## End Points
**User Actions**
- /users 
++ **get** : Get all users
++ **post** : Add new user

- /users/:id
++ **get** : Get a user info

- /users/login
++ **post** : Login

- /users/signup
++ **post** : Signup

- /users/verify
-- **post** : Email verify

- /users/update/:id
++ **post** : Update a user infos

- /users/delete/:id
++ **post** : Delete a user

**Event Actions**
- /events
++ **get** : Get all events
++ **post** : Add a new event

- /events/:id
++ **get** : Get a event info

- /events/update/:id
++ **post** : Update an event infos

- /events/delete/:id
++ **post** : Delete an event

**Club Actions**
- /clubs
++ **get** : Get all student clubs
++ **post** : Add a new student club

- /clubs/:id
++ **get** : Get a student club infos

- /clubs/update/:id
++ **post** : Update a student club infos

- /clubs/delete/:id
++ **post** : Delete a student club

**School Actions**
- /school
-- **get** : Get school
++ **post**: Add a new school

- /school/:id
-- **get** : Get a school infos

- /school/update/:id
-- **post** : Update a school infos

- /school/delete/:id
-- **post** : Delete a school

- /school/faculty
-- **get** : Get all faculties 
-- **post**: Add a new faculty

- /school/faculty/:id
-- **get** : Get a faculty infos

- /school/faculty/update/:id
-- **post** : Update a faculty infos

- /school/faculty/delete/:id
-- **post** : Delete a faculty

- /school/department
-- **get** : Get all departments 
-- **post**: Add a new department

- /school/department/:id
-- **get** : Get a department infos

- /school/department/update/:id
-- **post** : Update a department infos

- /school/department/delete/:id
-- **post** : Delete a department

> if there is **--** on a method, it's mean it is **not** done yet
> if there is **++** on a method, it's mean it is done