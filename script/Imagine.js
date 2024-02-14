module.exports.config = {
  name: "imagine",
  version: "1.0.0",
  role: 0,
  hasPrefix: false,
  credits: "TsantaBot",
  description: "generate image from polination.",
  usages: "poli [promt]",
  cooldowns: 20,
  
};

module.exports.run = async ({ api, event, args }) => {
  const axios = require('axios');
  const fs = require('fs-extra');
  try { 
  const { threadID, messageID } = event;
  const query = args.join(" ");
  const time = new Date();
  const timestamp = time.toISOString().replace(/[:.]/g, "-");
  const path = __dirname + '/cache/' + `${timestamp}_tid.png`;
  if (!query) return api.sendMessage("Simple Génération images \n\n ▪︎Ex: imagine Cute girl \n\n 🌐 bit.ly/tsantabot", threadID, messageID);
    api.sendMessage(`⏰ Attendez, Je vais imaginer 《${query}》`, event.threadID, event.messageID);
  const poli = (await axios.get(`https://image.pollinations.ai/prompt/${query}`, {
    responseType: "arraybuffer",
  })).data;
  fs.writeFileSync(path, Buffer.from(poli, "utf-8"));
    setTimeout(function() {
  api.sendMessage({
    body: "✅ Voici votre image",
    attachment: fs.createReadStream(path) }, threadID, () => fs.unlinkSync(path));
    }, 5000);
    } catch (error) {
      api.sendMessage(error.message, event.threadID, event.messageID);
    }
};
