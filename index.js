require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const connection =  require('./src/datasources/mongodb');
const routes = require("./src/routes/users")

// database connection
connection();

// middlewares
app.use(express.json());
app.use(cors());

// routes
app.use(routes)

const port = process.env.PORT || 8080;
app.listen(port,()=> console.log(`App listening on port ${port}`));