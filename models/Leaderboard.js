const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const leaderboardSchema = new Schema({
    ppname: {
        type: String,
        required: true
    },
    coins: {
        type: Number,
        required: true
    }
});
const Leaderboard = mongoose.model('Leaderboard', leaderboardSchema);

module.exports = Leaderboard;