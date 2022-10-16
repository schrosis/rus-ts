import { Ok as OkClass } from './ok';
import { Err as ErrClass } from './err';
import { Mixin, mixin } from '../util';
import { ResultImpl } from './impl';

const resultImpl = new ResultImpl();

/**
 * Result is a type that represents either success ({@link Ok}) or failure ({@link Err}).
 * See the [module documentation]() for details.
 *
 * [In Rust](https://doc.rust-lang.org/std/result/enum.Result.html)
 *
 * @see {@link Result}
 * @see {@link <internal>!ResultImpl}
 */
export type Result<T, E> = Ok<T> | Err<E>;

/**
 * Contains the success value
 *
 * [In Rust](https://doc.rust-lang.org/std/result/enum.Result.html#variant.Ok)
 *
 * @see {@link Result}
 */
export type Ok<T> = Mixin<OkClass<T>, ResultImpl>;

/**
 * Contains the success value
 *
 * [In Rust](https://doc.rust-lang.org/std/result/enum.Result.html#variant.Ok)
 *
 * @see {@link Result}
 */
export const Ok = <T>(value: T): Ok<T> => mixin(new OkClass(value), resultImpl);

/**
 * Contains the error value
 *
 * [In Rust](https://doc.rust-lang.org/std/result/enum.Result.html#variant.Err)
 *
 * @see {@link Result}
 */
export type Err<T> = Mixin<ErrClass<T>, ResultImpl>;

/**
 * Contains the error value
 *
 * [In Rust](https://doc.rust-lang.org/std/result/enum.Result.html#variant.Err)
 *
 * @see {@link Result}
 */
export const Err = <E>(value: E): Err<E> =>
  mixin(new ErrClass(value), resultImpl);
