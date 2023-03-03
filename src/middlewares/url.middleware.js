import { db } from "../database/db.connection.js";
import { urlSchema } from "../schemas/urlSchema.js";

export const validateUrl = async (req, res, next) => {
    const { url } = req.body;

    try {
        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).send("Authorization header not found.");
        }

        const urlValidation = urlSchema.validate({ url });
        if(urlValidation.error) {
            return res.status(422).send(urlValidation.error.message);
        }

        const validToken = await db.query(`SELECT * FROM sessions WHERE token = $1`, [token]);
        if(validToken.rows.length < 0) {
            return res.status(401).send("Invalid token.");
        }

        req.userToken = validToken;

        next();

    } catch(err) {
        return res.status(500).send(err.message);
    }
};

export const validateUrlById = async (req, res, next) => {
    const { id } = req.params;
    
    try {
        const validUrl = await db.query(`SELECT * FROM urls WHERE id = $1`, [id]);
        if(validUrl.rows.length === 0) {
            return res.status(404).send("URL doesn't exist.");
        }

        next();

    } catch(err) {
        return res.status(500).send(err.message);
    }
};

export const validateShortUrl = async (req, res, next) => {
    const { shortUrl } = req.params;

    try {
        const validUrl = await db.query(`SELECT * FROM urls WHERE "shortUrl" = $1`, [shortUrl]);
        if(validUrl.rows.length === 0) {
            return res.status(404).send("URL not found.");
        }

        next();

    } catch(err) {
        return res.status(500).send(err.message);
    }
};

export const validateDeleteUrl = async (req, res, next) => {
    const { id } = req.params;

    try {
        const token = req.headers.authorization;
        if(!token) {
            return res.status(401).send("Invalid token.");
        }

        const tokenResponse = await db.query(`SELECT * FROM sessions WHERE token = $1`, [token]);
        const userIdByToken = tokenResponse.rows[0].userId;
        const idResponse = await db.query(`SELECT * FROM urls WHERE id = $1`, [id]);
        const userIdByUrl = idResponse.rows[0].userId;
        if(userIdByToken !== userIdByUrl) {
            return res.status(401).send("Cannot delete an URL you do not own.");
        }

        next();

    } catch(err) {
        return res.status(500).send(err.message);
    }
    
};