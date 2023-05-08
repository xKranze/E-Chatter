const { Thought, User } = require('../models');

const thoughtController = {

  // Get all thoughts
  async getAllThoughts(req, res) {
    try {
      const thoughts = await Thought
        .find()
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Get single thought
  async getSingleThought(req, res) {
    try {
      const thought = await Thought
        .findById(req.params.thoughtId)
        .populate('reactions');
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //TODO want to figure out whats not working here this way
  //async createThought(req, res) {
  // try {
  //   const thought = await Thought
  //     .create(
  //       req.body,
  //       { new: true, runValidators: true }
  //     );
  //   const user = await User
  //     .findByIdAndUpdate(
  //       req.body.userId,
  //       // Pushes thought._id into thoughts
  //       { $push: { thoughts: thought._id } },
  //     );
  //   res.json(user);
  // } catch (err) {
  //   res.status(500).json(err);
  // }
  // },
  //------------------------------------------------------------------

  // Create new thought and associate it with a user id
  createThought(req, res) {
    Thought
      .create(req.body)
      .then((thought) => {
        return User.findOneAndUpdate(
          { _id: req.body.userId },
          { $push: { thoughts: thought._id } },
          { new: true }
        );
      })
      .then((user) => {
        if (!user) {
          res.status(500).json(err);
          return;
        }
        res.json(user);
      })
      .catch((err) =>
        res.json(err));
  },

  // Updates thought and returns object with updated thought back to user. Which is why we put req.body in line 54 here.
  async updateThought(req, res) {
    try {
      const thought = await Thought
        .findByIdAndUpdate(
          req.params.thoughtId,
          req.body,
          { new: true, runValidators: true });
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //TODO FIX-----------------------
  // Delete thought by id and remove from associated user
  async deleteThought(req, res) {
    try {
      const thought = await Thought
        .findByIdAndDelete(
          req.params.thoughtId,
        );
      const user = await User
        .findOneAndUpdate(
          // Finds user by thought id in thoughts
          { thoughts: { $in: req.params.thoughtId } },
          // Pulls (delete) thought id from thoughts
          { $pull: { thoughts: req.params.thoughtId } },
          { runValidators: true, new: true }
        );
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Add new reaction to thought
  async addNewReaction(req, res) {
    try {
      const thought = await Thought
        .findByIdAndUpdate(
          req.params.thoughtId,
          // Push new reaction into reactions)
          { $push: { reactions: req.body } },
          { new: true, runValidators: true }
        );
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //TODO FIX---------------------------------------
  // Delete reaction from thought
  async deleteReaction(req, res) {
    try {
      const thought = await Thought
        .findByIdAndUpdate(
          req.params.thoughtId,
          // Pull single reaction id from reactions
          { $pull: { reactions: req.params.reactionId } },
          { new: true, runValidators: true }
        );
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

module.exports = thoughtController;