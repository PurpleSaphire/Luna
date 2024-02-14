// handleAcceptFriend.js

"use strict";

// Import required modules
const utils = require("../fb-chat-api/utils");
const log = require("npmlog");

// Configuration object for the acceptFriend command
const acceptFriendConfig = {
  name: 'acceptfriend',
  version: '1.0.0',
  role: 0, // Define the required role level to execute the command
  hasPrefix: true, // Specify if the command requires a prefix
  description: "Accept or reject friend requests.",
  usage: "acceptfriend [userID] [accept|reject]", // Usage guide for the command
  credits: 'YourAutobotCreator', // Credits for the command creator
};

// Main function for handling acceptFriend command
async function acceptFriendFunction({ defaultFuncs, api, ctx, args }) {
  // Extract arguments
  const userID = args[0];
  const accept = args[1] === 'accept'; // Convert 'accept' string to boolean
  try {
    // Validate arguments
    if (!userID || (accept !== true && accept !== false)) {
      throw new Error("Invalid arguments. Usage: acceptfriend [userID] [accept|reject]");
    }

    // Perform action based on the accept parameter
    const action = accept ? 'confirm' : 'reject';

    // Send POST request to accept or reject friend request
    const form = {
      viewer_id: ctx.userID,
      "frefs[0]": "jwl",
      floc: "friend_center_requests",
      ref: "/reqs.php",
      action: action
    };

    const resData = await defaultFuncs.post(
      "https://www.facebook.com/requests/friends/ajax/",
      ctx.jar,
      form
    );

    // Check if there's any error in response data
    if (resData.payload.err) {
      throw new Error(resData.payload.err);
    }

    // Send success message
    const message = `Friend request from userID ${userID} ${accept ? 'accepted' : 'rejected'}`;
    api.sendMessage(message, ctx.threadID);

  } catch (error) {
    // Handle errors
    log.error("acceptFriendFunction", error);
    api.sendMessage(`Error: ${error.message}`, ctx.threadID);
  }
}

// Export configuration object and main function
module.exports = {
  config: acceptFriendConfig,
  run: acceptFriendFunction
};
