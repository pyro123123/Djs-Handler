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
   
    this.client.command = new Collection();
    
    this.client.on("messageCreate",(msg) => {
     
      const { author,channel,content} = msg
     
      if(author.bot || !content.startsWith(this.prefix.length)) {
        return;
      }
      
    })
    
    if(this.token === "") {
      throw new Error("Require discord bot token to login");
    }
    
    this.client.login(this.token).then(() => {
      register(this.client,this.cmdDir,this.eventDir);
    })
  }
  
}

module.exports = handler