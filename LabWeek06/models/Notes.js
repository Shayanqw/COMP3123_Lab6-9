const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
    noteTitle: {
        type: String,
        required: [true, "Note title is required"],
        trim: true
    },
    noteDescription: {
        type: String,
        required: [true, "Note description is required"],
        trim: true
    },
    priority: {
        type: String,
        enum: ['HIGH', 'MEDIUM', 'LOW'],
        default: 'MEDIUM'
    },
    dateAdded: {
        type: Date,
        default: Date.now
    },
    dateUpdated: {
        type: Date,
        default: Date.now
    }
});

NoteSchema.pre('save', function(next) {
    this.dateUpdated = Date.now();
    next();
});

module.exports = mongoose.model('Note', NoteSchema);