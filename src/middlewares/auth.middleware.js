import { db } from "../database/db.connection.js"
import { signinSchema, signupSchema } from "../schemas/authSchema.js";
import bcrypt from "bcrypt";

export const validateSignup = async (req, res, next) => {
    const { name, email, password, confirmPassword } = req.body;

    const signupValidation = signupSchema.validate({ name, email, password, confirmPassword });
    if(signupValidation.error) {
        return res.status(422).send(signupValidation.error.message);
    }

    const emailExists = await db.query(`SELECT * FROM users WHERE email = $1`, [email]);
    if(emailExists.rows.length > 0) {
        return res.status(409).send("E-mail already in use.");
    }

    next();
};

export const validateSignin = async (req, res, next) => {
    const { email, password } = req.body;

    const signinValidation = signinSchema.validate({ email, password });
    if(signinValidation.error) {
        return res.status(422).send(signinValidation.error.message);
    }

    const userExists = await db.query(`SELECT * FROM users WHERE email = $1`, [email]);
    if(userExists.rows.length === 0) {
        return res.status(401).send("E-mail or password incorrect.");
    }

    const user = userExists.rows[0];
    const correctPassword = await bcrypt.compare(password, user.password);
    if(!correctPassword) {
        return res.status(401).send("E-mail or password incorrect.");
    }

    next();
};