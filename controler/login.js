const { getDB } = require('../dbconnection');
const bcrypt = require('bcryptjs');

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ statusCode: 400, message: "Request body cannot be empty" });
        }

        const db = getDB();
        const collection = db.collection('users');
        const userExit = await collection.findOne({ email });

        if (!userExit) {
            return res.status(400).json({ statusCode: 400, message: "Invalid email" });
        }

        const passwordMatch = await bcrypt.compare(password, userExit.password);

        if (!passwordMatch) {
            return res.status(400).json({ statusCode: 400, message: "Incorrect password" });
        }

        res.status(200).json({ statusCode: 200, message: "Logged in successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = { login };
