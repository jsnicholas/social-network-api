const User = require('./../Models/User');

module.exports = {
    // User CRUD
    // Create a User
    async createUser(req, res) {
        await User.create(req.body)
            .then((user) => res.json(user))
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },
    // Get all users
    async getUsers(req, res) {
        await User.find()
            .then((users) => res.status(200).json(users))
            .catch((err) => res.status(500).json(err));
    },
    // Get a single user
    getOneUser(req, res) {
        User.findOne({ _id: req.params.userID })
            .select('-__v')
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'User ID not found.' })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },
    // Update a course
    updateUser(req, res) {
        Course.findOneAndUpdate(
            { _id: req.params.userID },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((course) =>
                !course
                    ? res.status(404).json({ message: 'User ID not found.' })
                    : res.json(course)
            )
            .catch((err) => res.status(500).json(err));
    },
    // Delete a user
    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.userID })
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'User ID not found.' })
                    // Delete all thoughts associated with deleted user
                    : User.deleteMany({ _id: { $in: user.thoughts } })
            )
            .then(() => res.json({ message: 'Course and students deleted!' }))
            .catch((err) => res.status(500).json(err));
    },
};
