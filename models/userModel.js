const mongoose = require('mongoose');



const userSchema = mongoose.Schema(
     {
        namename: {
            type: String,
            required: [true,"Please add the user name"]
        },
        email: {
            type: String,
            required: [true,"Please add the user email address"],
            unique:[true, "Email address already taken"]
        },
        password: 
         {
            type: String,
            required: [true,"Please add the user password"]
        }
     },
     {
        timestamps: true,
     }
);



module.exports = mongoose.model("users", userSchema);