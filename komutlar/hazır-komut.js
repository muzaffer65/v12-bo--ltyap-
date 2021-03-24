const Discord = require('discord.js');

exports.run = async(client, message, args) => {

    if (["823477464880775229","823477468361916456"].some(a => !message.member.roles.cache.has(a)) && ["MANAGE_ROLES","ADMINISTRATOR"].some(perm => !message.member.hasPermission(perm))) return message.channel.send(new Discord.MessageEmbed()
.setColor("BLACK")
.setDescription(`Maalesef'ki bu komutu kullanabilcek düzeyde yetkiye sahip değilsin`)
.setAuthor(message.author.tag,message.author.avatarURL({ dynamic: true })))
};
  exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 3,
};

exports.help = {
  name: 'a'
};

//NOT BU KOMUT BİR GEREKSiZ KOMUT BU KOMUDU SİLİP İÇİNE BAŞKA KOMUT GİRMENİ TAVSİYE EDERİM