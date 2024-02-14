const fs = require("fs");
const axios = require("axios");

module.exports = {
  config: {
    name: "pixart",
    aliases: ['pix'],
    author: "TsantaBot",
    version: "2.0",
    cooldown: 260,
    role: 0,
    hasPrefix:true,
    shortDescription: {
      en: ""
    },
    longDescription: {
      en: "generate an image pixart"
    },
    category: "image",
    guide: {
      en: "[prompt - model]"
    }
  },
  run: async function ({ api, event, args }) {
    let path = __dirname + "/cache/image.png";
    let prompt;
    let model = 1;

    if (args.length === 0) {
      return api.sendMessage("💡 Création images hautes qualités avec Pixart \n\n ▪︎ Code: pixart [prompt] - [model] \n▪︎ Ex: pixart Cat cyborg cyber punk - 2\n\n ☆NB: Afaka soloina chiffre 《1~9》 hafa ilay 《2》 raha hiova styles sy modèle hafa.. \n\n TsantaBot: https://bit.ly/tsantabot", event.threadID, event.messageID);
    }

    if (args.length > 1) {
      const tzt = args.join(" ").split("-").map(item => item.trim());
      prompt = tzt[0];
      model = tzt[1];
    } else {
      prompt = args[0];
    }

    let tid = event.threadID;
    let mid = event.messageID;

    try {
      api.sendMessage("⏳ | TsantaBot_pixart est en train d'imaginer votre texte... \n《Tuto: tapez Pixart》", tid, mid);

      let enctxt = encodeURIComponent(prompt);
      let url = `http://ger2-1.deploy.sbs:1792/pixart?prompt=${enctxt}&styles=${model}`;

      let response = await axios.get(url, { responseType: "stream" });

      response.data.pipe(fs.createWriteStream(path));

      response.data.on("end", () => {
        api.sendMessage({ attachment: fs.createReadStream(path) }, tid, () => fs.unlinkSync(path), mid);
      });
    } catch (e) {
      return api.sendMessage(e.message, tid, mid);
    }
  }
};
