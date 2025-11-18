const { checkLogin } = require('../../functions/checkLogin');

module.exports = async (req, res) => {
    const { username, password } = req.body;

    const result = await checkLogin(username, password);

    return res.status(result.status).json({ message: result.message });
};


