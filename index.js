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
    const { station, scu, comm } = req.body;

    console.log(station, scu, comm)

    if (!station || !scu || !comm) {
        return res.status(400).json({ error: 'missing post data' });
    }

    const responseData = {
        station: station,
        scu: scu,
        comm: comm
    };

    res.status(201).json(responseData);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
