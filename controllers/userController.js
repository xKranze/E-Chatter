const { User, Thought } = require('../models');

const userController = {

  // Get all users
  async getAllUsers(req, res) {
    try {
      const users = await User.find({});
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Get single user
  async getSingleUser(req, res) {
    try {
      const user = await User
        .findById(req.params.id)
        .populate('thoughts')
        .populate('friends');
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Create new user
  async createNewUser(req, res) {
    try {
      const user = await User
        .create(req.body);
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Update user
  async updateUser(req, res) {
    try {
      const user = await User
        .findByIdAndUpdate(
          req.params.id,
          req.body,
          { new: true, runValidators: true });
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Delete user and their thoughts
  async deleteUser(req, res) {
    try {
      const user = await User
        .findByIdAndDelete(
          req.params.id);
      const thoughts = await Thought
        .deleteMany(
          // delete all thoughts inside user.thoughts array
          { _id: { $in: user.thoughts } }
        );
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Add new friend to users friend list
  async addNewFriend(req, res) {
    try {
      const user = await User
        .findByIdAndUpdate(
          req.params.userId,
          // If exisiting friend is present dont add (add to set)
          { $addToSet: { friends: req.params.friendId } },
          { new: true, runValidators: true }
        );
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Delete friend from user's friend list
  async deleteFriend(req, res) {
    try {
      const user = await User
        .findByIdAndUpdate(
          req.params.userId,
          // Pull single friend id from friend's list
          { $pull: { friends: req.params.friendId } },
          { new: true, runValidators: true }
        );
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

module.exports = userController;