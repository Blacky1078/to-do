const { MongoClient } = require("mongodb");
// Replace the uri string with your connection string.
const uri =
  "mongodb+srv://shiv:shiv@dropship.ffcnt85.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);





//  async function run() {
//   try {
//     const database = client.db("UserData");
//     const collection = database.collection("UserLogins");
//     // Query for a movie that has the title 'Back to the Future'
//     // const query = { title: '' };
//     // const doc = { username: "admin@test.com", password: "123456" };
//     // const result = await collection.insertOne(doc);
//     // console.log(`A document was inserted with the is: ${result.insertedId}`);

//     // Search for orders by name and within a specific date range
//     const user = await collection.findOne({ username: "admin@test.com", password: "123456" });

//     console.log(user);
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);

    // Query for a movie that has the title 'Back to the Future'
    // const query = { title: '' };
    // const doc = { username: "admin@test.com", password: "123456" };
    // const result = await collection.insertOne(doc);
    // console.log(`A document was inserted with the is: ${result.insertedId}`);

    // Search for orders by name and within a specific date range
