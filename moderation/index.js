const axios = require('axios');
const express = require('express');

const app = express();
app.use(express.json());

app.post('/events', async (req, res) => {
    const { type, data } = req.body;

    if (type === 'CommentCreated') {
        const status = data.content.includes('orange') ? 'rejected' : 'approved';
        await axios.post('http://localhost:4005/events', {
            type: 'CommentModerated',
            data: {
                id: data.id,
                content: data.content,
                postId: data.postId,
                status: status
            }
        });
    }

    res.send({});
});

app.listen(4003, () => {
    console.log('Moderation listening on 4003');
});