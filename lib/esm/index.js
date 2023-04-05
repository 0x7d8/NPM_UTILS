import * as path from "path";
import * as fs from "fs";
import randomStrOptions from "./types/randomStrOptions";
import encryptStrOptions from "./types/encryptStrOptions";
import decryptStrOptions from "./types/decryptStrOptions";
import hashStrOptions from "./types/hashStrOptions";
import * as randomString from "./utils/randomString";
import * as cryptString from "./utils/cryptString";
import { version } from "./pckg.json";
const Version = version;
function loadEnv(file, isAsync) {
  if (typeof file !== "string")
    throw new TypeError("filePath must be a string");
  file = path.resolve(file);
  const parseContent = (content) => {
    let returns = {};
    for (const line of content.split("\n")) {
      const keys = line.split(/(?:^|^)\s*(?:export\s+)?([\w.-]+)(?:\s*=\s*?|:\s+?)(\s*'(?:\\'|[^'])*'|\s*"(?:\\"|[^"])*"|\s*`(?:\\`|[^`])*`|[^#\r\n]+)?\s*(?:#.*)?(?:$|$)/mg);
      returns[keys[1]] = keys[2];
    }
    return returns;
  };
  if (isAsync)
    return new Promise(async (resolve, reject) => {
      try {
        const content = await fs.promises.readFile(file, "utf8");
        return resolve(parseContent(content));
      } catch (err) {
        return reject(err);
      }
    });
  else
    return parseContent(fs.readFileSync(file, "utf8"));
}
function randomNum(min, max, dec) {
  if (typeof min !== "number")
    throw new TypeError("minimum must be a number");
  if (typeof max !== "number")
    throw new TypeError("maximum must be a number");
  dec = dec != null ? dec : 0;
  const random = Math.random() * (max - min + 1) + min;
  const number = Math.floor(random * 10 ** dec) / 10 ** dec;
  return number;
}
function randomBol() {
  const boolean = Math.floor(Math.random() * (2 - 1 + 1)) + 1;
  return boolean === 1;
}
function randomStr(options = {}) {
  var _a, _b, _c, _d, _e, _f;
  if (typeof options !== "object")
    throw new TypeError("options must be an object");
  const length = (_a = options.length) != null ? _a : 12;
  const numbers = (_b = options.numbers) != null ? _b : true;
  const symbols = (_c = options.symbols) != null ? _c : false;
  const uppercase = (_d = options.uppercase) != null ? _d : true;
  const lowercase = (_e = options.lowercase) != null ? _e : true;
  const exclude = (_f = options.exclude) != null ? _f : "";
  const string = randomString.password({
    length,
    numbers,
    symbols,
    uppercase,
    lowercase,
    exclude
  });
  return string;
}
class Spinner {
  /** Create a Spinner */
  constructor(states) {
    this.state = 0;
    this.states = states != null ? states : [
      "/",
      "-",
      "\\",
      "|"
    ];
  }
  /** Get the Current State */
  get() {
    if (this.state >= this.states.length)
      this.state = 0;
    return this.states[this.state++];
  }
}
function encryptStr(options = { text: "" }) {
  var _a, _b, _c, _d;
  if (typeof options !== "object")
    throw new TypeError("options must be an object");
  const text = (_a = options.text) != null ? _a : "Javascript Moment";
  const algorithm = (_b = options.algorithm) != null ? _b : "aes-256-cbc";
  const output = (_c = options.output) != null ? _c : "hex";
  const key = (_d = options.key) != null ? _d : "123unsafe";
  const data = cryptString.encrypt({
    text,
    algorithm,
    output,
    key
  });
  return data;
}
function decryptStr(options = { text: "" }) {
  var _a, _b, _c, _d;
  if (typeof options !== "object")
    throw new TypeError("options must be an object");
  const text = (_a = options.text) != null ? _a : "Javascript Moment";
  const algorithm = (_b = options.algorithm) != null ? _b : "aes-256-cbc";
  const output = (_c = options.output) != null ? _c : "utf8";
  const key = (_d = options.key) != null ? _d : "123unsafe";
  const data = cryptString.decrypt({
    text,
    algorithm,
    output,
    key
  });
  return data;
}
function hashStr(options = { text: "" }) {
  var _a, _b, _c;
  if (typeof options !== "object")
    throw new TypeError("options must be an object");
  const text = (_a = options.text) != null ? _a : "Javascript Moment";
  const algorithm = (_b = options.algorithm) != null ? _b : "sha256";
  const output = (_c = options.output) != null ? _c : "hex";
  const data = cryptString.hash({
    text,
    algorithm,
    output
  });
  return data;
}
export {
  Spinner,
  Version,
  decryptStr,
  decryptStrOptions,
  encryptStr,
  encryptStrOptions,
  hashStr,
  hashStrOptions,
  loadEnv,
  randomBol,
  randomNum,
  randomStr,
  randomStrOptions
};
