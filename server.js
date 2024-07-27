// const express = require("express");
// const errorHandler = require("./middleware/errorHandler");
// const connectDd = require("./config/dbConnection");
// const dotenv = require("dotenv").config();



//  connectDd();
//  const app = express();


//  const port =  process.env.PORT|| 5000;

//  app.use(express.json());

//  app.use("/api/contacts",require("./routes/contactRoutes") );
//  app.use("/api/users",require("./routes/userRoutes") );
//  app.use(errorHandler);
//  app.listen(port,
//      ()=>{
//     console.log(`server running on port ${port}`);
//  });

const express = require('express');
const bonjour = require('bonjour')();
const axios = require('axios');

const app = express();
const port = 3000;
let deviceIp = null;






// bonjour.publish({ name: 'woloowashroom', type: 'http', port: 3000 })

const advertisedPort =  3000;
// const server = bonjour();
 
// const bonjour = require('bonjour')();

// Advertise an HTTP server on port 3000 vsr 
//  var ser =  bonjour.publish({ name: 'someserver', type: 'http', port: 4000 });
 
//   ser.start();
console.log('Service advertised on port 3000', ser.name);

// bonjour.find({ type: 'http' }, function (service) {
// //     service.start();
//   console.log('Found an HTTP server:', service.publish)
// })

//r browser = bonjour.findOne(options[, callback])

//var browser = bonjour.find(options[, onup])



// Discover IoT device using bonjour
bonjour.find({ type: 'http' }, service => {
    if (service.name === 'YourIoTDeviceName') {
        deviceIp = service.referer.address;
        console.log(`Device IP resolved: ${deviceIp}`);
    }
});

// Endpoint to get data from IoT device
app.get('/data', async (req, res) => {

             
    if (deviceIp) {
        try {
           const response = await axios.get(`http://${deviceIp}/data`);
            res.send(`Data from IoT device: ${response.data}`);
        } catch (error) {
            res.status(500).send(`Failed to get data from IoT device: ${error.message}`);
        }
    } else {
        res.status(404).send('IoT device not found.');
    }
});

app.listen(ser.port, () => {
    console.log(`Server is running on http://localhost:${ser.port}`);
});

