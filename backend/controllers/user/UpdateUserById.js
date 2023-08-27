const userModel = require('../../models/UserModel');

const updateUserById = async (req, res) => {
    try {
        const id = req.params.id;

        //check for availability
        const isUser = await userModel.findOne({ _id: id });

        if (!isUser) {
            res.status(400).json({ message: 'User not found' });
        } else {
            const user = await userModel.findByIdAndUpdate(id, req.body);
            res.status(201).json({ message: "Successfully Updated User", data: user });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Something went Wrong!! Failed to Update User', error: err });
    }
}

module.exports = updateUserById;