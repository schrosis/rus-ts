const SomeType = Symbol('Some');

/**
 * Some value of type T.
 *
 * [In Rust](https://doc.rust-lang.org/std/option/enum.Option.html#variant.Some)
 *
 * @see {@link Option}
 * @see {@link <internal>!OptionImpl}
 */
export class Some<T> {
  [SomeType]!: never;

  constructor(readonly value: T) {}

  /**
   * Returns `true` if the option is a {@link Some} value.
   *
   * # Exapmles
   *
   * ```ts
   * const x: Option<number> = Some(2);
   * assert.equal(x.isSome(), true);
   *
   * const y: Option<number> = None;
   * assert.equal(y.isSome(), false);
   * ```
   *
   * [In Rust](https://doc.rust-lang.org/std/option/enum.Option.html#method.is_some)
   */
  isSome(): this is Some<T> {
    return true;
  }

  /**
   * Returns `true` if the option is a {@link None} value.
   *
   * # Examples
   *
   * ```ts
   * const x: Option<number> = Some(2);
   * assert.equal(x.isNone(), false);
   *
   * const y: Option<number> = None;
   * assert.equal(y.isNone(), true);
   * ```
   *
   * [In Rust](https://doc.rust-lang.org/std/option/enum.Option.html#method.is_none)
   */
  isNone(): boolean {
    return false;
  }
}
