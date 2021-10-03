// let originalString = "Kal-El";

//let originalString = "LiveLongAndProsper";
  
let originalString = "FrootLoops";

// Create buffer object, specifying utf8 as encoding
let bufferObj = Buffer.from(originalString, "utf8");
  
// Encode the Buffer as a base64 string
let base64String = bufferObj.toString("base64");
  
console.log("The encoded base64 string is:", base64String);

console.log(new Date());