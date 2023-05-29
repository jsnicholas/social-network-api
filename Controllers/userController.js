const User = require('./../Models/User');
const Thought = require('./../Models/Thought');

module.exports = {
    // User CRUD
    // Create a User
    // POST
    // /api/users
    // {
    // "username":"person1"
    // "email":"email@email.org"
    // }
    async createUser(req, res) {
        await User.create(req.body)
            .then((user) => res.json(user))
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },
    // Get all users
    // GET
    // /api/users
    async getUsers(req, res) {
        await User.find()
            .then((users) => res.status(200).json(users))
            .catch((err) => res.status(500).json(err));
    },
    // Get a single user
    // GET
    // /api/users/:id
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
    // Update a user
    // PUT
    // /api/users/:id
    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userID },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'User ID not found.' })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },
    // Delete a user
    async deleteUser(req, res) {
        try {
            await User.findOneAndDelete({ _id: req.params.userID })
                .then((user) =>
                    !user
                        ? res.status(404).json({ message: 'User ID not found.' })
                        // Delete all thoughts associated with deleted user
                        : Thought.deleteMany({ username: { $in: user.username } }))
                .then(() => res.json({ message: 'User and their thoughts have been deleted.' }))
        } catch (err) { res.status(500).json(err) };
    },
};
