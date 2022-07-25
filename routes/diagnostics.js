const diagnostics = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const { readAndAppend, readFromFile } = require('../helpers/fsUtils');

// GET Route for retrieving diagnostic information
diagnostics.get('/', (req, res) => {
  // TODO: Logic for sending all the content of db/diagnostics.json
	readFromFile("./db/diagnostics.json").then((data) => res.json(JSON.parse(data)));
});

// POST Route for a error logging
diagnostics.post('/', (req, res) => {
  // TODO: Logic for appending data to the db/diagnostics.json file
	let newEntry = {};
	newEntry.time = new Date().getTime();
	newEntry.error_id = uuidv4();
	newEntry.errors = req.body.errors;
	readAndAppend(newEntry, "./db/diagnostics.json");
	readFromFile("./db/diagnostics.json").then((data) => res.json(JSON.parse(data)));
});

module.exports = diagnostics;