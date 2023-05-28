const { Schema, model } = require('mongoose');

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
        reactions: [{
            type: Schema.Types.ObjectId,
            ref: 'reactions',
        }],
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    });

// TO-DO: Create a virtual called reactionCount that retrieves the length of the thought's reactions array field on query.

const Thought = model('thought', thoughtSchema);

module.exports = Thought;
