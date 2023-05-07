const router = require('express').Router();
const {
  getAllUsers,
  getSingleUser,
  createNewUser,
  updateUser,
  deleteUser,
  addNewFriend,
  deleteFriend,
} = require('../controllers/userController');

//Routes for /api/users
router
  .route('/')
  .get(getAllUsers)
  .post(createNewUser);

//Routes for /api/users/:id
router
  .route('/:id')
  .get(getSingleUser)
  .put(updateUser)
  .delete(deleteUser);

// Routes for /api/users/:userId/friends/:friendId
router
  .route('/:userId/friends/:friendId')
  .post(addNewFriend)
  .delete(deleteFriend);

module.exports = router;