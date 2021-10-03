let base64string = "TmVpbERpYW1vbmQ=";
  
// Create a buffer from the string
let bufferObj = Buffer.from(base64string, "base64");
  
// Encode the Buffer as a utf8 string
let decodedString = bufferObj.toString("utf8");
  
console.log("The decoded string:", decodedString);