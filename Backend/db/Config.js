const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://0.0.0.0:27017/userslist"); // Replace '0.0.0.0' with 'localhost' if the database is on your local machine
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
};

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true, // Ensure that each email is unique in the collection
        trim: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6, // Password should be at least 6 characters long
    },
});

const UserModel = mongoose.model('user', userSchema);

module.exports = {
    connectDB,
    UserModel,
};
