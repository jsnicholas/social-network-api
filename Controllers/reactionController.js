const Thought = require('./../Models/Thought');
const User = require('./../Models/User');

module.exports = {
    // Thoughts CRUD
    // Create a reaction. Format:
    // {
    // "reactionText": "contents of reaction"
    // "username": "who posted the reaction"
    // }
    async addReaction(req, res) {
        try {
            // add a reaction to requested thought
            // return the array of reactions after POST completes
            await Thought.findOneAndUpdate({ _id: req.params.thoughtID }, { $push: { reactions: { reactionBody: req.body.reactionBody, username: req.body.username } } }, { new: true })
                .then((reaction) => {
                    res.status(200).json(reaction)
                })
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        };
    },
    //get all reactions from requested thought
    getReactions(req, res) {
        Thought.find({}, ['reactions'])
            .then((reactions) => res.json(reactions))
            .catch((err) => res.status(500).json(err));
    },
    // Get single reaction from requested thought
    getOneReaction(req, res) {
        // find a reaction that matches the /:id
        Thought.findOne({}, { reactions: [{ _id: req.params.reactionID }] })
            .then((thought) => {
                res.json(thought)
            })
        // Access a single subdocument within the "reactions" array
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
