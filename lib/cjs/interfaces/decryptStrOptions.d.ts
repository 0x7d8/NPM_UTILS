/// <reference types="node" />
export default interface decryptStrOptions {
    /** The Text to decrypt */ text: string;
    /**
     * The Algorithm to use
     * @default 'aes-256-cbc'
    */ algorithm?: string;
    /**
     * The Text Output
     * @default 'hex'
    */ output?: BufferEncoding;
    /**
     * The Key to decrypt with
     * @default '123unsafe'
    */ key?: string;
}
