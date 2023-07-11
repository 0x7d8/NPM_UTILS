import { Add, Gt, Subtract } from "ts-arithmetic"

type CreateArray<From extends number, Size extends number, Array extends any[] = []>
	= Array extends { length: Size } ? Array : Array extends { length: infer Progress extends number } ? CreateArray<From, Size, [ ...Array, Add<Add<Progress, Subtract<From, 1>>, 1> ]> : never

class From<Amount extends number> {
	private amount: Amount

	/**
	 * Initialize a new From Class
	 * @since 1.8.0
	*/ constructor(amount: Amount) {
		this.amount = amount
	}

	/**
	 * Generate the Array until X
	 * @example
	 * ```
	 * from(10).to(15) // [10, 11, 12, 13, 14, 15]
	 * ```
	 * @since 1.8.0
	*/ public to<To extends number, _Size extends number = Add<Subtract<To, Amount>, 1>, _Valid = Gt<To, Amount> extends 1 ? CreateArray<Amount, _Size> : never>(amount: To): _Valid {
		const result: number[] = []
		for (let i = this.amount; i < amount + 1; i++) {
			result.push(i)
		}

		return result as any
	}
}

/**
 * Utility for defining ranges
 * @example
 * ```
 * from(10).to(15) // [10, 11, 12, 13, 14, 15]
 * ```
 * @since 1.8.0
*/ export default function from<Amount extends number>(amount: Amount): From<Amount> {
	return new From(amount)
}