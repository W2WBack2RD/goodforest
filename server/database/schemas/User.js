const mongoose = require("mongoose");
const { MongooseAutoIncrementID } = require("mongoose-auto-increment-reworked");
const bcrypt = require("bcryptjs");
const R = require("ramda");

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    username: {
      type: String,
      lowercase: true,
      required: true,
      unique: true,
      immutable: true,
    },
    first_name: { type: String, maxlength: 20 },
    last_name: { type: String, maxlength: 20 },
    phoneNumber: { type: String, require: true },
    birthYear: { type: Number, required: false },
    email: { type: String, required: true },
    password: { type: String, required: true },
    mycity: { type: String, maxlength: 20, required: true },
    forestId: { type: String, require: true },
    acceptedTerms: { type: Boolean, require: true },
    is_admin: { type: Boolean, default: false, maxlength: 240 },
    username_case: { type: String, required: false },
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

userSchema.virtual("full_name").get(function () {
  if (this.first_name && this.last_name) {
    return `${this.first_name} ${this.last_name}`;
  }
  if (this.first_name && !this.last_name) {
    return this.first_name;
  }
  if (!this.first_name && this.last_name) {
    return this.last_name;
  }
  return undefined;
});

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
