// /api/thoughts
const router = require('express').Router();
// import CRUD from thoughtController
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
    .route('/:thoughtId')
    .get(getOneThought)
    .put(updateThought)
    .delete(deleteThought);

module.exports = router;



// GET to get all thoughts

// GET to get a single thought by its _id

// POST to create a new thought (don't forget to push the created thought's _id to the associated user's thoughts array field)

// // example data
// {
//   "thoughtText": "Here's a cool thought...",
//   "username": "lernantino",
//   "userId": "5edff358a0fcb779aa7b118b"
// }
// PUT to update a thought by its _id

// DELETE to remove a thought by its _id

// /api/thoughts/:thoughtId/reactions

// POST to create a reaction stored in a single thought's reactions array field

// DELETE to pull and remove a reaction by the reaction's reactionId value