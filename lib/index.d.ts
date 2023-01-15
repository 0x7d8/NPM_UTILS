import randomStrOptions from "./interfaces/randomStrOptions";
import encryptStrOptions from "./interfaces/encryptStrOptions";
import decryptStrOptions from "./interfaces/decryptStrOptions";
import hashStrOptions from "./interfaces/hashStrOptions";
declare const _default: {
    /** Load an Env File to JSON */
    loadEnv(filePath: string): {};
    /** Generate a Random Number */
    randomNum(min: number, max: number, dec?: number): number;
    /** Generate a Random Boolean */
    randomBol(): boolean;
    /** Generate a Random String */
    randomStr(options: randomStrOptions): any;
    /** Generate a Text Spinner */
    spinner: {
        new (): {
            states: string[];
            state: number;
            get(): string;
        };
    };
    /** Encrypt a String */
    encryptStr(options: encryptStrOptions): any;
    /** Decrypt a String */
    decryptStr(options: decryptStrOptions): any;
    /** Hash a String */
    hashStr(options: hashStrOptions): any;
};
export = _default;
//# sourceMappingURL=index.d.ts.map