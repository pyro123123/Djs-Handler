const { Client,Collection } = require("discord.js")

const { register } = require("./util/register")

const handler = class Handler {
 
  constructor({
    token,
    cmdDir,
    eventDir,
    prefix,
    client,
    testGuild
  }) {
    this.client = client || null
    this.cmdDir = cmdDir || ""
    this.eventDir = eventDir || ""
    this.prefix = prefix || "!"
    this.testGuild = testGuild || []
    this.token = token || ""
    
    this.setup();
  }
  
  setup() {
   
    if(!this.client || !(this.client instanceof Client)) {
       throw new Error("Client must be instanceof Discord.js Client")
    }
   
   if (this.token === "") {
     throw new Error("Require discord bot token to login");
   }
   
   this.client.login(this.token).then(() => {
     register(this.client, this.cmdDir, this.eventDir);
   })
   
    this.client.command = new Collection();
    
    this.client.on("messageCreate",(msg) => {
     
      const { author,channel,content,guild } = msg
     
      if(author.bot || !content.startsWith(this.prefix.length)) {
        return;
      }
      
      const argument = content.trim().split(" ")
      const cmdName = argument.shift().slice(this.prefix.length)
      
      const cmd = this.client.command.get(cmdName);
      
      if(!cmd) return;
      
      if(cmd.test && !this.testGuild.includes(guild.id)) return channel.send({
        content: "This command can be use in specific guild only"
      })
      
      cmd.run(msg,argument)
      
      
    })
    
  }
  
}

module.exports = handler