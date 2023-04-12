const CryptoJS = require("crypto-js")

var encrypted = CryptoJS.AES.encrypt("Rebuild_0901", "Pass123$");
console.log(encrypted.toString());

var decrypted = CryptoJS.AES.decrypt(encrypted, "Pass123$");
var plaintext = decrypted.toString(CryptoJS.enc.Utf8);


