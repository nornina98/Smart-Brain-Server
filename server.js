const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const database = {
  users: [
    {
      id: "1",
      name: "kasyaf",
      email: "kasyaf@gmail.com",
      password: "123456",
      entries: 0,
      joined: new Date(),
    },
    {
      id: "2",
      name: "muya",
      email: "muya@gmail.com",
      password: "123456",
      entries: 0,
      joined: new Date(),
    },
  ],
  login: [
    {
      id: 999,
      hash: "",
      email: "kasyaf@gmail.com",
    },
  ],
};

app.get("/", (req, res) => {
  res.send(database.users);
});

app.post("/signin", (req, res) => {
  // Load hash from your password DB.
  bcrypt.compare(
    "123123",
    "$2a$10$VDYqAU1bS3TyU.8yOrdpyur0he38NsMjnXtjouHlTa45lFViQKfka",
    function (err, res) {
      console.log("first guest password", res);
    }
  );
  bcrypt.compare(
    "veggies",
    "$2a$10$VDYqAU1bS3TyU.8yOrdpyur0he38NsMjnXtjouHlTa45lFViQKfka",
    function (err, res) {
      console.log("second guest password", res);
    }
  );

  if (
    req.body.email === database.users[0].email &&
    req.body.password === database.users[0].password
  ) {
    res.json("success");
  } else {
    res.status(400).json("error to login");
  }
});

app.post("/register", (req, res) => {
  const { email, name, password } = req.body;
  bcrypt.hash(password, null, null, function (err, hash) {
    console.log(hash);
  });
  database.users.push({
    id: "3",
    name: name,
    email: email,
    password: password,
    entries: 0,
    joined: new Date(),
  });
  res.json(database.users[database.users.length - 1]);
});

app.listen(3000, () => {
  console.log("app working and running on server 3000");
});

app.get("/profile/:id", (req, res) => {
  const { id } = req.params;
  let found = false;
  database.users.forEach((user) => {
    if (user.id === id) {
      found = true;
      return res.json(user);
    }
  });
  if (!found) {
    res.status(400).json("not found");
  }
});

app.post("/image", (req, res) => {
  const { id } = req.body;
  let found = false;
  database.users.forEach((user) => {
    if (user.id === id) {
      found = true;
      user.entries++;
      return res.json(user.entries);
    }
  });
  if (!found) {
    res.status(400).json("not found");
  }
});
