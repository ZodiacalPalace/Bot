const { SlashCommandBuilder } = require("discord.js");
const axios = require('axios');
module.exports = {
  data: new SlashCommandBuilder()
    .setName("rp")
    .setDescription("Gives your Ranked Points!")
    .addStringOption((option) =>
      option
        .setName("player")
        .setDescription("The type of output.")
        .setRequired(true)
        .addChoices(
          { name: "B", value: "BlackGhost307" },
          { name: "S", value: "Strikercong" },
          { name: "T", value: "Trumbotron" },
          { name: "Z", value: "ZodiacalPalace" }
        )
    ),
    
  async execute(interaction) {
    const player = interaction.options.getString("player");
    const platform = "PC";
    if (player == "S") {
        platform = "X1";
    }
    // const fetch = require("node-fetch");
    let rp;
    const apiUrl = `https://api.mozambiquehe.re/bridge?auth=9b54417f91e111c106f62e34c6dac539&player=${player}&platform=${platform}`;
    try {
        const response = await axios.get(apiUrl);
        rp = response.data.global.rank.rankScore;
      } catch (error) {
        console.error(error);
      }
    // await fetch(`https://api.mozambiquehe.re/bridge?auth=9b54417f91e111c106f62e34c6dac539&player=${player}&platform=${platform}`)
    //   .then((response) => response.json())
    //   .then((data) => (rp = data.rank.rankScore))
    //   .catch((err) => console.error(err));
    const message = `Ranked points for ${player}: ${rp}`;
    await interaction.reply(message);
  },
};