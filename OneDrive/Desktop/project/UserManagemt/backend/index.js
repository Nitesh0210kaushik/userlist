// const express = require('express');
// const cors = require('cors');
// const bodyParser = require('body-parser');
// const mongoose = require('mongoose');
// const User = require('./Models/User');
// // const userRoutes = require('./Routes/UseRoutes');


// const app = express();
// app.use(cors());
// const PORT = 5000;


// app.use(express.json())

// mongoose
//     .connect('mongodb://0.0.0.0:27017/userManagement', {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,

//     })
//     .then(() => console.log('MongoDB connected'))
//     .catch((err) => console.error('Error connecting to MongoDB:', err));

// // app.use('/users/search', userRoutes);





// app.get('/api/fetch-data', async(req, res) => {
//     try {
//         const users = await User.find();
//         res.json(users);
//         console.log("data inserted")
//     } catch (err) {
//         console.error('Error fetching data from MongoDB:', err);
//         res.status(500).json({ message: 'Error fetching data from MongoDB' });
//     }
// });

// router.get('/users/search', async(req, res) => {
//     try {
//         let name = req.query.first_name;
//         let users = await User.find(); // Fetch all users from the database

//         if (name) {
//             // If a name query parameter is provided, filter the users based on the first_name
//             users = users.filter(user => user.first_name === name);
//         }

//         res.send(users);
//     } catch (error) {
//         console.error(error);
//         res.status(500).send('Internal Server Error');
//     }
// });



// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });








const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const User = require('./Models/User');

const app = express();
app.use(cors());
const PORT = 5000;

app.use(express.json());

mongoose
    .connect('mongodb://0.0.0.0:27017/userManagement', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.error('Error connecting to MongoDB:', err));

// app.get('/users/search', async(req, res) => {
//     try {
//         let name = req.query.first_name;
//         let users = await User.find(); // Fetch all users from the database

//         if (name) {
//             // If a name query parameter is provided, filter the users based on the first_name
//             users = users.filter(user => user.first_name === name);
//         }

//         res.send(users);
//     } catch (error) {
//         console.error(error);
//         res.status(500).send('Internal Server Error');
//     }
// });
app.get('/users/search', async(req, res) => {
    try {
        const name = req.query.first_name;
        if (!name) {
            return res.status(400).json({ error: 'Please provide a first_name query parameter.' });
        }

        // Filter users directly in the database query based on the first_name field
        const users = await User.find({ first_name: name });

        res.send(users);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/api/fetch-data', async(req, res) => {
    try {
        const users = await User.find();
        res.json(users);
        console.log('data inserted');
    } catch (err) {
        console.error('Error fetching data from MongoDB:', err);
        res.status(500).json({ message: 'Error fetching data from MongoDB' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});