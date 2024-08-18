const express = require('express');
const app = express();

// GET endpoint
app.get('/api/data', (req, res) => {
    // Example query parameter: req.query.name
    const name = req.query.name || 'Guest';

    // Example data to send back
    const data = {
        message: `Hello, ${name}!`,
        timestamp: new Date(),
    };

    // Sending the response
    res.status(200).json(data);
});

// Server setup
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
