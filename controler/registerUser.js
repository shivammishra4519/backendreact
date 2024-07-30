const { getDB } = require('../dbconnection');
const bcrypt = require('bcryptjs');

const registre = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ message: "Data not found in body" });
        }

        const db = getDB();
        const collection = db.collection('users');
        const existingUser = await collection.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: null});
        }

        // Generate a salt and hash the password
        const salt = await bcrypt.genSalt(10); // 10 is the salt rounds
        const hashedPassword = await bcrypt.hash(password, salt);

        // Save the new user with the hashed password
        const newUser = { name, email, password: hashedPassword };
        await collection.insertOne(newUser);

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
        console.error(error);
    }
};

module.exports = { registre };
