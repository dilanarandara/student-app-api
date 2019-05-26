const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Student = require("../../models/Student");
const config = require("../../config/config");

module.exports = {
  createStudent: async args => {
    try {
      let hasStudent = await Student.findOne({ email: args.userInput.email });

      if (hasStudent) {
        throw new Error("Student exists by email.");
      }

      const hashedPassword = await bcrypt.hash(args.userInput.password, 12);

      let student = new Student({
        firstName: args.userInput.firstName,
        lastName: args.userInput.lastName,
        age: args.userInput.age,
        email: args.userInput.email,
        password: hashedPassword
      });

      const result = await student.save();

      return { ...result._doc, id: result.id, password: null };
    } catch (err) {
      throw err;
    }
  },

  login: async ({ email, password }) => {
    const user = await Student.findOne({ email });

    if (!user) {
      throw new Error("Invalid Username and/or password");
    }

    const isPasswordEqual = await bcrypt.compare(password, user.password);

    if (!isPasswordEqual) {
      throw new Error("Invalid Username and/or password");
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      config.jwt.secretKey,
      {
        expiresIn: `${config.jwt.expiration}h`
      }
    );

    return {
      userId: user.id,
      token: token,
      tokenExpiration: config.jwt.expiration
    };
  }
};
