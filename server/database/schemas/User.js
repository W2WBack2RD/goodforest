const mongoose = require("mongoose");
const { MongooseAutoIncrementID } = require("mongoose-auto-increment-reworked");
const bcrypt = require("bcryptjs");
const R = require("ramda");

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,

    },

    city: { type: String, maxlength: 50, required: true },
    username_case: { type: String, required: false },
    phone_number: { type: String, require: true },
    birth_year: { type: Number, required: false },
    full_name: { type: String, required: true },
    password: { type: String, required: true },
    forest: { type: String, maxlength: 50, required: true },
    get_update: { type: Boolean, require: true },
    is_admin: { type: Boolean, default: false, maxlength: 240 },
    created_at: { type: Date, default: Date.now, immutable: true },
    updated_at: { type: Date },
  },
  { versionKey: false }
);

if (process.env.NODE_ENV !== "test") {
  MongooseAutoIncrementID.initialise("counters");
  userSchema.plugin(MongooseAutoIncrementID.plugin, {
    modelName: "User",
    field: "user",
    incrementBy: 1,
    startAt: 1,
    unique: true,
    nextCount: false,
    resetCount: false,
  });
}


userSchema.virtual("initials").get(function () {
  return (
    this.first_name &&
    this.last_name &&
    `${this.first_name[0].concat(this.last_name[0]).toUpperCase()}`
  );
});

userSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

userSchema.methods.hashPassword = function () {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(10, (err1, salt) => {
      if (err1) {
        reject(err1);
      }
      bcrypt.hash(this.password, salt, (err2, hash) => {
        if (err2) {
          reject(err2);
        }
        this.password = hash;
        resolve(hash);
      });
    });
  });
};

userSchema.methods.hidePassword = function () {
  return R.omit(["password", "_id"], this.toObject({ virtuals: true }));
};

const User = mongoose.model("User", userSchema);

module.exports = User;
