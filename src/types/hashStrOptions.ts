import { BinaryToTextEncoding } from "crypto"

export default interface hashStrOptions {
  /** The Text to Hash */ text: string
  /**
   * The Algorithm to use
   * @default "sha256"
  */ algorithm?: string
  /**
   * The Text Output
   * @default "hex"
  */ output?: BinaryToTextEncoding | 'bytes'
}