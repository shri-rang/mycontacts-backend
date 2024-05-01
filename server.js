const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const connectDd = require("./config/dbConnection");
const dotenv = require("dotenv").config();



 connectDd();
 const app = express();


 const port =  process.env.PORT|| 5000;

 app.use(express.json());

 app.use("/api/contacts",require("./routes/contactRoutes") );
 app.use("/api/users",require("./routes/userRoutes") );
 app.use(errorHandler);
 app.listen(port,
     ()=>{
    console.log(`server running on port ${port}`);
 });