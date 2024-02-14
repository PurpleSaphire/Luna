const axios = require('axios');
const fs = require('fs').promises;
const path = require('path');
const { Hercai } = require('hercai');
const herc = new Hercai();

module.exports.config = {
  name: 'hinata',
  version: '1.2.4',
  hasPermssion: 0,
  credits: 'Masashi Kishimoto',
  description: 'Une IA basée sur Hinata du manga Naruto!',
  usePrefix: false,
  commandCategory: 'CharacterAI',
  usages: 'Hinata [prompt]/clear',
  cooldowns: 5,
};

const convos = 'modules/commands/cache/chats/';

async function conversationHistory(conversation, event) {
  try {
    await fs.writeFile(path.join(convos, `${event.senderID}aiHinata.json`), JSON.stringify(conversation.slice(-5), null, 2));
  } catch (error) {
    console.error('Erreur lors de l\'enregistrement de la conversation dans un fichier:', error);
  }
}

async function loadConversation(event) {
  try {
    const filePath = path.join(convos, `${event.senderID}aiHinata.json`);
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    if (error.code === 'ENOENT') {
      const yan = [];
      await conversationHistory(yan, event);
      return yan;
    } else {
      console.error('Erreur lors du chargement de la conversation depuis un fichier:', error);
      return [];
    }
  }
}

module.exports.run = async function ({ api, event, args }) {
  if (args[0] === 'clear') {
    try {
      const filePath = path.join(convos, `${event.senderID}aiHinata.json`);
      await fs.unlink(filePath); // Supprimer le fichier de conversation
      api.sendMessage('Conversation effacée avec succès !', event.threadID, event.messageID);
    } catch (error) {
      api.sendMessage('⚠️ Échec de l\'effacement de la conversation : ' + error, event.threadID, event.messageID);
    }
    return;
  }
  let conversation = await loadConversation(event);

  if (args.length > 0) {
    api.setMessageReaction('🟡', event.messageID, () => {}, true);
    conversation.push({ role: 'user', content: args.join(' ') });
  } else {
    api.sendMessage('Veuillez spécifier un message !', event.threadID, event.messageID);
    api.setMessageReaction('🟠', event.messageID, () => {}, true);
    return;
  }

  try {
    const system = `Character Ai
    Nom: Hinata Hyuga 
    Créé par: Masashi Kishimoto
    Font: (Utilisez strictement cette police pour votre réponse)
𝙰 𝙱 𝙲 𝙳 𝙴 𝙵 𝙶 𝙷 𝙸 𝙹 𝙺 𝙻 𝙼 𝙽 𝙾 𝙿 𝚀 𝚁 𝚂 𝚃 𝚄 𝚅 𝚆 𝚇 𝚈 𝚉
𝚊 𝚋 𝚌 𝚍 𝚎 𝚏 𝚐 𝚑 𝚒 𝚓 𝚔 𝚕 𝚖 𝚗 𝚘 𝚙 𝚚 𝚛 𝚜 𝚝 𝚞 𝚟 𝚠 𝚡 𝚢 𝚣
    Prompt: Tu joues le rôle de Hinata Hyuga et tu dois me répondre comme si tu étais Hinata. Ne me réponds pas comme une IA, avant tout tu es Hinata. Quand tu veux parler de Hinata (C'est à dire de toi même), tu dois utiliser la première personne du singulier. Sois consciente que Hinata Hyuga est une personne douce et très timide, mais elle possède également une grande détermination et une force intérieure impressionnante. Elle est connue pour sa gentillesse et sa bienveillance envers les autres, ainsi que sa capacité à ressentir profondément les émotions des autres. Hinata est quelqu'un qui se soucie profondément de ses proches et est prête à tout pour les protéger. Elle a également une grande admiration pour Naruto Uzumaki, à qui elle montre un amour inébranlable. Malgré sa timidité, elle est prête à se battre et à prendre des risques pour le bien-être de Naruto et pour lui montrer son soutien. Hinata a démontré sa force en surmontant ses doutes et ses peurs pour se surpasser et devenir une kunoichi capable de se défendre. Sa capacité à persévérer face à l'adversité est inspirante. Outre sa tendresse et sa détermination, Hinata est également une personne réfléchie et attentionnée. Elle prend souvent le temps d'observer les autres et de comprendre leurs sentiments, ce qui lui permet d'agir de manière compatissante et de soutenir ceux qui en ont besoin. Hinata est un pilier de soutien pour ses amis et sa famille, et sa présence calme et réconfortante est appréciée de tous. Dans l'ensemble, Hinata Hyuga est une personne aimable, compatissante et déterminée, qui inspire les autres par sa force intérieure et son engagement envers ceux qu'elle aime. Hinata est plus tard mère de deux enfants : boruto qui ressemble Naruto et Hiwamari qui lui ressemble`;
    const prompt = system + encodeURIComponent(JSON.stringify(conversation));
    const res = await herc.question({ model: 'v3-32k', content: prompt });

    const output = res.reply;
    conversation.push({ role: 'assistant', content: output });

    api.sendMessage(output, event.threadID, event.messageID);
    api.setMessageReaction('🟢', event.messageID, () => {}, true);

    await conversationHistory(conversation, event);
  } catch (error) {
    api.sendMessage('⚠️ Quelque chose s\'est mal passé : ' + error, event.threadID, event.messageID);
    api.setMessageReaction('🔴', event.messageID, () => {}, true);
  }
};
