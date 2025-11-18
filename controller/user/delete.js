const { deleteUser } = require('../../functions/checkLogin');

module.exports = async (req, res) => {
    const { username, password } = req.body;

    const result = await deleteUser(username, password);

    return res.status(result.status).json(result);
};
