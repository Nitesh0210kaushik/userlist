const express = require("express");
const cors = require('cors');
const { connectDB, UserModel } = require('./db/Config');
const bcrypt = require("bcrypt");
const userRoutes = require('./db/Router');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const Jwt = require('jsonwebtoken');
const jwtKey = 'nit';

connectDB();
app.use(userRoutes);


app.post("/register", async (req, resp) => {
    try {
        const { name, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10); 

        const user = new UserModel({
            name: name,
            email: email,
            password: hashedPassword,
        });

        const result = await user.save(); 
        const { password: hashedPwd, ...userWithoutPwd } = result.toObject();

        Jwt.sign({ user: userWithoutPwd }, jwtKey, { expiresIn: "2h" }, (err, token) => {
            if (err) {
                resp.status(500).send("Something went wrong");
            }
            resp.send({ user: userWithoutPwd, auth: token });
        });
    } catch (error) {
        resp.status(500).send("Error registering user");
    }
});

app.post("/login", async (req, resp) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });

        if (user) {
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (isPasswordValid) {
                const { password: hashedPwd, ...userWithoutPwd } = user.toObject();

                Jwt.sign({ user: userWithoutPwd }, jwtKey, { expiresIn: "2h" }, (err, token) => {
                    if (err) {
                        resp.status(500).send("Something went wrong");
                    }
                    resp.send({ user: userWithoutPwd, auth: token });
                });
            } else {
                resp.status(401).send({ result: "Invalid credentials" });
            }
        } else {
            resp.status(404).send({ result: "No User found" });
        }
    } catch (error) {
        resp.status(500).send("Error during login");
    }
});



const port = 5000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

