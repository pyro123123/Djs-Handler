const { getFile,getDir } = require("./file")
const path = require("path");

const register = (client,cdir,edir) => {
  
  const dir = getDir(cdir)
  
  for(const file of dir ) {
    const getFiles = getFile(path.join(cdir,file))
    
    
    if(!getFiles) continue;
    
    const name = getFiles.name ?? file.split(".")[0];
    
    client.command.set(name,getFiles)
    console.log(`Register Command ${name}`)
  }
  
  const dirs = getDir(edir)
  
  for(const event of dirs) {
    const getEvent = getFile(path.join(edir,event))
    
    if(!getEvent) continue;
   
    const name = getEvent.name ?? event.split(".")[0];
    
    client.on(name, (...args) => {
      getEvent.execute(...args)
    })
    
    console.log(`Register Event ${name}`)
  }
  
}

module.export = { register }