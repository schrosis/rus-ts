const NoneType = Symbol('None');

/**
 * No value.
 *
 * [In Rust](https://doc.rust-lang.org/std/option/enum.Option.html#variant.None)
 *
 * @see {@link Option}
 * @see {@link <internal>!OptionImpl}
 */
export class None {
  [NoneType]!: never;

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
  isSome(): boolean {
    return false;
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
  isNone(): this is None {
    return true;
  }
}
