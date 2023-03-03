import { db } from "../database/db.connection.js";

export const getUsersMe = async (req, res) => {
    const { userId } = req;

    try {
        const user = await db.query(`SELECT * FROM users WHERE id = $1`, [userId]);
        const urls = await db.query(`SELECT id, url, "shortUrl", SUM("visitCount") AS "visitCount" FROM urls WHERE "userId" = $1 GROUP BY id`, [userId]);

        const response = {
            id: user.rows[0].id,
            name: user.rows[0].name,
            visitCount: urls.rows.reduce((acc, curr) => acc + curr.visitCount, 0),
            shortenedUrls: urls.rows.map((url) => ({
                id: url.id,
                shortUrl: url.shortUrl,
                url: url.url,
                visitCount: url.visitCount,
        })),
        };

        return res.status(200).json(response);

    } catch(err) {
        return res.status(500).send(err.message);
    }
};