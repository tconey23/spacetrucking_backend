const express = require('express');
const app = express();

app.use(express.json());

app.get('/api/data', (req, res) => {
    const name = req.query.name || 'Guest';

    const data = {
        message: `Hello, ${name}!`,
        timestamp: new Date(),
    };

    res.status(200).json(data);
});

app.post('/api/data', (req, res) => {
    const { name, age } = req.body;

    if (!name || !age) {
        return res.status(400).json({ error: 'Name and age are required' });
    }

    const responseData = {
        message: `Hello, ${name}! You are ${age} years old.`,
        receivedAt: new Date(),
    };
    
    res.status(201).json(responseData);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
