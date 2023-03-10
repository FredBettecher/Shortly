import { db } from "../database/db.connection.js";
import { nanoid } from "nanoid";

export const postUrlShorten = async (req, res) => {
    const { url } = req.body;

    try {
        const session = req.userToken.rows[0];
        const userId = session.userId;
        const shortUrl = nanoid(8);
        await db.query(`INSERT INTO urls ("userId", url, "shortUrl") VALUES ($1, $2, $3)`, [userId, url, shortUrl]);
        const findUrl = await db.query(`SELECT * FROM urls WHERE "shortUrl" = $1`, [shortUrl]);
        
        const response = {
            id: findUrl.rows[0].id,
            shortUrl: findUrl.rows[0].shortUrl
        };
        
        return res.status(201).send(response);

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

export const getOpenShortUrl = async (req, res) => {
    const { shortUrl } = req.params;

    try {
        const result = await db.query(`SELECT * FROM urls WHERE "shortUrl" = $1`, [shortUrl]);
        const url = result.rows[0];
        await db.query(`UPDATE urls SET "visitCount" = "visitCount" + 1 WHERE "shortUrl" = $1`, [shortUrl]);

        return res.redirect(url.url);

    } catch(err) {
        return res.status(500).send(err.message);
    }
};

export const deleteUrlById = async (req, res) => {
    const { id } = req.params;

    try {
        await db.query(`DELETE FROM urls WHERE id = $1`, [id]);
        return res.status(204).send("URL deleted successfully.");

    } catch(err) {
        return res.status(500).send(err.message);
    }
};