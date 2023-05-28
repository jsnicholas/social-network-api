const Thought = require('./../Models/Thought');

module.exports = {
    // Get all Thoughts
    getThoughts(req, res) {
        Thought.find()
            .then((thoughts) => res.json(thoughts))
            .catch((err) => res.status(500).json(err));
    },
    // Get a Thought
    getOneThought(req, res) {
        // find a thought that matches the /:id
        Thought.findOne({ _id: req.params.ThoughtId })
            // select the most recent version
            .select('-__v')
            .then((thought) =>
                //if the thought doesn't exist, 404 res
                !thought
                    ? res.status(404).json({ message: 'No thought with that ID' })
                    // if it is found, return the thought as json object
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
    // Create a thought
    createThought(req, res) {
        // create a thought w/ req body
        Thought.create(req.body)
            // return the thought as a json object
            .then((thought) => res.json(thought))
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },
    // Delete a thought
    deleteThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.ThoughtId })
            .then((thought) =>
                // if thought not found
                !thought
                    ? res.status(404).json({ message: 'No thought with that ID' })
                    // if thought found
                    // How does this connect thoughts and users?
                    : Student.deleteMany({ _id: { $in: course.students } })
            )
            .then(() => res.json({ message: 'Course and students deleted!' }))
            .catch((err) => res.status(500).json(err));
    },
    // Update a thought
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            // find the thought by ID
            { _id: req.params.ThoughtId },
            // then update the thought w the body of user req
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((thought) =>
                //if the thought doesn't exist, 404
                !thought
                    ? res.status(404).json({ message: 'No thought with this id!' })
                    //if it does exist, return it
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
};
