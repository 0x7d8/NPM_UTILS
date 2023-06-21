import { as } from ".."
import { z } from "zod"

const zodValidateSymbol = Symbol('zod::validate::rjutils')

type Zod = typeof import("zod")

type DescriptorMetaItem = {
	param: number
	type: z.ZodType
}

/**
 * Add a Zod Type Validation to a Class Method.
 * 
 * Currently you have to manually assign the type, so for larger Schemas
 * you might want to define them seperately and use `z.infer<S>` for the parameter type.
 * @example
 * ```
 * import { z } from "zod"
 * const Bool = z.boolean()
 * 
 * class MyClass {
 *   ‍@zValidate()
 *   public getAsHex(‍@zType((z) => z.number()) num: number, ‍@zType(Bool) with0x: z.infer<typeof Bool>): string {
 *     return with0x ? '0x' + num.toString(16) : num.toString(16)
 *   }
 * }
 * ```
 * @since 1.7.0
*/ export function zType(type: z.ZodType | ((z: Zod['z']) => z.ZodType)) {
	return function <This, Args extends any[], Return>(
		target: (this: This, ...args: Args) => Return,
		context: ClassMethodDecoratorContext<This, (this: This, ...args: Args) => Return>,
		paramIndex: number
	) {
		if (!Object.getOwnPropertyDescriptor(target, zodValidateSymbol)?.value) Object.defineProperty(target, zodValidateSymbol, {
			value: []
		})

		as<DescriptorMetaItem[]>(Object.getOwnPropertyDescriptor(target, zodValidateSymbol)?.value).push({
			param: paramIndex,
			type: typeof type === 'function' ? type(z) : type
		})
	}
}

/**
 * Add to a Class Method to add Zod Validation to it.
 * 
 * Currently you have to manually assign the type, so for larger Schemas
 * you might want to define them seperately and use `z.infer<S>` for the parameter type.
 * @example
 * ```
 * class MyClass {
 *   ‍@zValidate()
 *   public getAsHex(‍@zType((z) => z.number()) num: number): string {
 *     return num.toString(16)
 *   }
 * }
 * 
 * // or
 * 
 * class MyClass {
 *   ‍@zValidate([ (z) => z.number() ])
 *   public getAsHex(‍num: number): string {
 *     return num.toString(16)
 *   }
 * }
 * ```
 * @since 1.7.0
*/ export function zValidate(validations: (z.ZodType | ((z: Zod['z']) => z.ZodType))[] = []) {
	return function <This, Args extends any[], Return>(
		target: (this: This, ...args: Args) => Return,
		context: ClassMethodDecoratorContext<This, (this: This, ...args: Args) => Return>
	) {
		const fn: Function = arguments[2].value
		as<PropertyDescriptor>(arguments[2]).value = function (...args: any[]) {
			const finalArgs: any[] = []

			const zTypes = as<DescriptorMetaItem[]>(Object.getOwnPropertyDescriptor(target, zodValidateSymbol)?.value?.reverse() ?? validations.map((v, i) => ({ param: i, type: typeof v === 'function' ? v(z) : v })))
			for (let i = 0; i < zTypes.length; i++) {
				const infos = zTypes[i].type.safeParse(args[zTypes[i].param])
				if (!infos.success) throw new Error(`${context}(${'X, '.repeat(i)}!${', x'.repeat(zTypes.length - 1 - i)}) |  ${infos.error.errors[0].message}`)
				else finalArgs.push(infos.data)
			}

			return fn.apply(this, finalArgs)
		}
	}
}