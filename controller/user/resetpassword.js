const { resetPassword } = require('../../functions/checkLogin');

module.exports = async (req, res) => {
    const { username, password, newpassword } = req.body;

    const result = await resetPassword(username, password, newpassword);

    return res.status(result.status).json(result);
};
