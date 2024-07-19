const { SlashCommandBuilder, PermissionFlagsBits, InteractionCollector, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const {colors, channels} = require("../../config.json")
let isEmbed, isButton;

module.exports = {
    data: new SlashCommandBuilder()
        .setName("tickets")
        .setDescription("Sent ticket system massage."),
        /**
         * 
         * @param {InteractionCollector} interaction 
         */
    async execute(interaction) {
        if (!interaction.member.permissions.has(PermissionFlagsBits.Administrator)) return await interaction.reply({ content: "Sorry, you don't have permission for this command!", ephemeral: true })

        const { guild } = interaction

        isEmbed = new EmbedBuilder()
            .setColor(colors.primary)
            .setTitle(`${guild.name} Ticket System`)
            .setDescription(`Kalian bisa menekan tombol dibawah untuk membuka tiket.`)
            .addFields(
                {
                    name: "` 💵 Donasi `",
                    value: "Tombol ini digunakan jikalau kalian ingin men-support kami dengan cara membeli sesuatu yang ada didalam ingame.",
                    inline: true
                },
                {
                    name: "` 🚫 Buka Banned `",
                    value: "Tombol ini digunakan apabila kalian tidak sengaja dibanned.",
                    inline: true
                },
            )
            .setTimestamp()

            isButton = new ActionRowBuilder().setComponents(
                new ButtonBuilder().setCustomId("donation").setLabel("Donasi").setStyle(ButtonStyle.Primary).setEmoji("💵"),
                new ButtonBuilder().setCustomId("banned").setLabel("Buka Banned").setStyle(ButtonStyle.Secondary).setEmoji("🚫"),
            )

            const sentMessage = guild.channels.cache.get(channels.tickets).send({
                embeds: [isEmbed],
                components: [isButton]
            })

            if (sentMessage) {
                await interaction.reply({ content: "Ticket message has been sent.", ephemeral: true })
            } else {
                await interaction.reply({ content: "🚫 Have a problem with this command!.", ephemeral: true })
            }
    },
};