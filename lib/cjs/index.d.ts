/// <reference types="node" />
import { Hash } from "crypto";
import randomStrOptions from "./types/randomStrOptions";
import encryptStrOptions from "./types/encryptStrOptions";
import decryptStrOptions from "./types/decryptStrOptions";
import hashStrOptions from "./types/hashStrOptions";
export declare const Version: string;
export { randomStrOptions, encryptStrOptions, decryptStrOptions, hashStrOptions };
/**
 * Load an Env File as Object
 * @since 1.0.0
*/ export declare function loadEnv<F, A extends boolean | undefined>(
/** The path to the Env file */ file: string, 
/** Whether to load the File Async */ isAsync: boolean): A extends true ? Promise<Record<string, string>> : Record<string, string>;
/**
 * Generate a Random Number
 * @since 1.0.0
*/ export declare function randomNum(
/** The Minimum Number */ min: number, 
/** The Maximum Number */ max: number, 
/**
 * The Decimal Places to Generate
 * @default 0
*/ dec?: number): number;
/**
 * Generate a Random Boolean
 * @since 1.0.1
*/ export declare function randomBol(): boolean;
/**
 * Generate a Random String
 * @since 1.0.0
*/ export declare function randomStr(options?: randomStrOptions): string;
/**
 * Generate a Text Spinner
 * @since 1.0.2
*/ export declare class Spinner {
    states: string[];
    state: number;
    /** Create a Spinner */
    constructor(
    /** The States */ states?: string[]);
    /** Get the Current State */
    get(): string;
}
/**
 * Encrypt a String
 * @since 1.0.3
*/ export declare function encryptStr(options?: encryptStrOptions): string;
/**
 * Decrypt a String
 * @since 1.0.3
*/ export declare function decryptStr(options?: decryptStrOptions): string;
/**
 * Hash a String
 * @since 1.0.4
*/ export declare function hashStr<T extends hashStrOptions>(options?: hashStrOptions): T['output'] extends 'bytes' ? Hash : string;
