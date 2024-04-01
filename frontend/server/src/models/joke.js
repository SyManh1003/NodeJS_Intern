const mongoosse = require("mongoose");

const JokeSchema = new mongoosse.Schema({
    title: {
        type: String,
        required: true,
      },
    likes: { 
        type: Number, 
        default: 0,
    },
    dislikes: { 
        type: Number, 
        default: 0,
    }

});

const Joke = mongoosse.model('Joke', JokeSchema);

module.exports = Joke;