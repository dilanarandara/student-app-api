const express = require("express");
const bodyParser = require("body-parser");
const graphqlHttp = require("express-graphql");
const mongoose = require("mongoose");

const isAuth = require("./moddleware/isAuth");
const graphQlSchema = require("./graphql/schema/index");
const graphQlResolvers = require("./graphql/resolvers/index");

const app = express();

app.use(bodyParser.json());

app.use(isAuth);

app.use(
  "/graphql",
  graphqlHttp({
    schema: graphQlSchema,
    rootValue: graphQlResolvers,
    graphiql: true
  })
);

mongoose
  .connect("mongodb://localhost:27017/student_app", {
    useNewUrlParser: true,
    useCreateIndex: true
  })
  .then(() => {
    console.log("Student App Started");
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });
