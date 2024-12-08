const mongoose = require('mongoose');

const User = new mongoose.Schema({
    username: { type: String, required: true, minLength: 3, maxLength: 30},
    password: { type: String, required: true, minLength: 8, maxLength: 100},
    rollNo:  { type: String, required: true, minLength: 8, maxLength: 30}
});

module.exports = mongoose.model('User', User);