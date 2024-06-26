//Requring Express libraries for server
const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = process.env.PORT || 3000;

//functions requirement
const { createDb } = require('./database/backend');
const { adminSignup, adminLogin, addCourse, updateCourse, getCourses} = require('./routes/adminRoutes');
const { userSignup, userLogin, purchaseCourse, purchasedCourseByUser} = require('./routes/userRoutes');
const { authenticateJWT } = require('./src/jwt');
const { isAdmin } = require('./src/checkindb');


//middlewares
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
app.use(authenticateJWT);
app.use('/admin/courses', isAdmin);
//databse key
let db = '';

//connect to database and start server
createDb((flag,data) => {
    if(flag){
        app.listen(port,() => {
            console.log('Database Connected and running server at port:', port);
        });
        db = data;
    }
    else{
        console.error('Error connecting to the database',data)
    }
});


//admin Routes
/*
POST /admin/signup Description: Creates a new admin account. Input: { username: 'admin', password: 'pass' } Output: { message: 'Admin created successfully'}
*/

app.post('/admin/signup', (req,res) => {
    adminSignup(req,res,db);
});

/*
POST /admin/login Description: Authenticates an admin. It requires the admin to send username and password in the headers. Input: Headers: { 'username': 'admin', 'password': 'pass' } Output: { message: 'Logged in successfully', token: 'jwt_token_here' }
*/

app.post('/admin/login', (req,res) => {
    adminLogin(req,res,db);
});

/*
POST /admin/courses Description: Creates a new course. Input: Headers: { 'Authorization': 'Bearer jwt_token_here' }, Body: { title: 'course title', description: 'course description', price: 100, imageLink: 'https://linktoimage.com', published: true } Output: { message: 'Course created successfully'}
*/

app.post('/admin/courses', (req,res) => {
    addCourse(req,res,db);
});

/*
PUT /admin/courses/:courseId Description: Edits an existing course. courseId in the URL path should be replaced with the ID of the course to be edited. Input: Headers: { 'Authorization': 'Bearer jwt_token_here' }, Body: { title: 'updated course title', description: 'updated course description', price: 100, imageLink: 'https://updatedlinktoimage.com', published: false } Output: { message: 'Course updated successfully' }
*/

app.put('/admin/courses/:courseId', (req,res) => {
    updateCourse(req,res,db);
});

/*
GET /admin/courses Description: Returns all the courses. Input: Headers: { 'Authorization': 'Bearer jwt_token_here' } Output: { courses: [ { id: 1, title: 'course title', description: 'course description', price: 100, imageLink: 'https://linktoimage.com', published: true }, ... ] } User Routes:
*/

app.get('/admin/courses', (req,res) => {
    getCourses(req,res,db);
});

//user Routes

/*
POST /users/signup Description: Creates a new user account. Input: { username: 'user', password: 'pass' } Output: { message: 'User created successfully'}
*/

app.post('/users/signup', (req,res) => {
    userSignup(req,res,db);
});

/*
POST /users/login Description: Authenticates a user. It requires the user to send username and password in the headers. Input: Headers: { 'username': 'user', 'password': 'pass' } Output: { message: 'Logged in successfully', token: 'jwt_token_here' }
*/

app.post('/users/login', (req,res) => {
    userLogin(req,res,db);
});

/*
GET /users/courses Description: Lists all the courses. Input: Headers: { 'Authorization': 'Bearer jwt_token_here' } Output: { courses: [ { id: 1, title: 'course title', description: 'course description', price: 100, imageLink: 'https://linktoimage.com', published: true }, ... ] }
*/

app.get('/users/courses', (req,res) => {
    getCourses(req,res,db);
});

/*
POST /users/courses/:courseId Description: Purchases a course. courseId in the URL path should be replaced with the ID of the course to be purchased. Input: Headers: { 'Authorization': 'Bearer jwt_token_here' } Output: { message: 'Course purchased successfully' }
*/

app.post('/users/courses/:courseId', (req,res) => {
    purchaseCourse(req,res,db);
});

/*
GET /users/purchasedCourses Description: Lists all the courses purchased by the user. Input: Headers: { 'Authorization': 'Bearer jwt_token_here' } Output: { purchasedCourses: [ { id: 1, title: 'course title', description: 'course description', price: 100, imageLink: 'https://linktoimage.com', published: true }, ... ] }
*/

app.get('/users/purchasedCourses', (req,res) => {
    purchasedCourseByUser(req,res,db);
});
