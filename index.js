const express = require('express');
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// In-memory storage (replace this with a database in production)
let cargoData = [];

// POST endpoint to receive and store data
app.post('/api/cargo', (req, res) => {
    const { station, scu, comm } = req.body;

    // Validate incoming data
    if (!station || !scu || !comm) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    // Store the data (in a real app, you'd save this to a database)
    const newCargo = { station, scu, comm };
    cargoData.push(newCargo);

    // Send a success response
    res.status(201).json({ message: 'Cargo data stored successfully', data: newCargo });
});

// Example endpoint to retrieve stored data (for verification)
app.get('/api/cargo', (req, res) => {
    res.json(cargoData);
});

// Server setup
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
