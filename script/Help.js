// help.js

const helpConfig = {
  name: 'help',
  version: '1.0.0',
  role: 0,
  hasPrefix: true,
  aliases: ['info','aide'],
  description: "GUIDE",
  usage: "Help [page] ou [command]",
  credits: 'TsantaBot',
};

async function helpFunction({ api, event, enableCommands, args, Utils, prefix }) {
  const input = args.join(' ');
  try {
    const eventCommands = enableCommands[1].handleEvent;
    const commands = enableCommands[0].commands;
    if (!input) {
      const pages = 20;
      let page = 1;
      let start = (page - 1) * pages;
      let end = start + pages;
      let helpMessage = `📄 | 𝗟𝗜𝗦𝗧𝗘 𝗗𝗘𝗦 𝗖𝗢𝗠𝗠𝗔𝗡𝗗𝗘𝗦 : \n\n `;
      for (let i = start; i < Math.min(end, commands.length); i++) {
        helpMessage += `\t${i + 1}. ✘ ${commands[i]} 
`;
      }
      helpMessage += `
☁️ 𝗖𝗿𝗲𝗮𝘁𝗼𝗿 𝗔𝗰𝗰𝗼𝘂𝗻𝘁 : https://www.facebook.com/zetsu.sama.355

`;
      eventCommands.forEach((eventCommand, index) => {
        helpMessage += `\t${index + 1}. ➤ ${prefix}${eventCommand} 
`;
      });
      helpMessage += `
📄 𝗣𝗮𝗴𝗲 [${page}/${Math.ceil(commands.length / pages)}] \n
 ⏭ Pour voir la 𝗽𝗮𝗴𝗲 𝘀𝘂𝗶𝘃𝗮𝗻𝘁𝗲, tapez ${prefix}𝗵𝗲𝗹𝗽 [𝗻𝘂𝗺𝗲𝗿𝗼 𝗱𝗲 𝗹𝗮 𝗽𝗮𝗴𝗲] \n- Ex: 𝗵𝗲𝗹𝗽𝟮 \n\n 
 💡 Pour voir 𝗹𝗲𝘀 𝗶𝗻𝗳𝗼𝗿𝗺𝗮𝘁𝗶𝗼𝗻𝘀 d'une commande spécifique, tapez '${prefix}𝗵𝗲𝗹𝗽 [𝗻𝗼𝗺 𝗱𝗲 𝗹𝗮 𝗰𝗼𝗺𝗺𝗮𝗻𝗱𝗲]' \n - Ex: 𝗵𝗲𝗹𝗽 𝗮𝗶 \n\n 
 🗂 Pour voir 𝗰𝗼𝗺𝗺𝗲𝗻𝘁 𝘂𝘁𝗶𝗹𝗶𝘀𝗲𝗿 𝘂𝗻𝗲 𝗰𝗼𝗺𝗺𝗮𝗻𝗱𝗲, écrivez simplement 𝗹𝗲 𝗻𝗼𝗺 𝗱𝗲 𝗹𝗮 𝗰𝗼𝗺𝗺𝗮𝗻𝗱𝗲.\n - Ex: 𝗔𝗶\n\n 🤖 𝗣𝗼𝘂𝗿 𝗮𝘃𝗼𝗶𝗿 𝘃𝗼𝘁𝗿𝗲 𝗽𝗿𝗼𝗽𝗿𝗲 𝗖𝗵𝗮𝘁𝗯𝗼𝘁, 𝗖𝗼𝗻𝘀𝘂𝗹𝘁𝗲𝘇 𝗹𝗲 𝘀𝗶𝘁𝗲 𝘀𝘂𝗶𝘃𝗮𝗻𝘁 : https://dizaybot.onrender.com 
`;
      api.sendMessage(helpMessage, event.threadID, event.messageID);
    } else if (!isNaN(input)) {
      const page = parseInt(input);
      const pages = 20;
      let start = (page - 1) * pages;
      let end = start + pages;
      let helpMessage = `𝗟𝗜𝗦𝗧𝗘 𝗗𝗘𝗦 𝗖𝗢𝗠𝗠𝗔𝗡𝗗𝗘𝗦 :

`;
      for (let i = start; i < Math.min(end, commands.length); i++) {
        helpMessage += `\t${i + 1}. ✘ ${commands[i]} 
`;
      }
      helpMessage += `
⏭ Pour voir la 𝗽𝗮𝗴𝗲 𝘀𝘂𝗶𝘃𝗮𝗻𝘁𝗲, tapez ${prefix}𝗵𝗲𝗹𝗽 [𝗻𝘂𝗺𝗲𝗿𝗼 𝗱𝗲 𝗹𝗮 𝗽𝗮𝗴𝗲] \n- Ex: 𝗵𝗲𝗹𝗽𝟮 \n\n 
 💡 Pour voir 𝗹𝗲𝘀 𝗶𝗻𝗳𝗼𝗿𝗺𝗮𝘁𝗶𝗼𝗻𝘀 d'une commande spécifique, tapez '${prefix}𝗵𝗲𝗹𝗽 [𝗻𝗼𝗺 𝗱𝗲 𝗹𝗮 𝗰𝗼𝗺𝗺𝗮𝗻𝗱𝗲]' \n - Ex: 𝗵𝗲𝗹𝗽 𝗮𝗶 \n\n 
 🗂 Pour voir 𝗰𝗼𝗺𝗺𝗲𝗻𝘁 𝘂𝘁𝗶𝗹𝗶𝘀𝗲𝗿 𝘂𝗻𝗲 𝗰𝗼𝗺𝗺𝗮𝗻𝗱𝗲, écrivez simplement 𝗹𝗲 𝗻𝗼𝗺 𝗱𝗲 𝗹𝗮 𝗰𝗼𝗺𝗺𝗮𝗻𝗱𝗲.\n - Ex: 𝗔𝗶\n\n 🤖 𝗣𝗼𝘂𝗿 𝗮𝘃𝗼𝗶𝗿 𝘃𝗼𝘁𝗿𝗲 𝗽𝗿𝗼𝗽𝗿𝗲 𝗖𝗵𝗮𝘁𝗯𝗼𝘁, 𝗖𝗼𝗻𝘀𝘂𝗹𝘁𝗲𝘇 𝗹𝗲 𝘀𝗶𝘁𝗲 𝘀𝘂𝗶𝘃𝗮𝗻𝘁 : https://dizaybot.onrender.com 

`;
      eventCommands.forEach((eventCommand, index) => {
        helpMessage += `\t${index + 1}. ➤ ${eventCommand} 
`;
      });
      helpMessage += `
▪︎Page ${page} / ${Math.ceil(commands.length / pages)}`;
      api.sendMessage(helpMessage, event.threadID, event.messageID);
    } else {
      const command = [...Utils.handleEvent, ...Utils.commands].find(([key]) => key.includes(input?.toLowerCase()))?.[1];
      if (command) {
        const {
          name,
          version,
          role,
          aliases = [],
          description,
          usage,
          credits,
          cooldown,
          hasPrefix
        } = command;
        const roleMessage = role !== undefined ? (role === 0 ? '➛ Permission: user' : (role === 1 ? '➛ Permission: admin' : (role === 2 ? '➛ Permission: thread Admin' : (role === 3 ? '➛ Permission: super Admin' : '')))) : '';
        const aliasesMessage = aliases.length ? `➛ Aliases: ${aliases.join(', ')}
` : '';
        const descriptionMessage = description ? `Description: ${description}
` : '';
        const usageMessage = usage ? `➛ Usage: ${usage}
` : '';
        const creditsMessage = credits ? `➛ Credits: ${credits}
` : '';
        const versionMessage = version ? `➛ Version: ${version}
` : '';
        const cooldownMessage = cooldown ? `➛ Cooldown: ${cooldown} second(s)
` : '';
        const message = ` 「 Command 」

➛ Name: ${name}
${versionMessage}${roleMessage}
${aliasesMessage}${descriptionMessage}${usageMessage}${creditsMessage}${cooldownMessage}`;
        api.sendMessage(message, event.threadID, event.messageID);
      } else {
        api.sendMessage('🤔 | 𝗖𝗼𝗺𝗺𝗮𝗻𝗱𝗲 𝗜𝗻𝘁𝗿𝗼𝘂𝘃𝗮𝗯𝗹𝗲 !', event.threadID, event.messageID);
      }
    }
  } catch (error) {
    console.log(error);
  }
}

async function handleEventFunction({ api, event, prefix }) {
  const {
    threadID,
    messageID,
    body
  } = event;
  const message = prefix ? '☁️ 𝗠𝗼𝗻 𝗣𝗿𝗲𝗳𝗶𝘅 𝗲𝘀𝘁 : ' + prefix : "𝗝'𝗮𝗶 𝗽𝗮𝘀 𝗱𝗲 𝗣𝗿𝗲𝗳𝗶𝘅";
  if (body?.toLowerCase().startsWith('prefix')) {
    api.sendMessage(message, threadID, messageID);
  }
}

module.exports = {
  config: helpConfig,
  run: helpFunction,
  handleEvent: handleEventFunction
};
