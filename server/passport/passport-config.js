const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const uuid = require('uuid');
const mongoose = require('mongoose');

const Strategies = require('./strategies');
const { User } = require('../database/schemas');


module.exports = app => {
  console.log('preparing a session')
  // const sessionConfig = {
  //   store: MongoStore.create({
  //     client: mongoose.connection.getClient(),
  //     collectionName: 'sessions',
  //   }),
  //   genid: () => uuid.v4(),
  //   secret: process.env.SESSION_SECRET,
  //   resave: false,
  //   saveUninitialized: false,
  // };
  const sessionConfig = {
    store: MongoStore.create({
      mongoUrl: process.env.DATABASE_URL,
      collectionName: 'sessions',
      // ttl: 365 * 24 * 60 * 60, // = 365 days.
    }),
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    // cookie: {
    //   secure: app.get("env") === "production",
    // },
  };
  console.log('initializing passport')

  app.use(session(sessionConfig));
  app.use(passport.initialize());
  app.use(passport.session());

  console.log('serializeUser')
  passport.serializeUser((user, done) => done(null, user.id));

  console.log('deserializeUser')
  passport.deserializeUser((id, done) =>
    User.findById({ _id: id })
      .then(user => done(null, user))
      .catch(err => console.warn(`err at deserialize: ${err}`)));

  console.log('done')
  passport.use(Strategies.local);
};
