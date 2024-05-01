const asyncHandler = require("express-async-handler");


// @desc Register a user
// @route Post/api/users/register
// @access public

const registerUser = 
 asyncHandler(
async (req, res) => {
   res.json({message : "Regiser the user"});
}
);


// @desc Login a user
// @route Post/api/user/login
// @access public

const loginUser = 
 asyncHandler(
 async (req, res) => {
    
   res.json({message : "Login user"});
}
);


// @desc Current a user
// @route Get/api/user/current
// @access public

const currentUser = 
 asyncHandler(
 async (req, res) => {
  res.json({message : "Current user information"});
}
);


module.exports = {registerUser, loginUser, currentUser,  };
