import { None as NoneClass } from './none';
import { Some as SomeClass } from './some';
import { Mixin, mixin } from '../util';
import { fromNullable, fromUndefinedable, OptionImpl } from './impl';

const optionImpl = new OptionImpl();

// TODO: fix to link
/**
 * The Option type. See [the module level documentation]() for more.
 *
 * [In Rust](https://doc.rust-lang.org/std/option/enum.Option.html)
 *
 * @see {@link Option}
 * @see {@link <internal>!OptionImpl}
 */
export type Option<T> = None | Some<T>;

/**
 * The Option type. See [the module level documentation]() for more.
 *
 * [In Rust](https://doc.rust-lang.org/std/option/enum.Option.html)
 */
export const Option = {
  fromUndefinedable,
  fromNullable,
};

/**
 * No value.
 *
 * [In Rust](https://doc.rust-lang.org/std/option/enum.Option.html#variant.None)
 *
 * @see {@link Option}
 */
export type None = Mixin<NoneClass, OptionImpl>;

/**
 * No value.
 *
 * [In Rust](https://doc.rust-lang.org/std/option/enum.Option.html#variant.None)
 *
 * @see {@link Option}
 */
export const None = mixin(new NoneClass(), optionImpl);

/**
 * Some value of type T.
 *
 * [In Rust](https://doc.rust-lang.org/std/option/enum.Option.html#variant.Some)
 *
 * @see {@link Option}
 */
export type Some<T> = Mixin<SomeClass<T>, OptionImpl>;

/**
 * Some value of type T.
 *
 * [In Rust](https://doc.rust-lang.org/std/option/enum.Option.html#variant.Some)
 *
 * @see {@link Option}
 */
export const Some = <T>(value: T) => mixin(new SomeClass(value), optionImpl);
