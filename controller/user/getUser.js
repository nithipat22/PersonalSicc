const { getUser } = require('../../functions/checkLogin');

module.exports = (req, res) => {
    const { username } = req.query; //Postman ต้องส่งแบบ query ไม่ใช่ body

    const result = getUser(username);

    return res.status(result.status).json(result);
};
