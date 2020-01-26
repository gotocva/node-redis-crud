# node-redis-crud

A simple crud application with nodejs framework and redis database

Make sure Redis is running on your local machine and you have nodejs framework installed

## How to use

`git clone https://github.com/gotocva/node-redis-crud.git`

`cd node-redis-crud`

run `npm install`

to start application, run `npm start`


Application is running on http://localhost:8080/

### api to call

*Add User*

[POST] http://localhost:8080/user

request body -> id,firstname, lastname, age

*Get User By ID*

[GET] http://localhost:8080/user/:id

*Update User*

[PUT] http://localhost:8080/user/:id

request body -> firstname, lastname, age

*Delete User*

[DELETE] http://localhost:8080/user/:id

```
### fork,issues,pull request all are welcome
```