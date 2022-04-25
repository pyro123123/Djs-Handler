const { readdirSync } = require("fs") 

const getDir = (path,ext = "js") => {
  
  const getFolder = readdirSync(path).filter(i => i.endsWith(ext))
  
  return getFolder;
  
}

const getFile = (path) => {
 
 const getFile = require(path).catch(() => {
   console.error("File on " + path + " doesnt exist")
 })
  
  
  return getFile || null;
  
}

module.export = { getDir , getFile }