const mongoose = require('mongoose');

const Joke = require("../models/joke");

class JokeServices {
    async randContent() {
        const joke = await Joke.findOne().skip(Math.floor(Math.random() * await Joke.countDocuments()));
        console.log(joke);
        return joke;
    }

    async updateContent(sessionId, jokeId, voteType) {
        // console.log(sessionId)
        const getJoke = await Joke.findById(jokeId);
        const getAllJoke = await Joke.find();
        if(!getJoke) {
            throw new Error("Joke not found~");
        }

        if(voteType == 1) {
            getJoke.likes += 1;
        }else {
            getJoke.dislikes +=1;
        }

        const updateJoke = await getJoke.save();
        // const newContent = await randContent(userId);


        console.log(sessionId)
        const sessionIdArray = sessionId.split(',');

        const uniqueJokeIds = getAllJoke.filter(joke => !sessionIdArray.includes(joke.id));

        console.log(uniqueJokeIds)
        if (uniqueJokeIds.length > 0) {
            const randomJokeId = uniqueJokeIds[Math.floor(Math.random() * uniqueJokeIds.length)];
    
            const newJoke = await Joke.findById(randomJokeId);

            // const selectedJoke = getAllJoke.find(joke => joke.id === randomJokeId);
            // return selectedJoke;
        
            const updatedSessionIds = [...sessionIdArray, randomJokeId._id];
        // Trả về mảng mới
        return {
            newJoke,
            updatedSessionIds
        };

        } else {
            throw new Error("None of the provided joke IDs exist");
        }


        return updateJoke;
    }

};

module.exports = JokeServices;