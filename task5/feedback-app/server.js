const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 3000;

// CORS setup
const corsOptions = {
    origin: ['http://localhost:5173', 'http://localhost:3000'],
    credentials: true,
    optionSuccessStatus: 200
};
app.use(cors(corsOptions));

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb+srv://balalthiru:SicMundasCreatusEst@cluster0.xy24r.mongodb.net/', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Mongoose model for Feedback collection
const feedbackSchema = new mongoose.Schema({
    feedbackId: Number,
    fullName: String,
    content: String,
});
const Feedback = mongoose.model('Feedback', feedbackSchema);

// Handle form submissions
app.post('/', async (req, res) => {
    const { feedbackId, fullName, content } = req.body;

    if (!feedbackId || !fullName || !content) {
        return res.status(400).json({ error: 'Full Name, Content, and Feedback ID are required' });
    }

    try {
        const feedbackSaveResponse = await Feedback.create({
            feedbackId,
            fullName,
            content
        });

        const createdFeedback = await Feedback.findById(feedbackSaveResponse._id);

        if (!createdFeedback) {
            return res.status(500).json({ error: 'Failed to create feedback' });
        }

        return res.status(201).json({ "created feedback": createdFeedback });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'An error occurred while saving feedback' });
    }
});

// GET endpoint to fetch all feedback entries
app.get('/api/feedbackCollection', (req, res) => {
    Feedback.find()
        .then((feedbackEntries) => {
            res.status(200).json(feedbackEntries); // Send feedback entries as JSON response
        })
        .catch((error) => {
            res.status(500).json({ error: 'Failed to fetch feedback' }); // Handle error
        });
});

// Start server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
