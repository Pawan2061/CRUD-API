const mongoose = require("mongoose");
const validator = require("email-validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Enter your name"],
  },
  email: {
    type: String,
    required: [true, "Enter your email"],

    validate(value) {
      if (!validator.validate(value)) {
        throw new Error("Enter valid email");
      }
    },
  },
  password: {
    type: String,
    required: [true, "Enter your password"],
  },
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    try {
      this.password = await bcrypt.hash(this.password, 10);
    } catch (error) {
      return next(error);
    }
  }
});

userSchema.statics.login = async function (email, password) {
  const company = await this.findOne({ email });
  if (!company) {
    throw Error("Incorrect email");
  }
  const auth = await bcrypt.compare(password, company.password);
  if (auth) {
    return company;
  }
  throw Error("Incorrect password");
};

const UsersSchema = mongoose.model("Users", userSchema);

module.exports = UsersSchema;
