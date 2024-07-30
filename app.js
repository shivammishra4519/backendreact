const express = require('express');
const cors = require('cors');
const app = express();
const {connectToDB}=require('./dbconnection');
const usersRegister=require('./route/authencation')

// Middleware
app.use(cors());
app.use(express.json()); // Parses JSON bodies
connectToDB();
// Routes
app.get('/', (req, res) => {
    res.send("Welcome to home");
});
app.use('/user',usersRegister)

// Error Handling Middleware
app.use((req, res, next) => {
    res.status(404).send("Sorry, can't find that!");
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Server
const port = 3200;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
