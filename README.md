# Social Network API

## Description

This is an API for a social network back end that allows users to create microblog posts (called "Thoughts" here), add friends, and react to other posts. It is created with Node, Express, MongoDB, and Mongoose.

## Installation

After downloading, run `npm i` to install dependencies. Start the server with `npm run start`

## Usage

### API Routes

### /api/users

**GET** - Get all users

**POST** - Create a new user. Request format:

```
{
"username" : "testUser",
"email" : "email@address.com
}
```

### /api/users/:userID

**GET** - Get a single user with requested user ID.

**PUT** - Update a single user with requested user ID. Request is structured as the above format for creating a new user.

**DELETE** - Delete a single user with requested user ID.

### /api/thoughts

**GET** - Get all thoughts from all users.

**POST** - Create a new thought. Request format:

```
{
"thoughtText": "contents of thought (between 1 - 280 characters)"
"username" : "username of thought creator"
}
```

### /api/thoughts/:thoughtID

**GET** - Get a single thought with requested thought ID.
**PUT** - Update a single thought with requested thought ID. Follows same request structure as creating a new thought.
**DELETE** - Delete a single thought with requested thought ID.

### /api/thoughts/:thoughtID/reactions

**GET** - Get all reactions for a single thought with requested thought ID.
**POST** - Add a reaction to a single thought with requested thought ID.

### /api/thoughts/:thoughtID/reactions/:reactionID

**GET** - Get a single reaction with requested reaction ID, for a thought with requested thought ID.
**DELETE** - Delete a single reaction with requested reaction ID, for a thought with requested thought ID.

## Demo Video

## License

MIT. Please read the LICENSE file for more information.
