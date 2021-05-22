const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const transferSchema = new Schema({
    sender: {
        type: String,
        required: true
    },
    recipient: {
        type: String,
        required: true
    },
    message: String,
    amount: {
        type: Number,
        required: true
    }
});
const Transfer = mongoose.model('Transfer', transferSchema);

module.exports = Transfer;