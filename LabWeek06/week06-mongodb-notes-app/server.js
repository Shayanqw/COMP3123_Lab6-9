const express = require('express');
const mongoose = require('mongoose');
const noteRoutes = require('./routes/NoteRoutes');

// TODO - Update your mongoDB Atlas Url here to Connect to the database
const DB_URL = process.env.DB_URL || "mongodb://localhost:27017/notesdb";
const PORT = process.env.PORT || 8081;

const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Use note routes
app.use('/api', noteRoutes);

app.get('/', (req, res) => {
    res.send("<h1>Welcome to Note taking application - Week06 Exercise</h1>");
});

// Connect to the database
mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Successfully connected to the database mongoDB Atlas Server");    
    app.listen(PORT, () => {
        console.log(`Server is listening on port ${PORT}`);
    });
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});