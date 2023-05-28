const router = require('express').Router();
// import CRUD from courseController
const {
    createUser,
    getUsers,
    getOneUser,
    updateUser,
    deleteUser,
} = require('../../Controllers/userController');
// set /api/users methods for GET and POST
router.route('/').get(getUsers).post(createUser);
// CRUD for single user methods at /api/users/userID
router
    .route('/:userID')
    .get(getOneUser)
    .put(updateUser)
    .delete(deleteUser);

module.exports = router;
