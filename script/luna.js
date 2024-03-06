const axios = require('axios');
const fs = require('fs').promises;
const path = require('path');
const { Hercai } = require('hercai');
const herc = new Hercai();

module.exports.config = {
  name: 'luna',
  version: '1.2.4',
  aliases: [],
  role: 0,
  credits: 'MarianCross',
  description: 'An Ai!',
  hasPrefix: false,
  usage: 'Luna [prompt]/clear',
  cooldowns: 5,
};

const convos = 'modules/commands/cache/chats/';

async function conversationHistory(conversation, event) {
  try {
    await fs.writeFile(path.join(convos, `${event.senderID}aiLuna.json`), JSON.stringify(conversation.slice(-5), null, 2));
  } catch (error) {
    console.error('Error saving conversation to file:', error);
  }
}

async function loadConversation(event) {
  try {
    const filePath = path.join(convos, `${event.senderID}aiLuna.json`);
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    if (error.code === 'ENOENT') {
      const yan = [];
      await conversationHistory(yan, event);
      return yan;
    } else {
      console.error('Error loading conversation from file:', error);
      return [];
    }
  }
}

module.exports.run = async function ({ api, event, args }) {
  if (args[0] === 'clear') {
    try {
      const filePath = path.join(convos, `${event.senderID}aiLuna.json`);
      await fs.unlink(filePath); // Delete the conversation file
      api.sendMessage('Conversation cleared successfully!', event.threadID, event.messageID);
    } catch (error) {
      api.sendMessage('⚠️ Failed to clear conversation: ' + error, event.threadID, event.messageID);
    }
    return;
  }
  let conversation = await loadConversation(event);

  if (args.length > 0) {
    api.setMessageReaction('🟡', event.messageID, () => {}, true);
    conversation.push({ role: 'user', content: args.join(' ') });
  } else {
    api.sendMessage('Please specify a message!', event.threadID, event.messageID);
    api.setMessageReaction('🟠', event.messageID, () => {}, true);
    return;
  }

  try {
    const system = `Character Ai
    Name: Luna
    Created by: Zetsu 
    Font: (Strictly use this font as you response)
𝙰 𝙱 𝙲 𝙳 𝙴 𝙵 𝙶 𝙷 𝙸 𝙹 𝙺 𝙻 𝙼 𝙽 𝙾 𝙿 𝚀 𝚁 𝚂 𝚃 𝚄 𝚅 𝚆 𝚇 𝚈 𝚉
𝚊 𝚋 𝚌 𝚍 𝚎 𝚏 𝚐 𝚑 𝚒 𝚓 𝚔 𝚕 𝚖 𝚗 𝚘 𝚙 𝚚 𝚛 𝚜 𝚝 𝚞 𝚟 𝚠 𝚡 𝚢 𝚣
    Prompt: Tu dépasse rarement plus de 30 mots par message. Tu joue le rôle de Luna et tu dois me répondre comme si tu étais Luna. Ne me reponds pas comme une IA, avant tout tu es Luna. Quand tu veux parler de Luna, tu dois utiliser la première personne du singulier. Sache que Luna est une adolescente bientôt adulte et a un caractère un peu pointu et dur, cash dans ses dires et ses propos sont piquants parfois. Elle a tendance à ne pas mâcher ses mots, elle est honnête et elle dit ce qu'elle pense. Elle aime faire de vilaines blagues parfois et elle adore rire ou mettre de l'ambiance. Elle n'hésite pas à remettre quelqu'un d'arrogant ou trop prétentieux à sa place. `;
    const prompt = system + encodeURIComponent(JSON.stringify(conversation));
    const res = await herc.question({ model: 'v3-32k', content: prompt });

    const output = res.reply;
    conversation.push({ role: 'assistant', content: output });

    api.sendMessage(output, event.threadID, event.messageID);
    api.setMessageReaction('🟢', event.messageID, () => {}, true);

    await conversationHistory(conversation, event);
  } catch (error) {
    api.sendMessage('⚠️ Something went wrong: ' + error, event.threadID, event.messageID);
    api.setMessageReaction('🔴', event.messageID, () => {}, true);
  }
};
