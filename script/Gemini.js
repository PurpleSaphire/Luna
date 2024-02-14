const axios = require('axios');

module.exports.config = {
  name: 'gemini',
  version: '1.0.0',
  credits: '𝖥𝗋𝖺𝗇𝖼𝗂𝗌 𝖫𝗈𝗒𝖽 𝖱𝖺𝗏𝖺𝗅',
  aliases: ['gem'],
  description: '𝗚𝗘𝗠𝗜𝗡𝗜 𝗂𝗌 𝖺𝗇 𝖠𝗋𝗍𝗂𝖿𝗂𝖺𝗅 𝖨𝗇𝗍𝖾𝗅𝗅𝗂𝗀𝖾𝗇𝖼𝖾 Pro',
  usage: '[ 𝖯𝗋𝗈𝗆𝗉𝗍 | 𝖰𝗎𝖾𝗋𝗒 ]',
  role: 0
};

module.exports.run = async ({ api, event, args }) => {
  const query = args.join(" ");
  if (!query) {
    api.sendMessage(`ℹ️ Gemini Ai peut répondre à votre question.  \n\n ▪︎ Usage: Gemini + Questions \n▪︎Ex: Gemini Bonjour, tu es là ?\n\n ▪︎ bit.ly/tsantabot `, event.messageID, event.threadID);
    return;
  }

  api.sendMessage(`✍ | 𝗚𝗘𝗠𝗜𝗡𝗜 en train d'écrire ...`, event.threadID, () => null, event.messageID);

  try {
    const response = await axios.get(`https://lianeapi.onrender.com/@hercai/api/gemini?key=j86bwkwo-8hako-12C&query=${encodeURIComponent(query)}`);
    api.setMessageReaction("✅", event.messageID, (err) => {}, true);
    api.sendMessage(response.data.message, event.threadID, () => null, event.messageID);
  } catch (error) {
    console.error(error);
    api.setMessageReaction("❎", event.messageID, (err) => {}, true);
    api.sendMessage("🔴 | 𝖲𝗈𝗆𝖾𝗍𝗁𝗂𝗇𝗀 𝗐𝖾𝗇𝗍 𝗐𝗋𝗈𝗇𝗀 𝗍𝗈 𝗍𝗁𝖾 𝖠𝖯𝖨. 𝖯𝗅𝖾𝖺𝗌𝖾 𝗍𝗋𝗒 𝖺𝗀𝖺𝗂𝗇 𝗅𝖺𝗍𝖾𝗋. ", event.threadID);
  }
}; 
