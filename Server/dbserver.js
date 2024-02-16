require("dotenv").config();
const bcrypt = require("bcrypt");
const cors = require("cors");
const express = require("express");
const app = express();

app.use(cors())
app.use(express.json());




app.post("/createUser", async (req, res) => {
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const user = req.body.email;
  const password = req.body.password;

  db.getConnection(async (err, connection) => {
    if (err) throw err;

    const sqlsearch = "SELECT * FROM user_table WHERE email = ?";

    const search_query = mysql.format(sqlsearch, [user]);

    const sqlInsert = "INSERT INTO user_table VALUES (0,?,?,?,?)";

    const insert_query = mysql.format(sqlInsert, [
      firstname,
      lastname,
      user,
      password,
    ]);

    await connection.query(search_query, async (err, result) => {
      if (err) throw err;
      console.log("------> Search Results");
      console.log(result.length);

      if (result.length != 0) {
        connection.release();
        console.log("------> User already exists");
        res.sendStatus(409);
      } else {
        await connection.query(insert_query, (err, result) => {
          connection.release();
          if (err) throw err;
          console.log("--------> Created new User");
          console.log(result.insertId);
          res.sendStatus(201);
        });
      }
    });
  });
});



app.post("/user", async (req, res) => {
  const email = req.body.email;

  db.getConnection(async (err, connection) => {
    if (err) {
      console.error("Method Not Allowed")
    };

    const sqlsearch = "SELECT * FROM user_table WHERE email = ?";

    const search_query = mysql.format(sqlsearch, [email]);

    await connection.query(search_query, async (err, result) => {
      if (err) {
        console.error("Method Not Allowed")
      };

      if (result.length > 0) {
        connection.release()
        console.log("------> Search Results",result);
        return res.status(200).json(result)
      } else {
        connection.release()
        console.log("Error");
        return res.status(404).send("User Not Found")
      }
    });
  });
});

const mysql = require("mysql");

const db = mysql.createPool({
  connectionLimit: 100,
  host: "127.0.0.1",
  user: "newuser",
  password: "nodejs1234!@",
  database: "userdb",
  port: "3306",
});

db.getConnection((err, connection) => {
  if (err) throw err;
  console.log("DB connected Successfull: " + connection.threadId);
});

const port = 3000;

app.listen(port, () => console.log(`Server Started on port ${port}...`));
