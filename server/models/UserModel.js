const mongoose = require("mongoose");

const bcrypt = require("bcryptjs");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

UserSchema.statics.register = async function (username, email, password) {
  const userExists = await this.findOne({ $or: [{ username }, { email }] });
  if (userExists) throw new Error("User already exists");

  const salt = await bcrypt.genSalt(10);

  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await this.create({
    username,
    email,
    password: hashedPassword,
  });
  return user;
};

UserSchema.statics.login = async function (username, password) {
  const user = await this.findOne({ username });
  if (!user) throw new Error("User not found");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid credentials");

  return user;
};

module.exports = mongoose.model("User", UserSchema);
