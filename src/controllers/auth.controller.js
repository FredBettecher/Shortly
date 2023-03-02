import { db } from "../database/db.connection.js";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";


export const postSignup = async (req, res) => {
    const { name, email, password, confirmPassword } = req.body;
    const passwordHash = bcrypt.hashSync(password, 10);
    
    try {
        const newSignup = await db.query(`INSERT INTO users (name, email, password) VALUES ($1, $2, $3)`, [name, email, passwordHash]);
        res.status(201).send("Sign-up complete!");

    } catch(err) {
        return res.status(500).send(err.message);
    }
};

export const postSignin = async (req, res) => {
    const { email, password } = req.body;
    const user = await db.query(`SELECT * FROM users WHERE email = $1`, [email]);

    try {
        const userId = user.rows[0].id
        const token = uuid();
        await db.query(`INSERT INTO sessions (userId, token) VALUES ($1, $2)`, [userId, token]);

        return res.status(200).send({ token: token});

    } catch(err) {
        return res.status(500).send(err.message);
    }
};