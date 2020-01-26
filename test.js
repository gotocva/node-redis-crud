const Redis = require("./redis");
const redis = new Redis();

let data = {};
data.id = 25;
data.firstname = 'siva';
data.lastname = 'bharathy';
data.age = 25;

var id = data.id;
        var extract = {
            id: id,
            firstname: data.firstname,
            lastname: data.lastname,
            age: data.age
        };

        redis.add_set({key: {"id": id}, data: extract}, function (resp) {
            if (resp){
                console.log({err: false, response: "Data was added successfully "}, 200);
            }else{
                console.log({err: true, response: "User was not added successfully "}, 400);
            }
        })


