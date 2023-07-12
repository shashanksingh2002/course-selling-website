const { hashPassword, cmpHashedPassword } = require('../src/bcrypt');
const { searchInDbForEmail, getUserDetails } = require('../src/searchindb');
const { addUser, addCourseIndb, dbCourseUpdate, getCoursesFromDb } = require('../src/checkindb');
const { createJWT } = require('../src/jwt');

module.exports = {
  adminSignup: async (req, res, db) => {
    // Search if the email is already present in the database
    const checkInDb = await searchInDbForEmail(req, db, 'admin');
    
    // If the email is already present, redirect to login
    if (checkInDb) {
      return res.status(200).json({ 'Message': 'Admin Already Exists. Please login.' });
    }
    
    // If the email is not present, create a new admin account
    else {
      // Hash the password before storing it in the database
      const hashedPassword = await hashPassword(req.body.password);
      const user = {
        email: req.body.email,
        password: hashedPassword
      };
      
      // Add the admin user to the database
      addUser(db, 'admin', user, (err, user) => {
        if (err) return res.status(501).json({ 'Error in creating user': err });
        else {
          return res.status(200).json(user);
        }
      });
    }
  },
  
  adminLogin: async (req, res, db) => {
    // Check if the email is present in the database
    const checkInDbEmail = await searchInDbForEmail(req, db, 'admin');
    
    // If the email is not found, redirect to sign up
    if (!checkInDbEmail) return res.status(404).json({ 'Message': 'Please sign up. Email not found.' });
    
    // Get user details for checking the password
    const getUser = await getUserDetails(req, db, 'admin');
    
    // Check if the password is correct
    const checkPassword = await cmpHashedPassword(req.body.password, getUser[0].password);
    
    // If the password is incorrect, return an error message
    if (!checkPassword) return res.status(404).json({ 'Message': 'Incorrect password. Please try again.' });
    
    // If the password is correct, create a JWT token for authentication
    const jwt = await createJWT(getUser[0]._id);
    
    // Set the JWT token as a cookie
    res.cookie('jwt', jwt, {
      maxAge: 1000 * 60 * 60 * 24,
      httpOnly: true
    });
    
    // Return the JWT token and a success message
    return res.status(200).json({ 'jwt': jwt, 'message': 'Successfully logged in.' });
  },
  
  addCourse: async (req, res, db) => {
    // Add a new course to the database
    const addCourse = await addCourseIndb(db, req);
    
    // Return the added course and a success message
    res.status(200).json({
      'Course': addCourse,
      'message': 'Course added successfully.'
    });
  },
  
  updateCourse: async (req, res, db) => {
    const id = req.params.courseId;
    
    // Update the course in the database
    const update = await dbCourseUpdate(id, req, res, db);
    
    // Return the result of the update operation
    res.json({ 'updationResult': update });
  },
  
  getCourses: async (req, res, db) => {
    // Get the courses from the database
    const data = await getCoursesFromDb(req, db);
    
    // Return the retrieved courses
    res.json({ 'Data': data });
  }
};
