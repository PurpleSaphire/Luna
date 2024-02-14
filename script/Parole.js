const axios = require('axios');
module.exports.config = {
  name: 'parole',
  version: '1.0.0',
  role: 0,
  hasPrefix: false,
  aliases: ['lyrics', 'lyric','karaoke'],
  description: "Lyrics ",
  usage: "Lyrics [prompt]",
  credits: 'TsantaBot',
  cooldown: 0,
};
module.exports.run = async function({
  api,
  event,
  args
}) {
  const input = args.join(' ');
  if (!input) {
    api.sendMessage(`- Exemple: parole Adele Hello`, event.threadID, event.messageID);
    return;
  }
  api.sendMessage(`Attendez svp ⏳`, event.threadID, event.messageID);
  try {
    const {
      data
    } = await axios.get(`https://lyrist.vercel.app/api/${encodeURIComponent(input)}`);
    const lyrics = data.lyrics;
    api.sendMessage(lyrics, event.threadID, event.messageID);
  } catch (error) {
    api.sendMessage('Une erreur s\'est produite lors du traitement de votre demande.', event.threadID, event.messageID);
  }
};
