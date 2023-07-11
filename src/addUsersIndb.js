module.exports = {
    addUser: (db,who,user,cb) => {
        db.collection(who)
        .insertOne(user)
        .then(id => cb(0,id))
        .catch(err => cb(1,err))
    }
}