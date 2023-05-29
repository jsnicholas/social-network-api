// /api/thoughts
const router = require('express').Router();
// import thought CRUD from thoughtController
const {
    createThought,
    getThoughts,
    getOneThought,
    updateThought,
    deleteThought,
} = require('../../Controllers/thoughtController');
// set /api/thoughts methods for GET and POST
router.route('/').get(getThoughts).post(createThought);
// CRUD for single thought methods at /api/users/userID
router
    .route('/:thoughtID')
    .get(getOneThought)
    .put(updateThought)
    .delete(deleteThought);

// Reaction CRUD
// import CRUD from reactionController
const {
    getReactions,
    addReaction,
    getOneReaction,
    deleteReaction
} = require('../../Controllers/reactionController');
router
    .route('/:thoughtID/reactions')
    .get(getReactions)
    .post(addReaction);
router
    .route('/:thoughtID/reactions/:reactionID')
    .get(getOneReaction)
    .delete(deleteReaction);

module.exports = router;