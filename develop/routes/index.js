const express = require('express');

const notesRouter = require('./notes.js');

const app = express();

// /notes is the path,  notesRouter is the middleware that handles the request. server.js links /api part
app.use('/apitest/notes', notesRouter);

module.exports = app;
