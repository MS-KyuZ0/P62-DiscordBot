const { Events, Client } = require("discord.js");
const { roles } = require("../../config.json")

module.exports = {
    name: Events.GuildMemberAdd,
    async execute(client, member) {
        if (!member) return

        const userHasRole = member.roles.cache.has(roles.member)

        if (!userHasRole) {
            member.roles.add(roles.member)
        }else{
            return
        }
    }
}