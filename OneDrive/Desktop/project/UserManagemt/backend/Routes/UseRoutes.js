// const express = require('express');
// const router = express.Router();
// const User = require('../Models/User');

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

// module.exports = router;