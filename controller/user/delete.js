const { deleteUser } = require('../../functions/checkLogin');


module.exports = (req, res) => {
    const { username, password } = req.body;

    const result = deleteUser(username, password);

    return res.status(result.status).json(result)
}