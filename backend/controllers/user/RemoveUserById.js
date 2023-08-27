const userModel = require('../../models/UserModel');

const removeUserById = async (req, res) => {
    try {
        const id = req.params.id;
        //check for availability
        const isUser = await userModel.findOne({ _id: id });
        
        if (!isUser) {
            res.status(400).json({ message: 'User Not Found.' });
        } else {
            const user = await userModel.findByIdAndDelete(id);
            res.status(200).json({ data: user, message: 'Successfully Deleted.' });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err, message: 'Something went Wrong deleting User.' });
    }
};

module.exports = removeUserById;