import { db } from "../database/db.connection.js";
import { nanoid } from "nanoid";

export const postUrlShorten = async (req, res) => {
    const { url } = req.body;
    const session = req.userToken.rows[0];
    const userId = session.userId;

    try {
        const shortUrl = nanoid(10);
        await db.query(`INSERT INTO urls ("userId", url, "shortUrl") VALUES ($1, $2, $3)`, [userId, url, shortUrl]);
        const findUrl = await db.query(`SELECT * FROM urls WHERE "shortUrl" = $1`, [shortUrl]);
        
        
        return res.status(201).send({
            id: findUrl.rows[0].id,
            shortUrl: findUrl.rows[0].shortUrl
        })

    } catch(err) {
        return res.status(500).send(err.message);
    }
};

export const getShortUrl = async (req, res) => {
    const { id } = req.params;

    try {
        const url = await db.query(`SELECT * FROM urls WHERE id = $1`, [id]);
        return res.status(200).send({
            id: url.rows[0].id,
            shortUrl: url.rows[0].shortUrl,
            url: url.rows[0].url
        });

    } catch(err) {
        return res.status(500).send(err.message);
    }
};