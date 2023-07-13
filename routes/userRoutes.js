const { hashPassword, cmpHashedPassword } = require('../src/bcrypt');
const { searchInDbForEmail, getUserDetails, searchCourseInDb, searchCourseInUsers } = require('../src/searchindb');
const { addUser } = require('../src/checkindb');
const { createJWT } = require('../src/jwt');
const { ObjectId } = require("mongodb");

module.exports = {
    userSignup: async(req,res,db) => {
        // Search if the email is already present in the database
        const checkInDb = await searchInDbForEmail(req, db, 'users');
    
        // If the email is already present, redirect to login
        if (checkInDb) {
            return res.status(200).json({ 'Message': 'User Already Exists. Please login.' });
        }
    
        // If the email is not present, create a new user account
        else {
            // Hash the password before storing it in the database
            const hashedPassword = await hashPassword(req.body.password);
            const user = {
                email: req.body.email,
                password: hashedPassword,
                courses: []
            };
      
            // Add the user to the database
            addUser(db, 'users', user, (err, user) => {
                if (err) return res.status(501).json({ 'Error in creating user': err });
                else {
                return res.status(200).json(user);
                }
            });
        }
    },
    userLogin: async (req, res, db) => {
        // Check if the email is present in the database
        const checkInDbEmail = await searchInDbForEmail(req, db, 'users');
        
        // If the email is not found, redirect to sign up
        if (!checkInDbEmail) return res.status(404).json({ 'Message': 'Please sign up. Email not found.' });
        
        // Get user details for checking the password
        const getUser = await getUserDetails(req, db, 'users');
        
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
    purchaseCourse: async(req,res,db) => {
        const id = req.params.courseId;

        //check if id is valid
        if(!ObjectId.isValid(id)){
            return res.json({'message':'Please enter a valid course id'});
        }


        //check if course is present
        const isCoursePresent = await searchCourseInDb(id,db);
        if(!isCoursePresent){
            return res.json({'message':'No such course present in the database'});
        }


        //check if course is not already purchased by the user
        const isAlreadyPurchased = await searchCourseInUsers(id,db,req);
        if(isAlreadyPurchased){
            return res.json({'message':'This course is already purchased'});
        }
        return db.collection('users')
                .updateOne({email:req.body.email},{$push:{courses:id}})
                .then(data => res.json({'data':data,'message':'course added succesfully'}))
                .catch(err => console.error(err));
    },
    purchasedCourseByUser: (req,res,db) => {
        let dataArr = [];
        return db.collection('users')
                .find({email:req.body.email},{courses:1})
                .forEach(d => dataArr.push(d.courses))
                .then(() => res.json({'data':dataArr,'Message':'All courses retrived successfully'}));
    }
}