const noteModel = require('../models/Notes.js');
const express = require('express');
const noteRoutes = express.Router();

// Create a new Note
noteRoutes.post('/notes', async (req, res) => {
    try {
        // Validate request
        if(!req.body.noteTitle || !req.body.noteDescription) {
            return res.status(400).send({
                message: "Note title and description can not be empty"
            });
        }

        // Create a new note
        const newNote = new noteModel({
            noteTitle: req.body.noteTitle,
            noteDescription: req.body.noteDescription,
            priority: req.body.priority || 'MEDIUM'
        });

        // Save note to database
        const savedNote = await newNote.save();
        res.status(201).send(savedNote);
    } catch (error) {
        res.status(500).send({
            message: error.message || "Some error occurred while creating the note."
        });
    }
});

// Retrieve all Notes
noteRoutes.get('/notes', async (req, res) => {
    try {
        const notes = await noteModel.find().sort({ dateUpdated: -1 });
        res.send(notes);
    } catch (error) {
        res.status(500).send({
            message: error.message || "Some error occurred while retrieving notes."
        });
    }
});

// Retrieve a single Note with noteId
noteRoutes.get('/notes/:noteId', async (req, res) => {
    try {
        const note = await noteModel.findById(req.params.noteId);
        
        if(!note) {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });
        }
        
        res.send(note);
    } catch (error) {
        if(error.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });
        }
        res.status(500).send({
            message: "Error retrieving note with id " + req.params.noteId
        });
    }
});

// Update a Note with noteId
noteRoutes.put('/notes/:noteId', async (req, res) => {
    try {
        // Validate request
        if(!req.body.noteTitle || !req.body.noteDescription) {
            return res.status(400).send({
                message: "Note title and description can not be empty"
            });
        }

        const updatedNote = await noteModel.findByIdAndUpdate(
            req.params.noteId,
            {
                noteTitle: req.body.noteTitle,
                noteDescription: req.body.noteDescription,
                priority: req.body.priority,
                dateUpdated: Date.now()
            },
            { new: true } // Return updated document
        );

        if(!updatedNote) {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });
        }

        res.send(updatedNote);
    } catch (error) {
        if(error.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });
        }
        res.status(500).send({
            message: "Error updating note with id " + req.params.noteId
        });
    }
});

// Delete a Note with noteId
noteRoutes.delete('/notes/:noteId', async (req, res) => {
    try {
        const deletedNote = await noteModel.findByIdAndDelete(req.params.noteId);
        
        if(!deletedNote) {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });
        }
        
        res.send({ 
            message: "Note deleted successfully!",
            deletedNote: deletedNote
        });
    } catch (error) {
        if(error.kind === 'ObjectId' || error.name === 'NotFound') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });
        }
        res.status(500).send({
            message: "Could not delete note with id " + req.params.noteId
        });
    }
});

module.exports = noteRoutes;