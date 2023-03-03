import { db } from "../database/db.connection.js";

export const validateUserMe = async (req, res, next) => {
    const token = req.headers.authorization;

    try{
        const session = await db.query('SELECT * FROM sessions WHERE token = $1', [token]);
        if(session.rows.length === 0) {
            return res.status(401).send("Invalid token.");
        }

        const userId = session.rows[0].userId;
        const user = await db.query(`SELECT * FROM users WHERE id = $1`, [userId]);
        if(user.rows.length === 0) {
            return res.status(404).send("User not found.");
        }
        
        req.userId = userId;
        
        next();

    } catch(err) {
        return res.status(500).send(err.message);
    }
};