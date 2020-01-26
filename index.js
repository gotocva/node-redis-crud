const express = require('express');
const bodyParser = require('body-parser');
const Redis = require("./redis");

const redis = new Redis();
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Authorization, Origin, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

const resp = function (res, data, code, next) {
    res.status(code).json(data);
    return next();
};
 
app.post('/user', function (req, res, next) {

    const data = req.body;
    const id = data.id;
    const extract = {
        id: id,
        firstname: data.firstname,
        lastname: data.lastname,
        age: data.age
    };
    redis.add_set({key: {"id": id}, data: extract}, function (response) {
        if (response){
            res.status(200).json({err: false, responseonse: "Data was added successfully "});
        }else{
            res.status(400).json({err: true, responseonse: "User was not added successfully "});
        }
    });

});

app.get('/user/:id', function (req, res, next) {

    redis.get_set({"id": req.params.id}, null, function (response) {
        if (response){
            res.status(200).json({err: false, responseonse: "User found successfully", data: response});
        }else{
            res.status(400).json({err: true, responseonse: "User was not found", data: null});
        }
    });
});

app.put('/user/:id', function (req, res, next) {
    const id = req.params.id;
    const data = req.body;
    redis.add_set({key: {"id": id}, data: data}, function (response) {
        if (response){
            res.status(200).json({err: false, responseonse: "User was updated successfully "});
        }else{
            res.status(400).json({err: true, responseonse: "User was not updated successfully "});
        }
    });
});

app.delete('/user/:id', function (req, res, next) {

    redis.delete_set({"id": req.params.id}, function (response) {
        if (response){
            res.status(200).json({err: false, responseonse: "User was deleted successfully "});
        }else{
            res.status(400).json({err: true, responseonse: "No user found with ID"});
        }
    });

});

app.listen(8080);