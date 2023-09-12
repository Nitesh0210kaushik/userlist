// userModel.js
// const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema({
//     name: { type: String, required: true },
//     domain: { type: String, required: true },
//     gender: { type: String, required: true },
//     availability: { type: String, required: true },
//     email: { type: String, required: true },
//     avatar: { type: String, required: true },
// });

// const User = mongoose.model('Users', userSchema);

// module.exports = User;


// User.js
// Models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    id: {
        type: Number, // Using the "Number" type for an integer field
        required: true
    },
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true // If you want email to be unique for each user
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other', 'Agender', 'Bigender', 'Polygender', 'Non-binary', 'Genderfluid', 'Genderqueer'], // Include 'Agender' as a valid enum value
        required: true
    },
    avatar: {
        type: String,
        required: true
    },
    domain: {
        type: String,
        required: true
    },
    available: {
        type: Boolean,
        required: true
    }


});

const User = mongoose.model('User', userSchema);

module.exports = User;