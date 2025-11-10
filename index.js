const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

// Allow cross-origin requests from anywhere (so your separate client can access the API)
// remove this line to show a CORS error in the browser console
app.use(cors());

// --- ROUTES ---
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/static/index.html');
});


// About page
app.get('/about', (req, res) => {
    console.log('Calling "/about" on the server.');
    res.type('text/plain');
    res.send('About Node.js Dice Roller API.');
});

// call to roll the dice
app.get('/api/rollDice', (req, res) => {
    console.log('Calling "/api/rollDice" on the server.');

    // generate random number between 1–6
    const roll = Math.floor(Math.random() * 6) + 1;

    // return JSON with roll and corresponding image filename
    res.json({
        roll: roll,
        image: `die${roll}.jpg` // client should use this filename to show the dice image
    });
});

// ping test
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
