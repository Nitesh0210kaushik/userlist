import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    useEffect(() => {
        const auth = localStorage.getItem('user');
        if (auth) {
            navigate('/');
        }
    }, []);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const CollectData = async () => {
        console.warn(name, email, password);
        try {
            let result = await fetch("http://localhost:5000/register", {
                method: 'post',
                body: JSON.stringify({ name, email, password }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            // if (!result.ok) {
            //     throw new Error(`Request failed with status ${result.status}`);
            // }

            result = await result.json();
            console.warn(result);

            localStorage.setItem("user", JSON.stringify(result));
            localStorage.setItem("token",JSON.stringify(result.auth))
            navigate('/');
        } catch (error) {
            alert("Email already registred")
            console.error('Error:', error.message);
        }
    };

    return (
        <div className='register'>
            <h1>Registration Page</h1>
            <input
                className="inputBox"
                type="text"
                placeholder="Enter Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <input
                className="inputBox"
                type="text"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                className="inputBox"
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={CollectData} className="appButton" type="button">Sign Up</button>
        </div>
    );
};

export default SignUp;
