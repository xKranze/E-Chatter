const router = require('express').Router();

const {
  getAllThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  addNewReaction,
  deleteReaction,
} = require('../../controllers/thoughtController');

// Routes for /api/thoughts
router.route('/')
  .get(getAllThoughts)
  .post(createThought);

// Routes for /api/thoughts/:thoughtId
router.route('/:thoughtId')
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);

// Routes for /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions')
  .post(addNewReaction);

// Routes for /api/thoughts/:thoughtId/reactions/:reactionId
router.route('/:thoughtId/reactions/:reactionId')
  .delete(deleteReaction);

module.exports = router;