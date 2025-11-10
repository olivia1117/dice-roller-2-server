const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

// Allow cross-origin requests from anywhere (so your separate client can access the API)
app.use(cors());

// --- ROUTES ---

// About page
app.get('/about', (req, res) => {
    console.log('Calling "/about" on the server.');
    res.type('text/plain');
    res.send('About Node.js Dice Roller API.');
});

// Version endpoint
app.get('/version', (req, res) => {
    console.log('Calling "/version" on the server.');
    res.type('text/plain');
    res.send('Version: 1.3');
});

// --- RANDOM DICE ENDPOINT ---
app.get('/api/rollDice', (req, res) => {
    console.log('Calling "/api/rollDice" on the server.');

    // Generate random number between 1–6
    const roll = Math.floor(Math.random() * 6) + 1;

    // Return JSON with roll and corresponding image filename
    res.json({
        roll: roll,
        image: `die${roll}.jpg` // Client should use this filename to show the dice image
    });
});

// Simple ping test
app.get('/api/ping', (req, res) => {
    console.log('Calling "/api/ping"');
    res.type('text/plain');
    res.send('ping response');
});

// --- ERROR HANDLERS ---

// 404 handler
app.use((req, res) => {
    res.type('text/plain');
    res.status(404).send('404 - Not Found');
});

// 500 handler
app.use((err, req, res, next) => {
    console.error(err.message);
    res.type('text/plain');
    res.status(500).send('500 - Server Error');
});

// --- START SERVER ---
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
