const OkType = Symbol('Ok');

export class Ok<T> {
  [OkType]!: never;

  constructor(readonly value: T) {}

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
  isOk(): this is Ok<T> {
    return true;
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
  isErr(): boolean {
    return false;
  }
}
