//Requring Express libraries for server
const express = require('express');
const app = express();
const port = 3000;

//functions requirement
const { createDb } = require('./database/backend');
const { adminSignup, adminLogin, addCourse, updateCourse, getCourses} = require('./routes/adminRoutes');

//middlewares
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended:false}));


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
POST /admin/signup Description: Creates a new admin account. Input: { username: 'admin', password: 'pass' } Output: { message: 'Admin created successfully', token: 'jwt_token_here' }
*/

app.post('/admin/signup', (req,res) => {
    adminSignup(req,res,db);
});

/*
POST /admin/login Description: Authenticates an admin. It requires the admin to send username and password in the headers. Input: Headers: { 'username': 'admin', 'password': 'pass' } Output: { message: 'Logged in successfully', token: 'jwt_token_here' }
*/

app.post('/admin/login', adminLogin);

/*
POST /admin/courses Description: Creates a new course. Input: Headers: { 'Authorization': 'Bearer jwt_token_here' }, Body: { title: 'course title', description: 'course description', price: 100, imageLink: 'https://linktoimage.com', published: true } Output: { message: 'Course created successfully', courseId: 1 }
*/

app.post('/admin/courses', addCourse);

/*
PUT /admin/courses/:courseId Description: Edits an existing course. courseId in the URL path should be replaced with the ID of the course to be edited. Input: Headers: { 'Authorization': 'Bearer jwt_token_here' }, Body: { title: 'updated course title', description: 'updated course description', price: 100, imageLink: 'https://updatedlinktoimage.com', published: false } Output: { message: 'Course updated successfully' }
*/

app.put('/admin/courses/:courseId', updateCourse);

/*
GET /admin/courses Description: Returns all the courses. Input: Headers: { 'Authorization': 'Bearer jwt_token_here' } Output: { courses: [ { id: 1, title: 'course title', description: 'course description', price: 100, imageLink: 'https://linktoimage.com', published: true }, ... ] } User Routes:
*/

app.get('/admin/courses', getCourses);

//user Routes
