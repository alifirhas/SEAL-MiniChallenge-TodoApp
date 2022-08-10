const jsonwebtoken = require("jsonwebtoken");


async function verifyToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({
            status: 401,
            message: "Access Denied! Unauthorized User",
        });
    } else {
        jsonwebtoken.verify(token, process.env.SECRET_KEY, (err, authData) => {
            if (err) {
                res.status(401).json({
                    status: 401,
                    message: "Invalid Token...",
                });
            } else {
                next();
            }
        });
    }
}

module.exports = { verifyToken }
