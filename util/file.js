const { readdirSync } = require("fs") 

const getDir = (path,ext = "js") => {
  
  const getFolder = readdirSync(path).filter(i => i.endsWith(ext))
  
  return getFolder;
  
}

const getFile = (path) => {
 
 const fileName = (path.includes("\\") ? path.split("\\") : path.split("/")).reverse()[0];
 
  const getFile = readdirSync(path).filter(i => {
     const noExt = i.split(".")[0]
     return noExt == fileName;
  })
  
  return getFile;
  
}