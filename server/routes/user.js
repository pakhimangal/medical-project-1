const express = require('express');
const {
  userById,
  allUsers,
  getUser,
  updateUser,
  deleteUser,
  userPhoto,
  addFollowing,
  addFollower,
  removeFollowing,
  removeFollower,
  findPeople,
  hasAuthorization,
  addBookmark,
  removeBookmark,
  userCount,
} = require('../controllers/user');
const { requireSignin } = require('../controllers/auth');

const router = express.Router();

router.put('/user/follow', requireSignin, addFollowing, addFollower);
router.put('/user/unfollow', requireSignin, removeFollowing, removeFollower);
//add or remove bookmark
router.put('/user/bookmark', addBookmark);
router.put('/user/unbookmark', removeBookmark);
router.get('/user/count', userCount);
router.get('/users', allUsers); // access to all and no authentication for this
router.get('/user/:userId', requireSignin, getUser); // need middleware requireSignin
router.put('/user/:userId', requireSignin, updateUser); // PATCH is for making small update and PUT for whole obj update
// photo
router.get('/user/photo/:userId', userPhoto); // get photo with separate router to increase efficiency
router.delete('/user/:userId', requireSignin, deleteUser);

// who to follow
router.get('/user/findpeople/:userId', requireSignin, findPeople);

// any route containing :userId, our app will first execute userByID()
router.param('userId', userById);

module.exports = router;
