const express = require("express");
const passport = require("passport");
const { User } = require("../database/schemas");
const { OAuth2Client } = require('google-auth-library')

const router = express.Router();

module.exports = router;

router.post("/register", (req, res) => {
  if (!req || !req.body || !req.body.username || !req.body.password) {
    res.status(400).send({ message: "Username and Password required" });
  }

  req.body.username_case = req.body.username;
  req.body.username = req.body.username.toLowerCase();

  const { username } = req.body;
  const newUser = User(req.body);

  User.find({ username }, (err, users) => {
    if (err) {
      res.status(400).send({ message: "Create user failed", err });
    }
    if (users[0]) {
      res.status(400).send({ message: "Username exists" });
    }

    newUser.hashPassword().then(() => {
      newUser.save((err, savedUser) => {
        if (err || !savedUser) {
          res.status(400).send({ message: "Create user failed", err });
        } else {
          res.send({
            message: "User created successfully",
            user: savedUser.hidePassword(),
          });
        }
      });
    });
  });
});


router.post('/settingsRegister', (req, res) => {
  if (!req || !req.body || !req.body.username || !req.body.password) {
    res.status(400).send({ message: 'Username and Password required' });
  }

  req.body.username_case = req.body.username;
  req.body.username = req.body.username.toLowerCase();

  const { username } = req.body;
  const newUser = User(req.body);

  User.find({ username }, (err, users) => {
    if (err) {
      res.status(400).send({ message: 'Create user failed', err });
    }
    if (users[0]) {
      res.status(400).send({ message: 'Username exists' });
    }

    newUser.hashPassword().then(() => {
      newUser.save((err, savedUser) => {
        if (err || !savedUser) {
          res.status(400).send({ message: 'Create user failed', err });
        } else {
          res.send({ message: 'User created successfully', user: savedUser.hidePassword() });
        }
      });
    });

  });
});



router.post("/login", (req, res, next) => {

  req.body.username = req.body.username.toLowerCase();

  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).send(info);
    }

    req.login(user, (err) => {
      if (err) {
        res.status(401).send({ message: "Login failed", err });
      }
      res.send({
        message: "Logged in successfully",
        user: user.hidePassword(),
      });
    });
  })(req, res, next);
});

router.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      res.status(400).send({ message: "Logout failed", err });
    }
    req.sessionID = null;
    req.logout();
    res.send({ message: "Logged out successfully" });
  });
});


const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID || '')
router.post("/google", async (req, res) => {
  const { token } = req.body
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.GOOGLE_CLIENT_ID || ''
  });
  const { name, email } = ticket.getPayload();
  await User.updateOne(
    { username: email },
    { full_name: name, username: email },
    { upsert: true }
  )
  const user = await User.findOne({ username: email })

  req.login(user, (err) => {
    if (err) {
      res.status(401).send({ message: "Login failed", err });
    }
    res.send({
      message: "Logged in successfully",
      user: user.hidePassword(),
    });
  });
})