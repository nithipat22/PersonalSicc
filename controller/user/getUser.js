const { getUser } = require('../../functions/checkLogin');

module.exports = async (req, res) => {
    const { username } = req.query; //Postman ต้องส่งแบบ query ไม่ใช่ body
    
    const result = await getUser(username);

    return res.status(result.status).json(result);
};
