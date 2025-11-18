const { getAllUsers } = require('../../functions/checkLogin');

module.exports = async (req, res) => {
    const result = await getAllUsers();
    return res.status(result.status).json(result);
};
