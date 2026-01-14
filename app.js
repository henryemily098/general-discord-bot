require('dotenv').config();

const {
    Client,
    EmbedBuilder,
    Events,
    GatewayIntentBits,
    Partials
} = require('discord.js');

const client = new Client({
    intents: [
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.GuildInvites,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessagePolls,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildModeration,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.GuildScheduledEvents,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildWebhooks,
        GatewayIntentBits.Guilds,
        GatewayIntentBits.MessageContent
    ],
    partials: [
        Partials.Channel,
        Partials.GuildMember,
        Partials.GuildScheduledEvent,
        Partials.Message,
        Partials.Poll,
        Partials.PollAnswer,
        Partials.Reaction,
        Partials.SoundboardSound,
        Partials.ThreadMember,
        Partials.User
    ]
});

client.newUsers = {};

client.on(Events.ClientReady, (readyClient) => console.log(`[SERVER] ${readyClient.user.username} it's ready!`));
client.on(Events.GuildMemberAdd, async(member) => {
    if(member.user.bot) return;
    let channel = member.guild.channels.cache.get("708518759287095299");
    if(!channel || !channel.isTextBased()) return;
    
    if(client.newUsers[member.guild.id] && client.newUsers[member.guild.id].includes(member.user.id)) return;
    if(client.newUsers[member.guild.id]) client.newUsers[member.guild.id].push(member.user.id);
    else client.newUsers[member.guild.id] = [member.user.id];

    member.roles.add("767609668091510785").catch(console.log);
    member.roles.add("718747564756828193").catch(console.log);

    let embed = new EmbedBuilder()
        .setColor("Blue")
        .setAuthor({
            iconURL: member.guild.iconURL({ size: 1024 }),
            name: member.user.username,
            url: "https://discord.gg/AFwd5Q8"
        })
        .setTitle(`WELCOME TO THE ${member.guild.name}!`)
        .setThumbnail(member.user.displayAvatarURL({ size: 1024 }))
        .setDescription("Since you are new here, please read ⁠<#719038315357012050>, ⁠<#719038487214686278>, ⁠and <#741891605920743435>. After read all of them, verify yourself and **ENJOY YOUR STAY!**");
    try {
        await channel
            .send({
                content: `Welcome to the **${member.guild.name}**, <@${member.user.id}>!`,
                embeds: [embed]
            });
    } catch (error) {
        console.log(error);
    }
});
client.login(process.env.TOKEN);