const db = require("../database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  db.run(
    `
        INSERT INTO users (name,email,password) VALUES (?,?,?)`,
    [name, email, hashedPassword],
    function (e) {
      if (e) {
        res.status(400).json({ message: "User already exists" });
      } else {
        res.json({ message: "User registered successfully" });
      }
    },
  );
};

exports.loginUser = (req, res) => {
  const { email, password } = req.body;

  db.get(
    `
        SELECT * FROM users WHERE email = ?`,
    [email],
    (err, user) => {
      if (err) {
        return res.status(500).json({ message: "Server error" });
      }

      if (!user) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (!isMatch) {
          return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
          expiresIn: "1d",
        });

        res.json({ token });
      });
    },
  );
};
