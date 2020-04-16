const express = require('express');
const helmet = require('helmet');
const mw = require("./api/middleware.js");
const logger = mw.logger;

const SchemeRouter = require('./schemes/scheme-router.js');


const server = express();

server.use(helmet());
server.use(express.json());
server.use(logger);


server.use('/api/schemes', SchemeRouter);


server.get('/api', (req, res) => {
  const environment = process.env;
  res.status(200).json({ api: "up", environment });
});

server.get("/", addName, (req, res) => {
  const nameInsert = req.name ? `${req.name}` : "";
  console.log("req.name is:", req.name);

 
  res.send(`
  <h2> Node 3 Module DB Project</h2>
  <p>Welcome ${nameInsert} to Matt Steele's Multi-Table Queries and DB Helpers Project!</p>
  `);
});


function addName(req, res, next) {
  req.name = 'WEBPT11';
  next();
};

// Catch all 404 error message - good ux
server.use(function (req, res, next) {
  res
    .status(404)
    .json({ message: "Oops, didn't find what you are looking for" })
  next();
});


module.exports = server;