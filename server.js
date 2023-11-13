const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let users = [];

app.post("/register", (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required." });
  }

  // Check if the username is already taken
  if (users.some((user) => user.username === username)) {
    return res.status(400).json({ message: "Username is already taken." });
  }

  const newUser = { username, password };
  users.push(newUser);

  res.json({ message: "Registration successful." });
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials." });
  }

  res.json({ message: "Login successful." });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
