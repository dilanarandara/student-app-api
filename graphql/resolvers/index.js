const studentResolver = require("./student");
const courseResolver = require("./course");
const courseRegistrationResolver = require("./courseRegistration");
const authResolver = require("./auth");

const rootResolver = {
  ...studentResolver,
  ...courseResolver,
  ...courseRegistrationResolver,
  ...authResolver
};

module.exports = rootResolver;
