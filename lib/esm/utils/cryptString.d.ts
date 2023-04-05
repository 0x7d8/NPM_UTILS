/// <reference types="node" />
import * as crypto from "crypto";
import encryptStrOptions from "../types/encryptStrOptions";
import decryptStrOptions from "../types/decryptStrOptions";
import hashStrOptions from "../types/hashStrOptions";
export declare const encrypt: (options: encryptStrOptions) => string;
export declare const decrypt: (options: decryptStrOptions) => string;
export declare const hash: (options: hashStrOptions) => string | crypto.Hash;
