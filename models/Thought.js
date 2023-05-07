const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');

// Schema to create Thought model
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      maxlength: 280,
      minlength: 1,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      // Getter  method to format the timestamp on query
      get: (timestamp) => new Date(timestamp).toLocaleDateString(),
    },
    //(These are like replies)
    //Array of nested documents created with the reactionSchema
    reactions: [reactionSchema]
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

// virtual called reactionCount that retrieves the length of the thought's reactions array field on query.
thoughtSchema
  .virtual('reactionCount').get(function () {
    return this.reactions.length;
  });

  // Schema to create reaction schema only
const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new mongoose.Types.ObjectId()
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280
    },
    username: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
  // Getter  method to format the timestamp on query
      get: timestamp => new Date(timestamp).toLocaleDateString(),
    }
  },
  {
    toJSON: {
      getters: true
    }
  }
);

// Initialize Thought model
const Thought = model('thought', thoughtSchema);

module.exports = Thought;