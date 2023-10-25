const mongoose = require('mongoose');

const { Schema } = mongoose;

const birdSchema = new Schema({
    species:  { type: String, required: true },
    nickName: { type: String, required: true },
    status:  { type: String, enum: ['Alive', 'Dead', 'Unknown']}
});

const Bird = mongoose.model('Bird', birdSchema);

module.exports = Bird;