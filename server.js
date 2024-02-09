// server.js

// Import required modules
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');


// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;


app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB Atlas
mongoose.connect('mongodb+srv://shiv:shiv@Dropship.ffcnt85.mongodb.net/UsersData', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

const userSchema = new mongoose.Schema({
  id: string,
  FirstName: string,
  LastName: string,
  Email: string,
  Password: string
});

const Users = mongoose.model('Users',userSchema)

app.get('/api/data', async (req, res) => {
  try{ 
    const users = await Users.find();
    res.json(users);
  }  catch (err){
    res.status(500).json({message: err.message})
  }
});

// Define an endpoint to insert data into MongoDB
app.post('/api/data', async (req, res) => {
  const user = new Users({
    id: req.body.id,
    FirstName: req.body.FirstName,
    LastName: req.body.LastName,
    Email: req.body.Eamil,
    Password: req.body.Password
  });

  try {
    const newUser = await user.save();
    res.status(201).json(newUser);

} catch (err){
  res.status(400).json({message: err.message});
}
});

// Define an endpoint to update data in MongoDB
app.put('/api/data/:id', (req, res) => {
  // Implement logic to update data in MongoDB
});

// Define an endpoint to delete data from MongoDB
app.delete('/api/data/:id', (req, res) => {
  // Implement logic to delete data from MongoDB
});
// Start the server


//Define routes
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
// Define a sample endpoint to get data from MongoDB

