import * as crypto from "crypto";
const encrypt = (options) => {
  const key = crypto.createHash("sha256").update(String(options.key)).digest("base64").substring(0, 32);
  const iv = Buffer.alloc(16, 0);
  const enCipher = crypto.createCipheriv(options.algorithm, key, iv);
  let encryptedData = enCipher.update(options.text);
  encryptedData = Buffer.concat([encryptedData, enCipher.final()]);
  return encryptedData.toString(options.output);
};
const decrypt = (options) => {
  const key = crypto.createHash("sha256").update(String(options.key)).digest("base64").substring(0, 32);
  const iv = Buffer.alloc(16, 0);
  const deCipher = crypto.createDecipheriv(options.algorithm, key, iv);
  let decryptedData = deCipher.update(Buffer.from(options.text, "hex"));
  decryptedData = Buffer.concat([decryptedData, deCipher.final()]);
  return decryptedData.toString(options.output);
};
const hash = (options) => {
  let hash2;
  if (options.output === "bytes")
    hash2 = crypto.createHash(options.algorithm).update(String(options.text));
  else
    hash2 = crypto.createHash(options.algorithm).update(String(options.text)).digest(options.output);
  return hash2;
};
export {
  decrypt,
  encrypt,
  hash
};
