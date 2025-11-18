const { updateUser } = require('../../functions/checkLogin');

module.exports = async (req, res) => {
    const { id } = req.params;

    const result = await updateUser(id, req.body);

    return res.status(result.status).json(result);
};
