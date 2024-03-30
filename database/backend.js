const { MongoClient } = require('mongodb');


//Fill your own Mongodb uri
const uri = 'mongodb+srv://shashanksingh:Qwerty2002@cluster0.a6k5yop.mongodb.net/';
const dbName = 'course-selling-website';


// creation of db
module.exports = {
    createDb: (cb) => {
        MongoClient.connect(uri)
        .then(client => cb(1, client.db(dbName)))
        .catch(err => cb(0, err))
    }
}
