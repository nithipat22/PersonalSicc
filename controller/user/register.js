const { registerUser } = require('../../functions/checkLogin');

module.exports = async (req, res) => {
    const { username, password, fullname, email, role } = req.body;

    const result = await registerUser({ username, password, fullname, email, role });

    return res.status(result.status).json(result);
};
