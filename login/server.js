// server.js

const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect("mongodb://localhost:27017/myapp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
// user.js

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);

module.exports = User;

// server.js

const User = require("./user");

app.post("/register", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  // Check if the email already exists in the database
  User.findOne({ email: email }, (err, user) => {
    if (err) {
      console.log(err);
    } else if (user) {
      res.send("Email already registered");
    } else {
      // If the email is not already registered, hash the password and store the user in the database
      bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
          console.log(err);
        } else {
          const newUser = new User({
            email: email,
            password: hash,
          });
          newUser.save((err) => {
            if (err) {
              console.log(err);
            } else {
              console.log("User saved to database");
            }
          });
        }
      });

      // Store the user's email and a flag indicating that they are logged in locally
      req.session.user = {
        email: email,
        loggedIn: true,
      };

      res.redirect("/dashboard");
    }
  });
});

// server.js

app.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  // Find the user with the given email address in the database
  User.findOne({ email: email }, (err, user) => {
    if (err) {
      console.log(err);
    } else if (!user) {
      res.send("Email not registered");
    } else {
      // If the email is registered, check if the password is correct
      bcrypt.compare(password, user.password, (err, result) => {
        if (err) {
          console.log(err);
        } else if (result === true) {
          // If the password is correct, store the user's email and a flag indicating that they are logged in locally
          req.session.user = {
            email: email,
            loggedIn: true,
          };
          res.redirect("/dashboard");
        } else {
          res.send("Incorrect password");
        }
      });
    }
  });
});

// server.js

app.post("/login", (req, res) => {
	const email = req.body.email;
	const password = req.body.password;

  // Find the user with the given email address in the database
	User.findOne({ email: email }, (err, user) => {
    if (err) {
    	console.log(err);
    } else if (!user) {
    	res.send("Email not registered");
    } else {
      // If the email is registered, check if the password is correct
    	bcrypt.compare(password, user.password, (err, result) => {
        if (err) {
        	console.log(err);
        } else if (result === true) {
          // If the password is correct, store the user's email and a flag indicating that they are logged in locally
        	req.session.user = {
            email: email,
            loggedIn: true,
        	};
        	res.redirect("/dashboard");
        } else {
        	res.send("Incorrect password");
        }
    	});
    }
	});
});

// server.js

app.get("/logout", (req, res) => {
  // Destroy the user session and redirect to the login page
	req.session.destroy((err) => {
	if (err) {
    	console.log(err);
    } else {
    	res.redirect("/login");
    }
	});
});
