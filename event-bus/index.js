const axios = require('axios');
const express = require('express');

const app = express();
app.use(express.json());

const events = [];

app.get('/events', (req, res) => {
    res.send(events);
});

app.post('/events', (req, res) => {
    const event = req.body;

    events.push(event);

    const onCatch = (err) => {
        console.log(err.message);
    };

    axios.post('http://localhost:4000/events', event).catch(onCatch);
    axios.post('http://localhost:4001/events', event).catch(onCatch);
    axios.post('http://localhost:4002/events', event).catch(onCatch);
    axios.post('http://localhost:4003/events', event).catch(onCatch);

    res.send({ status: 'OK' });
});

app.listen(4005, () => {
    console.log('Event bus listening on 4005');
});