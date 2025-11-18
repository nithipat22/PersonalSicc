
const { registerUser } = require('../../functions/checkLogin');
const userModels = require('../../models/users')

module.exports = async (req, res) => {
    const { username, password, fullname, email } = req.body;

    const result = await registerUser(username, password);
    if(!result.status){
        return res.status(400).json({ message: result.message });
    }

    await userModels.create({ username, password, fullname, email });

    return res.status(201).json({ message: result.message });
};