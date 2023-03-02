import { db } from "../database/db.connection.js";
import bcrypt from "bcrypt";

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

    
};