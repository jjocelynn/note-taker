//importing libraries and files
const notes = require('express').Router();
const { readFromFile, readAndAppend, writeToFile } = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');

// GET Route for retrieving all the notes
notes.get('/', (req, res) => {
    console.info(`${req.method} request received for all notes`);
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

// POST Route for new notes
notes.post('/', (req, res) => {
    console.info(`${req.method} request received for note`);

    // Destructuring assignment for the items in req.body
    const { title, text } = req.body;

    // If title and text (required properties) are present
    if (title && text) {
        const newNote = {
            title,
            text,
            id: uuid(), //string of random numbers and letters
        };

        readAndAppend(newNote, './db/db.json');

        const response = {
            status: 'success',
            body: newNote,
        };

        res.json(response);
    } else {
        res.json('Error in posting note');
    }
});

// DELETE Route for a specific note
notes.delete('/:id', (req, res) => {
    const noteId = req.params.id; //setting the note's id to noteId

    readFromFile('./db/db.json')
        .then((data) => JSON.parse(data))
        .then((json) => {

            // Make a new array of all notes EXCEPT the Id we just got
            const result = json.filter((note) => note.id !== noteId);

            // Save that array to the filesystem
            writeToFile('./db/db.json', result);

            // Respond to the DELETE request
            res.json(`Item ${noteId} has been deleted 🗑️`);
        });
});


module.exports = notes;