const User = require('./../Models/User');

module.exports = {
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
                    ? res.status(404).json({ message: 'No user with that ID' })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },
    // Delete a user
    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.userId })
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No user with that ID' })
                    // To Do: do we need a delete many for any reason? Delete user thoughts?
                    : User.deleteMany({ _id: { $in: course.students } })
            )
            .then(() => res.json({ message: 'Course and students deleted!' }))
            .catch((err) => res.status(500).json(err));
    },
    // Update a course
    updateUser(req, res) {
        Course.findOneAndUpdate(
            { _id: req.params.courseId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((course) =>
                !course
                    ? res.status(404).json({ message: 'No course with this id!' })
                    : res.json(course)
            )
            .catch((err) => res.status(500).json(err));
    },
};
