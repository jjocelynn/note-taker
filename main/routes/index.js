// import express library
const express = require('express');

// Import modular routers for /notes
const notesRouter = require('./notes');

const app = express();

// for anything that passes the /notes route, use notesRouter middleware.
app.use('/notes', notesRouter);

module.exports = app;
