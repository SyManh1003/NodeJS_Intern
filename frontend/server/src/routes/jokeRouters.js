const express = require("express");
const mongoose = require('mongoose');
const router = express.Router();

const JokeServices = require("../services/jokeServices");
const jokeServices = new JokeServices();

router.get('/', async (req, res) => {
    try {
        // const userId = req.cookies.userId;
        const getJoke = await jokeServices.randContent();

        res.json(getJoke);
    } catch (err) {
        console.error(err);
        res.status(500).send('Rand content error~');
    }
});

router.post('/vote', async (req, res) => {
    try {
        const sessionId = req.body.sessionId;
        // console.log(sessionId)
        const jokeId = req.body.jokeId;
        const voteType = req.body.voteType; // '1 == like' or '0 == dislike'

        const objectId = new mongoose.Types.ObjectId(jokeId);

        const updatedJokeStatus = await jokeServices.updateContent(sessionId, objectId, voteType);

        res.json(updatedJokeStatus);
    } catch (err) {
        // console.error(err);
        res.status(500).send(false);
    }
});

module.exports = router;
