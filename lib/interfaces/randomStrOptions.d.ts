export default interface randomStrOptions {
    /**
     * The Length of the String
     * @default 12
    */ length?: number;
    /**
     * Whether Numbers should be included
     * @default true
    */ numbers?: boolean;
    /**
     * Whether Symbols should be included
     * @default false
    */ symbols?: boolean;
    /**
     * Whether Uppercase Letters should be included
     * @default true
    */ uppercase?: boolean;
    /**
     * Whether Lowercase Letters should be included
     * @default true
    */ lowercase?: boolean;
    /**
     * Letters / Symbols that shouldnt be included
     * @default ''
    */ exclude?: string;
}
//# sourceMappingURL=randomStrOptions.d.ts.map