// code the api with the necessary folder and structure based on the needed enpoint provided below, the structure of the appwrite document is provided too
// Content
// tokenUri - string

// ipfsUrl - string

// type -  required - enum "video" or "audio" or "image" or "text"

//POST /contents
// create a new content
//GET /contents
//get contents based on search parameter e.g based on the type filtering
//GET /contents/:id
//get a content base on its id
//PATCH /contents/:id

//User
// wallet -required -string
// title - required - string
// twitter - required -string
// bio - string

//POST /users
// create a new user

//GET /users/:id
//get a user details
//PATCH /users/:id
//update a user

// Subscription

// subscriber User

// content Content

//POST /subscriptions
// create a subcribption document contentId and userId will be passed

// GET /users/:id/contents

// GET /user/:id/subscriptions
