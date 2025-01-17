const axios = require("axios");
const fs = require('fs');

module.exports.config = {
  name: "spotify",
  version: "69",
  aliases: ["spoty"],
  role: 0,
  credits: "Kshitiz",
  description: "play song from spotify",
  usage: "Spotify <title>",
  hasPrefix: false,
  cooldowns: 0
};

module.exports.run = async function({ api, event, args, message }) {
  const { threadID, messageID } = event; // Destructuring threadID and messageID from event
  const songName = args.join(" ");
  if (!songName) {
    return api.sendMessage("Please provide a song name.", threadID);
  }

  const loadingMessage = await api.sendMessage("downloading your song🕐..", threadID);

  try {
    const spotifyResponse = await axios.get(`https://spotify-Kshitiz.onrender.com/spotify?query=${encodeURIComponent(songName)}`);
    const trackURLs = spotifyResponse.data.trackURLs;
    if (!trackURLs || trackURLs.length === 0) {
      throw new Error("No track found for the provided song name.");
    }

    const trackURL = trackURLs[0];
    const KshitizDownloadResponse = await axios.get(`https://spdl-Kshitiz.onrender.com/spotify?id=${encodeURIComponent(trackURL)}`);
    const KshitizDownloadLink = KshitizDownloadResponse.data.download_link;

    const KshitizFilePath = await downloadTrack(KshitizDownloadLink);

    console.log("File downloaded successfully:", KshitizFilePath);

    await api.sendMessage({
      body: `🎧 Playing: ${songName}`,
      attachment: fs.createReadStream(KshitizFilePath)
    }, threadID); // Pass the threadID here

    console.log("Audio sent successfully.");

  } catch (error) {
    console.error("Error occurred:", error);
    api.sendMessage(`An error occurred: ${error.message}`, threadID); // Use api.sendMessage instead of message.reply
  } finally {
    api.unsendMessage(loadingMessage.messageID); // Use api.unsendMessage instead of message.unsend
  }
};

async function downloadTrack(url) {
  const response = await axios({
    url,
    method: 'GET',
    responseType: 'stream'
  });

  const KshitizFilePath = `${__dirname}/cache/${Date.now()}.mp3`;
  const writer = fs.createWriteStream(KshitizFilePath);
  response.data.pipe(writer);

  return new Promise((resolve, reject) => {
    writer.on('finish', () => resolve(KshitizFilePath));
    writer.on('error', reject);
  });
}
