const { resetPassword } = require('../../functions/checkLogin')

module.exports = (req, res) => {
    const { username, password, newpassword } = req.body;

    const result = resetPassword(username, password, newpassword);

    return res.status(result.status).json({ message: result.message });
};
