const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routers')

const app = express();
const port = 5038;

app.use(bodyParser.json());
app.use(cors());

const connectionString = "mongodb+srv://admin:180089@Dropship.ffcnt85.mongodb.net/UsersData";
const dbName = "UsersData";

// Connect to MongoDB Atlas using async/await
async function connectToDatabase() {
    try {
        await mongoose.connect(connectionString, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Connected to MongoDB Atlas");
    } catch (error) {
        console.error("Error connecting to MongoDB Atlas:", error);
    }
}

connectToDatabase();

// Define your routes and other middleware here

app.use('api',routes)





app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});















// var express = require("express");
// var server = express();

// var mongoose = require("mongoose");

// mongoose.connect(
//   "mongodb+srv://admin:180089@dropship.ffcnt85.mongodb.net/UserData",
//   { useNewUrlParser: true, useUnifiedTopology: true },
//   function checksb() {
//     if (error) {
//       console.log("eror");
//     } else {
//       console.log("fuck");
//     }
//   }
// );

// server.use(express.json());

// server.listen(5038, () => console.log("Server is running"));

// const mongoose = require("mongoose");

// mongoose.connect("mongodb+srv://admin:180089@dropship.ffcnt85.mongodb.net/?retryWrites=true&w=majority");

// const studentSchema = new mongoose.Schema({
//     id: String,
//     Username: String,
//     Password: Number,
// });

// const Student = mongoose.model('Student', studentSchema);
