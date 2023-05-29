const { Schema, model } = require('mongoose');
const reactions = require('./Reaction')

// Thought Schema
const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            trim: true,
            minLength: 1,
            maxLength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now(),
            //TO-DO: Use a getter method to format the timestamp on query
        },
        username: {
            type: String,
            required: true,
            ref: 'user',
        },
        reactions: [reactions],
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    });

// Create a virtual called reactionCount that retrieves the length of the thought's reactions array field on query.
thoughtSchema
    .virtual('reactionCount')
    .get(function () {
        const numOfReactions = this.reactions.length;
        return numOfReactions;
    })


const Thought = model('thought', thoughtSchema);

module.exports = Thought;
