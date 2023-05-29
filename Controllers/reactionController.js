const Thought = require('./../Models/Thought');
const User = require('./../Models/User');

module.exports = {
    // Thoughts CRUD
    // Create a thought. Format:
    // {
    // "thoughtText": "contents of thought"
    // "username": "person1"
    // }
    async addReaction(req, res) {
        try {
            // assign thought to the given user in req
            await User.findOneAndUpdate({ username: req.body.username }, { $push: { thoughts: await Thought.create(req.body) } })
                .then((thought) => {
                    res.status(200).json(thought)
                })
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        };
    },
    //get all thoughts
    getReactions(req, res) {
        Thought.find()
            .then((thoughts) => res.json(thoughts))
            .catch((err) => res.status(500).json(err));
    },
    // Get single Thought
    getOneReaction(req, res) {
        // find a thought that matches the /:id
        Thought.findOne({ _id: req.params.thoughtID })
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
    // Update a thought
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            // find the thought by ID
            { _id: req.params.thoughtID },
            // then update the thought w the body of user req
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((thought) =>
                //if the thought doesn't exist, 404
                !thought
                    ? res.status(404).json({ message: 'No thought with that ID' })
                    //if it exists, return it
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
    // Delete a thought
    deleteReaction(req, res) {
        Thought.findOneAndDelete({ _id: req.params.thoughtID })
            .then((thought) =>
                // if thought not found
                !thought
                    ? res.status(404).json({ message: 'No thought with that ID' })
                    // if thought found
                    // delete all associated reactions
                    : Reaction.deleteMany({ _id: { $in: thought.reactions } })
            )
            .then(() => res.json({ message: 'Thought and Reactions deleted' }))
            .catch((err) => res.status(500).json(err));
    },
};
