const { hashPassword } = require('../src/bcrypt');
const { searchInDbForUserOrAdmin } = require('../src/searchindb');
const { addUser } = require('../src/addUsersIndb');

module.exports = {
    adminSignup: async (req,res,db) => {
       const checkInDb = await searchInDbForUserOrAdmin(req,db,'admin');
       if(checkInDb){
          res.status(200).json({'Message': 'Admin Already Exists Please login'});
       }
       else{
          const hashedPassword = await hashPassword(req.body.password);
          const user = {
            email: req.body.email,
            password: hashedPassword
          }
          addUser(db,'admin',user,(err,user) => {
            if(err) res.status(501).json({'Error in creating user':err});  
            else{
                res.status(200).json(user);
            } 
          });
       }
    },
    adminLogin: (req,res) => {

    },
    addCourse: (req,res) => {

    },
    updateCourse: (req,res) => {

    },
    getCourses: (req,res) => {

    }
};