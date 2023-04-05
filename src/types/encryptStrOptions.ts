export default interface encryptStrOptions {
  /** The Text to encrypt */ text: string
  /**
   * The Algorithm to use
   * @default "aes-256-cbc"
  */ algorithm?: string
  /**
   * The Text Output
   * @default "hex"
  */ output?: BufferEncoding
  /**
   * The Key to encrypt with
   * @default "123unsafe"
  */ key?: string
}