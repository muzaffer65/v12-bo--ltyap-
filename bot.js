//code makare <3
//code makare <3
//code makare <3
//code makare <3
//code makare <3
//code makare <3
//code makare <3
//code makare <3
//code makare <3
//code makare <3
//code makare <3
//code makare <3
//code makare <3
//code makare <3
//code makare <3
//code makare <3
//code makare <3
//code makare <3
//code makare <3
//code makare <3
//code makare <3
//code makare <3
//code makare <3
//code makare <3
//code makare <3
//code makare <3
//code makare <3
//code makare <3
//code makare <3
//code makare <3
//code makare <3
//code makare <3
//code makare <3
//code makare <3
//code makare <3
//code makare <3
//code makare <3
//code makare <3
//code makare <3
//code makare <3

//----------------BAĞLAMALAR----------------// NOT: BU KISIMLARA ELLEME YOKSA ÇALIŞMAZ
const Discord = require('discord.js');
const fs = require('fs');
const http = require('http');
const db = require('quick.db');
const moment = require('moment')
const express = require('express');
const ayarlar = require('./ayarlar.json');
require("moment-duration-format")
const app = express();
app.get("/", (request, response) => {
response.sendStatus(200);
});
//----------------BAĞLAMALAR-SON-----------//
app.listen(process.env.PORT);


//--------------READY-JS------------------// NOT:Buarası Bot Açıklama Kısmı

const discord = require('discord.js');
const client = new Discord.Client();
client.on('ready', async () => {
   client.appInfo = await client.fetchApplication();
  setInterval( async () => {
    client.appInfo = await client.fetchApplication();
  }, 600);
  
 client.user.setActivity(`CodeMakare`, { type:'WATCHING' })
});


const log = message => {
  console.log(` ${message}`);
};
require('./util/eventLoader.js')(client);

//--------------READY-JS-SON------------------//

//--------------KOMUTLAR------------------//

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
    if (err) console.error(err);
    log(`${files.length} komut yüklenecek.`);
    files.forEach(f => {
        let props = require(`./komutlar/${f}`);
        log(`Yüklenen komut: ${props.help.name}.`);
        client.commands.set(props.help.name, props);
        props.conf.aliases.forEach(alias => {
            client.aliases.set(alias, props.help.name);
        });
    });
});




client.reload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
           reject(e);
        }
    });
};

client.load = command => {
    return new Promise((resolve, reject) => {
        try {
            let cmd = require(`./komutlar/${command}`);
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};




client.unload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

//--------------KOMUTLAR-SON------------------//

client.elevation = message => {
    if (!message.guild) {
        return;
    }
    let permlvl = 0;
    if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
    if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
    if (message.author.id === ayarlar.sahip) permlvl = 4;
    return permlvl;
};


//--------------TOKEN------------------//

client.login(process.env.token)

//--------------TOKEN-SON------------------//
