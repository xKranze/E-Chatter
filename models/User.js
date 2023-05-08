const mongoose = require('mongoose');
const { Schema, model } = require('mongoose');

// Schema to create User model
const userSchema = new Schema({
  username: {
    type: String,
    default: true,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
    required: true,
    unique: true,
    match: /.+\@.+\..+/,
  },

  thoughts: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Thought',
    },
  ],
  friends: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
},
  {
    // Mongoose supports two Schema options to transform Objects after querying MongoDb: toJSON and toObject.
    // Here we are indicating that we want virtuals to be included with our reaction, overriding the default behavior
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);
// virtual called friendCount that retrieves the length of the user's friends array field on query.
userSchema
  .virtual('friendCount')
  // Getter
  .get(function () {
    return this.friends.length;
  })

// Initialize our User model
const User = model('user', userSchema);


// //	{
//   "username": "Brad",
//   "email": "brad@yahoo.com",
//   "thoughts": [],
//   "friends": []
// }
module.exports = User;
