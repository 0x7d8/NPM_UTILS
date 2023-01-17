/// <reference types="node" />
import { Hash } from "crypto";
import randomStrOptions from "./interfaces/randomStrOptions";
import encryptStrOptions from "./interfaces/encryptStrOptions";
import decryptStrOptions from "./interfaces/decryptStrOptions";
import hashStrOptions from "./interfaces/hashStrOptions";
declare const _default: {
    /** Load an Env File to JSON */
    loadEnv(filePath: string): {
        [key: string]: string;
    };
    /** Generate a Random Number */
    randomNum(min: number, max: number, dec?: number): number;
    /** Generate a Random Boolean */
    randomBol(): boolean;
    /** Generate a Random String */
    randomStr(options: randomStrOptions): string;
    /** Generate a Text Spinner */
    spinner: {
        new (states?: string[]): {
            states: string[];
            state: number;
            /** Get the Current State */
            get(): string;
        };
    };
    /** Encrypt a String */
    encryptStr(options: encryptStrOptions): string;
    /** Decrypt a String */
    decryptStr(options: decryptStrOptions): string;
    /** Hash a String */
    hashStr(options: hashStrOptions): string | Hash;
};
export = _default;
