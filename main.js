require("dotenv").config()
const {Client, Collection, GatewayIntentBits} = require("discord.js")
const eventHandlers = require("./Handlers/eventHandlers")
const cmdHandlers = require("./Handlers/commandHandlers")
const db = require("mongoose")
const client = new Client({intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers
]})

// ! Database Connection
db.connect(process.env.DATABASE)

// ! Client Collection
client.commands = new Collection();

// ! Handlers
eventHandlers(client);
cmdHandlers(client);

module.exports = client;

client.login(process.env.DISCORD_TOKEN)