const discord = require("discord.js");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const MODEL = "gemini-pro";
const API_KEY = process.env.API_KEY ?? "";
const BOT_TOKEN = process.env.BOT_TOKEN ?? "";
const CHANNEL_ID = process.env.CHANNEL_ID ?? "1204263074773598228";

const ai = new GoogleGenerativeAI(API_KEY);
const model = ai.getGenerativeModel({ model: MODEL });

const client = new discord.Client({
  intents: Object.keys(discord.GatewayIntentBits),
});

client.on("ready", () => {
  console.log("bot login!");
});

client.login(BOT_TOKEN);

client.on("messageCreate", async (message) => {
  try {
    if (message.author.bot) return; // 检查消息是否来自机器人
    if (message.channel.id !== CHANNEL_ID) return;

    const generatedContent = await model.generateContent(message.content);
    console.log("Generated content:", generatedContent);

    const text = generatedContent.response.text(); // 调用 text 函数以获取生成的文本内容
    console.log("Text:", text);

    const responseString = String(text);
    console.log("Response string:", responseString);

    await message.reply({
      content: responseString,
    });

  } catch (e) {
    console.error(e);
  }
});
