import { Err, Ok, Result } from '.';
import { None, Option, Some } from '../option';

export class ResultImpl {
  /**
   * @hidden
   */
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  /**
   * Returns `true` if the result is {@link Ok}.
   *
   * # Examples
   *
   * Basic usage:
   *
   * ```ts
   * const x: Result<number, string> = Ok(-3);
   * assert.equal(x.isOk(), true);
   * const y: Result<number, string> = Err('Some error message');
   * assert.equal(y.isOk(), false);
   * ```
   *
   * [In Rust](https://doc.rust-lang.org/std/result/enum.Result.html#method.is_ok)
   */
  isOk<T, E>(this: Result<T, E>): this is Ok<T> {
    // NOTE: This method is not called because it is proxied.
    /* istanbul ignore next */
    return this.isOk();
  }

  /**
   * Returns `true` if the result is {@link Err}.
   *
   * # Examples
   *
   * Basic usage:
   *
   * ```ts
   * const x: Result<number, string> = Ok(-3);
   * assert.equal(x.isErr(), false);
   * const y: Result<number, string> = Err('Some error message');
   * assert.equal(y.isErr(), true);
   * ```
   *
   * [In Rust](https://doc.rust-lang.org/std/result/enum.Result.html#method.is_err)
   */
  isErr<T, E>(this: Result<T, E>): this is Err<E> {
    // NOTE: This method is not called because it is proxied.
    /* istanbul ignore next */
    return this.isErr();
  }

  /**
   * Converts from `Result<T, E>` to {@link Option `Option<T>`}.
   *
   * Converts `this` into an {@link Option `Option<T>`}, consuming `this`,
   * and discarding the error, if any.
   *
   * # Examples
   *
   * Basic usage:
   *
   * ```ts
   * const x: Result<number, string> = Ok(2);
   * assert.deepEqual(x.ok(), Some(2));
   *
   * const y: Result<number, string> = Err('Nothing here');
   * assert.deepEqual(y.ok(), None);
   * ```
   *
   * [In Rust](https://doc.rust-lang.org/std/result/enum.Result.html#method.ok)
   */
  ok<T, E>(this: Result<T, E>): Option<T> {
    return this.isOk() ? Some(this.value) : None;
  }

  /**
   * Converts from `Result<T, E>` to {@link Option `Option<E>`}.
   *
   * Converts `this` into an {@link Option `Option<E>`}, consuming `this`,
   * and discarding the success value, if any.
   *
   * # Examples
   *
   * Basic usage:
   *
   * ```ts
   * const x: Result<number, string> = Ok(2);
   * assert.deepEqual(x.err(), None);
   *
   * const y: Result<number, string> = Err('Nothing here');
   * assert.deepEqual(y.err(), Some('Nothing here'));
   * ```
   *
   * [In Rust](https://doc.rust-lang.org/std/result/enum.Result.html#method.err)
   */
  err<T, E>(this: Result<T, E>): Option<E> {
    return this.isOk() ? None : Some(this.value);
  }

  /**
   * Maps a `Result<T, E>` to `Result<U, E>` by applying a function to a
   * contained {@link Ok} value, leaving an {@link Err} value untouched.
   *
   * This function can be used to compose the results of two functions.
   *
   * # Examples
   *
   * Print the numbers on each line of a string multiplied by two.
   *
   * ```ts
   * const parse = (value: string): Result<number, string> => {
   *   const n = parseInt(value);
   *   return isNaN(n) ? Err('value is not a number.') : Ok(n);
   * };
   *
   * assert.deepEqual(
   *   parse('3').map((i) => i * 2),
   *   Ok(6),
   * );
   * assert.deepEqual(
   *   parse('text').map((i) => i * 2),
   *   Err('value is not a number.'),
   * );
   * ```
   *
   * [In Rust](https://doc.rust-lang.org/std/result/enum.Result.html#method.map)
   */
  map<T, E, U>(this: Result<T, E>, op: (arg: T) => U): Result<U, E> {
    return this.isOk() ? Ok(op(this.value)) : this;
  }

  /**
   * Returns the provided def (if {@link Err}), or
   * applies a function to the contained value (if {@link Ok}),
   *
   * Arguments passed to `mapOr` are eagerly evaluated; if you are passing
   * the result of a function call, it is recommended to use {@link mapOrElse},
   * which is lazily evaluated.
   *
   * # Examples
   *
   * ```
   * const x = Ok('foo') as Result<string, string>;
   * assert.equal(x.mapOr(42, (v) => v.length), 3);
   *
   * const y = Err('bar') as Result<string, string>;
   * assert.equal(y.mapOr(42, (v) => v.length), 42);
   * ```
   *
   * [In Rust](https://doc.rust-lang.org/std/result/enum.Result.html#method.map_or)
   */
  mapOr<T, E, U>(this: Result<T, E>, def: U, f: (arg: T) => U): U {
    return this.isOk() ? f(this.value) : def;
  }

  /**
   * Maps a `Result<T, E>` to `U` by applying fallback function `def` to
   * a contained {@link Err} value, or function `f` to a contained {@link Ok} value.
   *
   * This function can be used to unpack a successful result
   * while handling an error.
   *
   *
   * # Examples
   *
   * Basic usage:
   *
   * ```ts
   * const k = 21;
   *
   * const x = Ok('foo') as Result<string, string>;
   * assert.equal(x.mapOrElse(() => k * 2, (v) => v.length), 3);
   *
   * const y = Err('bar') as Result<string, string>;
   * assert.equal(y.mapOrElse(() => k * 2, (v) => v.length), 42);
   * ```
   *
   * [In Rust](https://doc.rust-lang.org/std/result/enum.Result.html#method.map_or_else)
   */
  mapOrElse<T, E, U>(
    this: Result<T, E>,
    def: (arg: E) => U,
    f: (arg: T) => U,
  ): U {
    return this.isOk() ? f(this.value) : def(this.value);
  }

  /**
   * Maps a `Result<T, E>` to `Result<T, F>` by applying a function to a
   * contained {@link Err} value, leaving an {@link Ok} value untouched.
   *
   * This function can be used to pass through a successful result while handling
   * an error.
   *
   *
   * # Examples
   *
   * Basic usage:
   *
   * ```ts
   * const stringify = (x: number): string => `error code: ${x}`;
   *
   * const x: Result<number, number> = Ok(2);
   * assert.deepEqual(x.mapErr(stringify), Ok(2));
   *
   * const y: Result<number, number> = Err(13);
   * assert.deepEqual(y.mapErr(stringify), Err('error code: 13'));
   * ```
   *
   * [In Rust](https://doc.rust-lang.org/std/result/enum.Result.html#method.map_err)
   */
  mapErr<T, E, F>(this: Result<T, E>, op: (arg: E) => F): Result<T, F> {
    return this.isOk() ? this : Err(op(this.value));
  }

  /**
   * Returns `res` if the result is {@link Ok}, otherwise returns the {@link Err} value of `this`.
   *
   *
   * # Examples
   *
   * Basic usage:
   *
   * ```ts
   * let x: Result<u32, &str> = Ok(2);
   * let y: Result<&str, &str> = Err("late error");
   * assert_eq!(x.and(y), Err("late error"));
   *
   * let x: Result<u32, &str> = Err("early error");
   * let y: Result<&str, &str> = Ok("foo");
   * assert_eq!(x.and(y), Err("early error"));
   *
   * let x: Result<u32, &str> = Err("not a 2");
   * let y: Result<&str, &str> = Err("late error");
   * assert_eq!(x.and(y), Err("not a 2"));
   *
   * let x: Result<u32, &str> = Ok(2);
   * let y: Result<&str, &str> = Ok("different result type");
   * assert_eq!(x.and(y), Ok("different result type"));
   * ```
   *
   * [In Rust](https://doc.rust-lang.org/std/result/enum.Result.html#method.and)
   */
  and<T, E, U>(this: Result<T, E>, res: Result<U, E>): Result<U, E> {
    return this.isOk() ? res : this;
  }

  /**
   * Calls `op` if the result is {@link Ok}, otherwise returns the {@link Err} value of `this`.
   *
   *
   * This function can be used for control flow based on `Result` values.
   *
   * # Examples
   *
   * ```ts
   * const evenThenToString = (x: number): Result<string, string> => {
   *   return x % 2 === 0 ? Ok(x.toString()) : Err(`${x} is not even`);
   * };
   *
   * assert.deepEqual(Ok(2).andThen(evenThenToString), Ok('2'));
   * assert.deepEqual(Ok(5).andThen(evenThenToString), Err('5 is not even'));
   * assert.deepEqual(
   *   Err('not a number').andThen(evenThenToString),
   *   Err('not a number'),
   * );
   * ```
   *
   * [In Rust](https://doc.rust-lang.org/std/result/enum.Result.html#method.and_then)
   */
  andThen<T, E, U>(
    this: Result<T, E>,
    op: (arg: T) => Result<U, E>,
  ): Result<U, E> {
    return this.isOk() ? op(this.value) : this;
  }

  /**
   * Returns `res` if the result is {@link Err}, otherwise returns the {@link Ok} value of `this`.
   *
   * Arguments passed to `or` are eagerly evaluated; if you are passing the
   * result of a function call, it is recommended to use {@link orElse}, which is
   * lazily evaluated.
   *
   * # Examples
   *
   * Basic usage:
   *
   * ```ts
   * const a: Result<number, string> = Ok(2);
   * const b: Result<number, string> = Err('late error');
   * assert.deepEqual(a.or(b), Ok(2));
   *
   * const c: Result<number, string> = Err('early error');
   * const d: Result<number, string> = Ok(2);
   * assert.deepEqual(c.or(d), Ok(2));
   *
   * const e: Result<number, string> = Err('not a 2');
   * const f: Result<number, string> = Err('late error');
   * assert.deepEqual(e.or(f), Err('late error'));
   *
   * const g: Result<number, string> = Ok(2);
   * const h: Result<number, string> = Ok(100);
   * assert.deepEqual(g.or(h), Ok(2));
   * ```
   *
   * [In Rust](https://doc.rust-lang.org/std/result/enum.Result.html#method.or)
   */
  or<T, E, F>(this: Result<T, E>, res: Result<T, F>): Result<T, F> {
    return this.isOk() ? this : res;
  }

  /**
   * Calls `op` if the result is {@link Err}, otherwise returns the {@link Ok} value of `this`.
   *
   * This function can be used for control flow based on result values.
   *
   *
   * # Examples
   *
   * Basic usage:
   *
   * ```ts
   * const sq = (x: number): Result<number, number> => Ok(x * x);
   * const err = (x: number): Result<number, number> => Err(x);
   *
   * assert.deepEqual(Ok(2).orElse(sq).orElse(sq), Ok(2));
   * assert.deepEqual(Ok(2).orElse(err).orElse(sq), Ok(2));
   * assert.deepEqual(Err(3).orElse(sq).orElse(err), Ok(9));
   * assert.deepEqual(Err(3).orElse(err).orElse(err), Err(3));
   * ```
   *
   * [In Rust](https://doc.rust-lang.org/std/result/enum.Result.html#method.or_else)
   */
  orElse<T, E, F>(
    this: Result<T, E>,
    op: (arg: E) => Result<T, F>,
  ): Result<T, F> {
    return this.isOk() ? this : op(this.value);
  }

  /**
   * Returns the contained {@link Ok} value or a provided default.
   *
   * Arguments passed to `unwrapOr` are eagerly evaluated; if you are passing
   * the result of a function call, it is recommended to use {@link unwrapOrElse},
   * which is lazily evaluated.
   *
   * # Examples
   *
   * Basic usage:
   *
   * ```ts
   * const def = 2;
   * const x: Result<number, string> = Ok(9);
   * assert.equal(x.unwrapOr(def), 9);
   *
   * const y: Result<number, string> = Err('error');
   * assert.equal(y.unwrapOr(def), def);
   * ```
   *
   * [In Rust](https://doc.rust-lang.org/std/result/enum.Result.html#method.unwrap_or)
   */
  unwrapOr<T, E>(this: Result<T, E>, def: T): T {
    return this.isOk() ? this.value : def;
  }

  /**
   * Returns the contained [`Ok`] value or computes it from a closure.
   *
   *
   * # Examples
   *
   * Basic usage:
   *
   * ```ts
   * const count = (x: string): number => x.length;
   *
   * assert.equal(Ok(2).unwrapOrElse(count), 2);
   * assert.equal(Err('foo').unwrapOrElse(count), 3);
   * ```
   *
   * [In Rust](https://doc.rust-lang.org/std/result/enum.Result.html#method.unwrap_or_else)
   */
  unwrapOrElse<T, E>(this: Result<T, E>, op: (arg: E) => T): T {
    return this.isOk() ? this.value : op(this.value);
  }

  /**
   * Transposes a `Result` of an `Option` into an `Option` of a `Result`.
   *
   * `Ok(None)` will be mapped to `None`.
   * `Ok(Some(_))` and `Err(_)` will be mapped to `Some(Ok(_))` and `Some(Err(_))`.
   *
   * # Examples
   *
   * ```ts
   * type SomeErr = { message: string };
   *
   * const a: Result<Option<number>, SomeErr> = Ok(Some(5));
   * const b: Result<Option<number>, SomeErr> = Ok(None);
   * const c: Result<Option<number>, SomeErr> = Err({ message: 'some error' });
   * const d: Option<Result<number, SomeErr>> = Some(Ok(5));
   * const e: Option<Result<number, SomeErr>> = Some(
   *   Err({ message: 'some error' }),
   * );
   * assert.deepEqual(a.transpose(), d);
   * assert.deepEqual(b.transpose(), None);
   * assert.deepEqual(c.transpose(), e);
   * ```
   *
   * [In Rust](https://doc.rust-lang.org/std/result/enum.Result.html#method.transpose)
   */
  transpose<T, E>(this: Result<Option<T>, E>): Option<Result<T, E>> {
    if (this.isOk()) {
      return this.value.isSome() ? Some(Ok(this.value.value)) : None;
    }
    return Some(Err(this.value));
  }
}
