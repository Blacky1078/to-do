require("dotenv").config();
const bcrypt = require("bcrypt");
const cors = require("cors");
const express = require("express");
const app = express();

app.use(cors());
app.use(express.json());



function tokenGenerator() {
  const keys = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let id = "";
  for (let i = 0; i < 12; i++) {
    id += keys.charAt(Math.floor(Math.random() * keys.length));
  }
  return id;
}

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
          return res.status(201).json(result);
        });
      }
    });
  });
});

app.post("/user", async (req, res) => {
  const email = req.body.email;

  db.getConnection(async (err, connection) => {
    if (err) {
      console.error("Method Not Allowed");
    }

    const sqlsearch = "SELECT * FROM user_table WHERE email = ?";

    const search_query = mysql.format(sqlsearch, [email]);

    await connection.query(search_query, async (err, result) => {
      if (err) {
        console.error("Method Not Allowed");
      }

      if (result.length > 0) {
        connection.release();
        console.log("------> Search Results", result);
        return res.status(200).json(result);
      } else {
        connection.release();
        console.log("Error");
        return res.status(200).json(result);
      }
    });
  });
});

app.post("/updateTodo", async (req, res) => {
  const user = req.body.email;
  const todo = req.body.todo;

  const UpdatedValue = JSON.stringify(todo);

  db.getConnection(async (err, connection) => {
    if (err) throw err;

    const sqlsearch = "SELECT * FROM user_table WHERE email = ?";

    const search_query = mysql.format(sqlsearch, [user]);

    const sqlupdate = "UPDATE user_table SET todo = ? WHERE email = ?";

    const updatequery = mysql.format(sqlupdate, [UpdatedValue, user]);

    await connection.query(search_query, async (err, result) => {
      if (err) throw err;

      console.log("--------> Search Results");
      console.log(result.length);

      if (result.length == 0) {
        connection.release();
        console.log("---------->User Doesn't Exist");
        res.sendStatus(409);
      } else {
        await connection.query(updatequery, (err, result) => {
          connection.release();
          if (err) throw err;
          console.log("--------> Created new TODO");
          console.log(result.insertId);
          return res.status(201).json(result);
        });
      }
    });
  });
});

app.post("/createUserTodo", async (req, res) => {
  const email = req.body.email;
  const id = tokenGenerator();
  const title = req.body.title;
  const desc = req.body.desc;
  const dT = req.body.dT;
  const status = req.body.status;

  db.getConnection(async (err, connection) => {
    if (err) {
      console.error("Method Not Allowed");
    }

    const sqlsearch = "SELECT * FROM user_todo WHERE email = ?";

    const search_query = mysql.format(sqlsearch, [email]);

    const sqlInsert = "INSERT INTO user_todo VALUES (0,?,?,?,?,?,?)";

    const insert_query = mysql.format(sqlInsert, [
      id,
      email,
      title,
      desc,
      dT,
      status,
    ]);

    await connection.query(search_query, async (err, result) => {
      if (err) {
        console.error("Method Not Allowed");
      }

      if (result.length > 0) {
        console.log("-------> User Todo Does Exist");
        await connection.query(insert_query, (err, result) => {
          connection.release();
          if (err) throw err;
          console.log("-------> Craete Another User Todo");
          return res.status(201).json(result);
        });
      } else {
        console.log("-------> New User Todo");
        await connection.query(insert_query, (err, result) => {
          connection.release();
          // if (err) throw err;
          console.log("-------> Craete New User Todo");
          return res.status(201).json(result);
        });
      }
    });
  });
});

app.post("/userTodo", async (req, res) => {
  const email = req.body.email;

  db.getConnection(async (err, connection) => {
    if (err) {
      console.error("Method Not Allowed");
    }

    const sqlsearch = "SELECT * FROM user_todo WHERE email = ?";

    const search_query = mysql.format(sqlsearch, [email]);

    await connection.query(search_query, async (err, result) => {
      if (err) {
        console.error("Method Not Allowed");
      }

      if (result.length > 0) {
        connection.release();
        console.log("------> Search Results", result);
        return res.status(200).json(result);
      } else {
        connection.release();
        console.log("Error");
        return res.status(200).json(result);
      }
    });
  });
});

app.post("/editUserTodo", async (req, res) => {
  const email = req.body.email;
  const title = req.body.title;
  const desc = req.body.desc;
  const status = req.body.status;
  const todo_id = req.body.todo_id;

  db.getConnection(async (err, connection) => {
    if (err) {
      console.error("Method Not Allowed");
    }

    const sqlsearch = "SELECT * FROM user_todo WHERE todo_id = ?";

    const search_query = mysql.format(sqlsearch, [todo_id]);

    const sqlupdate =
      "UPDATE `user_todo` SET `title` = ?, `desc` = ?, `status` = ? WHERE `todo_id` = ?;";

    const update_query = mysql.format(sqlupdate, [
      title,
      desc,
      status,
      todo_id,
    ]);

    await connection.query(search_query, async (err, result) => {
      if (err) {
        console.error("Method Not Allowed");
      }

      if (result.length > 0) {
        await connection.query(update_query, (err, result) => {
          connection.release();
          if (err) throw err;
          console.log("-------> Edited A User Todo");
          return res.status(201).json(result);
        });
      } else {
        connection.release();
        console.log("Error");
        return res.status(200).json(result);
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
