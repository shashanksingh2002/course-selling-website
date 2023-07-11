module.exports = {
    searchInDbForUserOrAdmin: (req,db,who) => {
        const body = req.body;
        return db.collection(who)
        .findOne(body)
        .then(found => {
            return (found)?true:false;
        })
        .catch(err => console.error(err));
    }
};