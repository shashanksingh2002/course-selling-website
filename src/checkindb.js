const { ObjectId } = require("mongodb");

module.exports = {
  addUser: (db, who, user, cb) => {
    // Add a user to the specified collection in the database
    return db.collection(who)
      .insertOne(user)
      .then(id => cb(0, id))
      .catch(err => cb(1, err));
  },
  
  isAdmin: (req, res, next) => {
    // Middleware function to check if the user is an admin
    if (req.body.isAdmin) return next();
    else return res.json({ 'message': 'Need to be admin to access page' });
  },
  
  addCourseIndb: (db, req) => {
    // Add a course to the database
    const dbBody = {
      courseName: req.body.courseName,
      courseAuthor: req.body.courseAuthor,
      price: req.body.price,
      imgLink: req.body.link
    };
    
    return db.collection('courses')
      .insertOne(dbBody)
      .then(data => data)
      .catch(err => err);
  },
  
  dbCourseUpdate: (id, req, res, db) => {
    // Update a course in the database
    if (!ObjectId.isValid(id)) {
      return { 'Message': 'Please enter a valid ID' };
    }
    
    const update = req.body.update;
    
    return db.collection('courses')
      .updateOne({ _id: new ObjectId(id) }, { $set: update })
      .then(data => {
        if (data.matchedCount === 0) return { 'Message': 'ID does not exist in the database' };
        return data;
      })
      .catch(err => console.error(err));
  },
  
  getCoursesFromDb: (req, db) => {
    let data = [];
    
    // Retrieve all courses from the database
    return db.collection('courses')
      .find()
      .forEach(d => data.push(d))
      .then(() => data)
      .catch(err => console.error(err));
  }
};
