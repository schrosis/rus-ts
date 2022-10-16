const ErrType = Symbol('Err');

export class Err<E> {
  [ErrType]!: never;

  constructor(readonly value: E) {}

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
   */
  isOk(): boolean {
    return false;
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
  isErr(): this is Err<E> {
    return true;
  }
}
