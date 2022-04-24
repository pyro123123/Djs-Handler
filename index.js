const { Client,Collection } = require("discord.js")

const handler = class Handler {
 
  constructor({
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
    this.testGuild = testGuild || [];
    
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
    
  }
  
}

module.exports = handler