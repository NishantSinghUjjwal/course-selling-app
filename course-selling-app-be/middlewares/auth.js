const jwt = require('jsonwebtoken')


const generateJWT = (data, secret) => {
    const { username, role } = data;
    const token = jwt.sign({ username, role }, secret, { expiresIn: '1h' });
    return token;
}


//authenticate admin
const authenticateAdmin = (req, res, next) => {
    try {

        const token = req.headers.authorization?.split(" ")[1];
        if (!token) return res.status(403).send({ message: "Unauthorized" })
        const { username } = jwt.verify(token, process.env.ADMIN_SECRET);
        if (username) {
            req.user = username
            next()
        } else return res.status(403).send({ message: "Unauthorized" })
    } catch (err) {
        console.log("Error", err)
        return res.status(500).send({ message: err })
    }
}

//authenticate user
const authenticateUser = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(403).send({ message: "Unauthorized" })
    const { username } = jwt.verify(token, process.env.USER_SECRET);
    if (username) {
        req.user = username
        next()
    } else return res.status(403).send({ message: "Unauthorized" })
}
module.exports = {
    generateJWT,
    authenticateAdmin,
    authenticateUser
}