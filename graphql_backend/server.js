require("dotenv").config();
const cors = require("cors");
const express = require("express");
const app = express();
const connectDB = require("./config/db");
const expressGraphQL = require("express-graphql").graphqlHTTP;
const port = process.env.PORT || 8000;
app.use(cors());

// Connect Database
connectDB();

app.get("/", (req, res) => res.send("Welcome to the GraphQL Server!"));

app.listen(port, () => console.log(`Server Started: http://localhost:${port}`));

module.exports = app;
