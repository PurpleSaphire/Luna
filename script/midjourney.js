const axios = require("axios");
const fs = require("fs");

module.exports.config = {
  name: "midjourney",
  version: "1.3",
  role: 0,
  credits: "Hazeyy",
  description: "( 𝙼𝚒𝚍𝚓𝚘𝚞𝚛𝚗𝚎𝚢 𝚟4 )",
  hasPrefix: false,
  usage: "( 𝙼𝚘𝚍𝚎𝚕 - 𝙼𝚒𝚍𝚓𝚘𝚞𝚛𝚗𝚎𝚢 𝚟4 )",
  cooldowns: 3,
};

module.exports.handleEvent = async function ({ api, event }) {
  if (!(event.body.toLowerCase().startsWith("midjourney"))) return;
  const args = event.body.split(/\s+/);
  args.shift();

  const prompt = args.join(" ");

  api.setMessageReaction("📸", event.messageID, (err) => {}, true);

  if (!prompt) {
    api.sendMessage("🤖 𝙷𝚎𝚕𝚕𝚘 𝚝𝚘 𝚞𝚜𝚎 𝙾𝚙𝚎𝚗𝚓𝚘𝚞𝚛𝚗𝚎𝚢\n\n𝙿𝚕𝚎𝚊𝚜𝚎 𝚞𝚜𝚎: 𝙼𝚒𝚓𝚘𝚞𝚛𝚗𝚎𝚢 [ 𝚙𝚛𝚘𝚖𝚙𝚝 ]", event.threadID, event.messageID);
    return;
  }

  api.sendMessage("🕟 | 𝙼𝚒𝚍𝚓𝚘𝚞𝚛𝚗𝚎𝚢 𝙶𝚎𝚗𝚎𝚛𝚊𝚝𝚒𝚗𝚐 𝙿𝚛𝚘𝚖𝚙𝚝, 𝙿𝚕𝚎𝚊𝚜𝚎 𝚠𝚊𝚒𝚝...", event.threadID, event.messageID);

  try {
    const response = await axios.get('https://code-mage.replit.app/openjourney/v4', {
      params: {
        prompt: prompt,  
      },
    });

    console.log('🤖 𝙼𝚒𝚍𝚓𝚘𝚞𝚛𝚗𝚎𝚢 𝚁𝚎𝚜𝚙𝚘𝚗𝚜𝚎:', response.data[0]);

    if (response.data[0]) {
      const imageData = response.data[0];

      const image = await axios.get(imageData, { responseType: "stream" });
      const path = __dirname + "/cache/" + Math.floor(Math.random() * 999999) + ".jpg";

      const writeStream = fs.createWriteStream(path);
      image.data.pipe(writeStream);

      writeStream.on('finish', () => {
        const promptMessage = `🤖 𝐌𝐢𝐝𝐣𝐨𝐮𝐫𝐧𝐞𝐲 𝐯4 ( 𝐀𝐈 )\n\n🖋️ 𝙰𝚜𝚔: '${prompt}'\n\n✨ 𝙿𝚛𝚘𝚖𝚙𝚝 𝙶𝚎𝚗𝚎𝚛𝚊𝚝𝚎𝚍:`;

        api.sendMessage({ body: promptMessage, attachment: fs.createReadStream(path) }, event.threadID, () => {
          fs.unlinkSync(path);
        });
      });
    } else {
      api.sendMessage('🚫 𝙰𝚗 𝚎𝚛𝚛𝚘𝚛 𝚘𝚌𝚌𝚞𝚛𝚎𝚍 𝚍𝚞𝚛𝚒𝚗𝚐 𝚝𝚑𝚎 𝙼𝚒𝚍𝚓𝚘𝚞𝚛𝚗𝚎𝚢 𝚙𝚛𝚘𝚌𝚎𝚜𝚜.', event.threadID);
    }
  } catch (error) {
    console.error('🚫 𝙴𝚛𝚛𝚘𝚛:', error);
    api.sendMessage('🚫 𝙰𝚗 𝚎𝚛𝚛𝚘𝚛 𝚘𝚌𝚌𝚞𝚛𝚎𝚍 𝚠𝚑𝚒𝚕𝚎 𝚐𝚎𝚗𝚎𝚛𝚊𝚝𝚒𝚗𝚐 𝚝𝚑𝚎 𝚒𝚖𝚊𝚐𝚎.', event.threadID);
  }
};

module.exports.run = async function ({ api, event }) {}; 
