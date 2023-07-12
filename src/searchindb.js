module.exports = {
    searchInDbForEmail: (req,db,who) => {
        const body = {
            'email':req.body.email
        }
        return db.collection(who)
        .findOne(body)
        .then(found => {
            return (found)?true:false;
        })
        .catch(err => console.error(err));
    },
    getUserDetails: (req,db,who) => {
        let dataArr = [];
        return db.collection(who)
               .find({email:req.body.email},{password:1,_id:1})
               .forEach(data => {
                dataArr.push(data);
               })
               .then(()=>{
                return dataArr;
               })
               .catch(err => console.error(err))
    }
};