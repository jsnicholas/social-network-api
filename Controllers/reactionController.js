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
        Thought.find({ _id: req.params.thoughtID }, ['reactions'])
            .then((reactions) => res.json(reactions))
            .catch((err) => res.status(500).json(err));
    },
    // Get single reaction from requested thought
    getOneReaction(req, res) {
        // find a thought that matches the /:thoughtID
        Thought.findOne({ _id: req.params.thoughtID })
            .then((thought) => {
                //filter out the reaction specified with /:reactionID
                var reaction = thought.reactions.filter(
                    reaction => reaction.reactionId ==
                        req.params.reactionID);
                res.json(reaction)
            })
    },
    // Delete a reaction
    deleteReaction(req, res) {
        Thought.updateOne(
            { _id: req.params.thoughtID },
            {
                $pull: {
                    reactions: {
                        reactionId: req.params.reactionID
                    }
                }
            }
        )
            .then((reaction) =>
                // if reaction not found
                !reaction
                    ? res.status(404).json({ message: 'No thought with that ID' })
                    // if thought found
                    // delete all associated reactions
                    : res.json({ message: 'Reaction Deleted' }))
            .catch((err) => res.status(500).json(err));
    },
};
