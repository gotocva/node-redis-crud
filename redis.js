
const redis = require('redis');

class Redis {
    
    constructor(){
        this.data;
        this.dset;
        this.callback;
        this.key;
        this.field;
        this.config = {
            host: "127.0.0.1",
            port: "6379",
            password: "padma",
            db: "4",
            socket: ""
        };
        this.conn = this.connect();
    }

    connect(){
        this.connection = redis.createClient(this.config.port, this.config.host);
        this.connection.auth(this.config.password, function () {
            console.log('Authenticated...');
        });
        this.connection.select(this.config.db,function(err,resp){
            console.log(resp);
        });
        
        this.connection.on('error', function(err) {
            console.log('Error Connecting: '+err);
        });
        return this.connection;
    }

    _key_generator(data){
        var keys = Object.keys(data);
        return keys[0]+':'+data[keys[0]];
    }

    add_set(dset,callback){
        var key = this._key_generator(dset.key);
        this.conn.hmset(key,dset.data,function(err,data){
            if(err) return callback(err);
            else{
                return callback(true);
            }
        });
    }

    get_set(key, field,callback){
        var keygen = this._key_generator(key);
        this.conn.hgetall(keygen, function(err,data){
            if(err) return false;
            else {
                if (field) {
                    data = data.field;
                }
                return callback(data);
            }
        }); 
    }

    delete_set(key,callback){
        this.conn.del(this._key_generator(key),function(err,reply){
            if(err) return false;
            else
                return callback(reply);
        });
    }

}

module.exports = Redis;