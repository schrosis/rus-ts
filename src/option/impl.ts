import { None, Option, Some } from '.';

// TODO: fix to link
/**
 * The Option type. See the module level documentation for more.
 *
 * [In Rust](https://doc.rust-lang.org/std/option/enum.Option.html)
 *
 * @see {@link Option}
 */
export class OptionImpl {
  /**
   * @hidden
   */
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

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
  isSome<T>(this: Option<T>): this is Some<T> {
    // NOTE: This method is not called because it is proxied.
    return this.isSome();
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
  isNone<T>(this: Option<T>): this is None {
    // NOTE: This method is not called because it is proxied.
    return this.isNone();
  }

  /**
   * Returns the contained {@link Some} value or a provided default.
   *
   * Arguments passed to `unwrapOr` are eagerly evaluated; if you are passing
   * the result of a function call, it is recommended to use {@link OptionImpl.unwrapOrElse},
   * which is lazily evaluated.
   *
   * # Examples
   *
   * ```ts
   * assert.equal(Some('car').unwrapOr('bike'), 'car');
   * assert.equal(None.unwrapOr('bike'), 'bike');
   * ```
   *
   * [In Rust](https://doc.rust-lang.org/std/option/enum.Option.html#method.unwrap_or)
   */
  unwrapOr<T>(this: Option<T>, def: T): T {
    return this.isSome() ? this.value : def;
  }

  /**
   * Returns the contained {@link Some} value or computes it from a closure.
   *
   * # Examples
   *
   * ```ts
   * const k = 10;
   * assert.equal(Some(4).unwrapOrElse(() => 2 * k), 4);
   * assert.equal(None.unwrapOrElse(() => 2 * k), 20);
   * ```
   *
   * [In Rust](https://doc.rust-lang.org/std/option/enum.Option.html#method.unwrap_or_else)
   */
  unwrapOrElse<T>(this: Option<T>, f: () => T): T {
    return this.isSome() ? this.value : f();
  }

  /**
   * Maps an `Option<T>` to `Option<U>` by applying a function to a contained value.
   *
   * # Examples
   *
   * Converts an `Option<string>` into an `Option<number>`, consuming
   * the original:
   *
   * ```ts
   * const maybeSomeString = Some('Hello, World!');
   * const maybeSomeLen = maybeSomeString.map((s) => s.length);
   *
   * assert.deepEqual(maybeSomeLen, Some(13));
   * ```
   *
   * [In Rust](https://doc.rust-lang.org/std/option/enum.Option.html#method.map)
   */
  map<T, U>(this: Option<T>, f: (arg: T) => U): Option<U> {
    return this.isSome() ? Some(f(this.value)) : None;
  }

  /**
   * Returns the provided default result (if none),
   * or applies a function to the contained value (if any).
   *
   * Arguments passed to `map_or` are eagerly evaluated; if you are passing
   * the result of a function call, it is recommended to use {@link OptionImpl.mapOrElse},
   * which is lazily evaluated.
   *
   * # Examples
   *
   * ```ts
   * const x = Some('foo');
   * assert.equal(x.mapOr(42, (v) => v.length), 3);
   *
   * const y = None as Option<string>;
   * assert.equal(y.mapOr(42, (v) => v.length), 42);
   * ```
   *
   * [In Rust](https://doc.rust-lang.org/std/option/enum.Option.html#method.map_or)
   */
  mapOr<T, U>(this: Option<T>, def: U, f: (arg: T) => U): U {
    return this.isSome() ? f(this.value) : def;
  }

  /**
   * Computes a default function result (if none), or
   * applies a different function to the contained value (if any).
   *
   * # Examples
   *
   * ```ts
   * const k = 21;
   *
   * const x = Some('foo');
   * assert.equal(x.mapOrElse(() => 2 * k, (v) => v.length), 3);
   *
   * const y = None as Option<string>;
   * assert.equal(y.mapOrElse(() => 2 * k, (v) => v.length), 42);
   * ```
   *
   * [In Rust](https://doc.rust-lang.org/std/option/enum.Option.html#method.map_or_else)
   */
  mapOrElse<T, U>(this: Option<T>, def: () => U, f: (arg: T) => U): U {
    return this.isSome() ? f(this.value) : def();
  }

  // /// Transforms the `Option<T>` into a [`Result<T, E>`], mapping [`Some(v)`] to
  // /// [`Ok(v)`] and [`None`] to [`Err(err)`].
  // ///
  // /// Arguments passed to `ok_or` are eagerly evaluated; if you are passing the
  // /// result of a function call, it is recommended to use [`ok_or_else`], which is
  // /// lazily evaluated.
  // ///
  // /// [`Ok(v)`]: Ok
  // /// [`Err(err)`]: Err
  // /// [`Some(v)`]: Some
  // /// [`ok_or_else`]: Option::ok_or_else
  // ///
  // /// # Examples
  // ///
  // /// ```
  // /// let x = Some("foo");
  // /// assert_eq!(x.ok_or(0), Ok("foo"));
  // ///
  // /// let x: Option<&str> = None;
  // /// assert_eq!(x.ok_or(0), Err(0));
  // /// ```
  // #[inline]
  // #[stable(feature = "rust1", since = "1.0.0")]
  // #[rustc_const_unstable(feature = "const_option_ext", issue = "91930")]
  // pub const fn ok_or<E>(self, err: E) -> Result<T, E>
  // where
  //     E: ~const Destruct,
  // {
  //     match self {
  //         Some(v) => Ok(v),
  //         None => Err(err),
  //     }
  // }

  // /// Transforms the `Option<T>` into a [`Result<T, E>`], mapping [`Some(v)`] to
  // /// [`Ok(v)`] and [`None`] to [`Err(err())`].
  // ///
  // /// [`Ok(v)`]: Ok
  // /// [`Err(err())`]: Err
  // /// [`Some(v)`]: Some
  // ///
  // /// # Examples
  // ///
  // /// ```
  // /// let x = Some("foo");
  // /// assert_eq!(x.ok_or_else(|| 0), Ok("foo"));
  // ///
  // /// let x: Option<&str> = None;
  // /// assert_eq!(x.ok_or_else(|| 0), Err(0));
  // /// ```
  // #[inline]
  // #[stable(feature = "rust1", since = "1.0.0")]
  // #[rustc_const_unstable(feature = "const_option_ext", issue = "91930")]
  // pub const fn ok_or_else<E, F>(self, err: F) -> Result<T, E>
  // where
  //     F: ~const FnOnce() -> E,
  //     F: ~const Destruct,
  // {
  //     match self {
  //         Some(v) => Ok(v),
  //         None => Err(err()),
  //     }
  // }

  /**
   * Returns {@link None} if the option is {@link None}, otherwise returns `optb`.
   *
   * # Examples
   *
   * ```ts
   * const a = Some(2);
   * const b: Option<string> = None;
   * assert.deepEqual(a.and(b), None);
   *
   * const c: Option<number> = None;
   * const d = Some('foo');
   * assert.deepEqual(c.and(d), None);
   *
   * const e = Some(2);
   * const f = Some('foo');
   * assert.deepEqual(e.and(f), Some('foo'));
   *
   * const g: Option<number> = None;
   * const h: Option<string> = None;
   * assert.deepEqual(g.and(h), None);
   * ```
   *
   * [In Rust](https://doc.rust-lang.org/std/option/enum.Option.html#method.and)
   */
  and<T, U>(this: Option<T>, optb: Option<U>): Option<U> {
    return this.isSome() ? optb : this;
  }

  /**
   * Returns {@link None} if the option is {@link None}, otherwise calls `f` with the
   * wrapped value and returns the result.
   *
   * Some languages call this operation flatmap.
   *
   * # Examples
   *
   * ```ts
   * const evenThenToString = (x: number): Option<string> => {
   *   return x % 2 === 0 ? Some(x.toString()) : None;
   * };
   *
   * assert.deepEqual(Some(2).andThen(evenThenToString), Some('2'));
   * assert.deepEqual(Some(5).andThen(evenThenToString), None); // odd!
   * assert.deepEqual(None.andThen(evenThenToString), None);
   * ```
   *
   * Often used to chain fallible operations that may return {@link None}.
   *
   * ```ts
   * const arr2d = [['A0', 'A1'], ['B0', 'B1']];
   *
   * const item01 = Option.fromUndefinable(arr2d.at(0)).andThen((row) => {
   *   return Option.fromUndefinable(row.at(1));
   * });
   * assert.deepEqual(item01, Some('A1'));
   *
   * const item20 = Option.fromUndefinable(arr2d.at(2)).andThen((row) => {
   *   return Option.fromUndefinable(row.at(0));
   * });
   * assert.deepEqual(item20, None);
   * ```
   *
   * [In Rust](https://doc.rust-lang.org/std/option/enum.Option.html#method.and_then)
   */
  andThen<T, U>(this: Option<T>, f: (arg: T) => Option<U>): Option<U> {
    return this.isSome() ? f(this.value) : this;
  }

  /**
   * Returns {@link None} if the option is {@link None}, otherwise calls `predicate`
   * with the wrapped value and returns:
   *
   * - {@link Some Some(t)} if `predicate` returns `true` (where `t` is the wrapped
   *   value), and
   * - {@link None} if `predicate` returns `false`.
   *
   * This function works similar to [Array.prototype.filter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter). You can imagine
   * the `Option<T>` being an array over one or zero elements. `filter()`
   * lets you decide which elements to keep.
   *
   * # Examples
   *
   * ```ts
   * const isEven = (n: number): boolean => n % 2 == 0;
   *
   * assert.deepEqual(None.filter(isEven), None);
   * assert.deepEqual(Some(3).filter(isEven), None);
   * assert.deepEqual(Some(4).filter(isEven), Some(4));
   * ```
   *
   * [In Rust](https://doc.rust-lang.org/std/option/enum.Option.html#method.filter)
   */
  filter<T>(this: Option<T>, predicate: (arg: T) => boolean): Option<T> {
    return this.isSome() && predicate(this.value) ? this : None;
  }

  /**
   * Returns the option if it contains a value, otherwise returns `optb`.
   *
   * Arguments passed to `or` are eagerly evaluated; if you are passing the
   * result of a function call, it is recommended to use {@link OptionImpl.orElse}, which is
   * lazily evaluated.
   *
   * # Examples
   *
   * ```ts
   * const a = Some(2);
   * const b = None;
   * assert.deepEqual(a.or(b), Some(2));
   *
   * const c = None;
   * const d = Some(100);
   * assert.deepEqual(c.or(d), Some(100));
   *
   * const e = Some(2);
   * const f = Some(100);
   * assert.deepEqual(e.or(f), Some(2));
   *
   * const g = None as Option<number>;
   * const h = None;
   * assert.deepEqual(g.or(h), None);
   * ```
   *
   * [In Rust](https://doc.rust-lang.org/std/option/enum.Option.html#method.or)
   */
  or<T>(this: Option<T>, optb: Option<T>): Option<T> {
    return this.isSome() ? this : optb;
  }

  /**
   * Returns the option if it contains a value, otherwise calls `f` and
   * returns the result.
   *
   * # Examples
   *
   * ```ts
   * const nobody = (): Option<string> => None;
   * const vikings = (): Option<string> => Some('vikings');
   *
   * assert.deepEqual(Some('barbarians').orElse(vikings), Some('barbarians'));
   * assert.deepEqual(None.orElse(vikings), Some('vikings'));
   * assert.deepEqual(None.orElse(nobody), None);
   * ```
   *
   * [In Rust](https://doc.rust-lang.org/std/option/enum.Option.html#method.or_else)
   */
  orElse<T>(this: Option<T>, f: () => Option<T>): Option<T> {
    return this.isSome() ? this : f();
  }

  /**
   * Returns {@link Some} if exactly one of `this`, `optb` is {@link Some}, otherwise returns {@link None}.
   *
   * # Examples
   *
   * ```ts
   * const a = Some(2);
   * const b = None as Option<number>;
   * assert.deepEqual(a.xor(b), Some(2));
   *
   * const c = None as Option<number>;
   * const d = Some(2);
   * assert.deepEqual(c.xor(d), Some(2));
   *
   * const e = Some(2);
   * const f = Some(2);
   * assert.deepEqual(e.xor(f), None);
   *
   * const g = None as Option<number>;
   * const h = None as Option<number>;
   * assert.deepEqual(g.xor(h), None);
   * ```
   *
   * [In Rust](https://doc.rust-lang.org/std/option/enum.Option.html#method.xor)
   */
  xor<T>(this: Option<T>, optb: Option<T>): Option<T> {
    if (this.isSome() && optb.isNone()) {
      return this;
    }
    if (this.isNone() && optb.isSome()) {
      return optb;
    }
    return None;
  }

  /**
   * Zips `this` with another `Option`.
   *
   * If `this` is `Some(s)` and `other` is `Some(o)`, this method returns `Some((s, o))`.
   * Otherwise, `None` is returned.
   *
   * # Examples
   *
   * ```ts
   * const x = Some(1);
   * const y = Some('hi');
   * const z = None as Option<number>;
   *
   * assert.deepEqual(x.zip(y), Some([1, 'hi']));
   * assert.deepEqual(x.zip(z), None);
   * ```
   *
   * [In Rust](https://doc.rust-lang.org/std/option/enum.Option.html#method.zip)
   */
  zip<T, U>(this: Option<T>, other: Option<U>): Option<[T, U]> {
    return this.isSome() && other.isSome()
      ? Some([this.value, other.value])
      : None;
  }

  // /// Transposes an `Option` of a [`Result`] into a [`Result`] of an `Option`.
  // ///
  // /// [`None`] will be mapped to <code>[Ok]\([None])</code>.
  // /// <code>[Some]\([Ok]\(\_))</code> and <code>[Some]\([Err]\(\_))</code> will be mapped to
  // /// <code>[Ok]\([Some]\(\_))</code> and <code>[Err]\(\_)</code>.
  // ///
  // /// # Examples
  // ///
  // /// ```
  // /// #[derive(Debug, Eq, PartialEq)]
  // /// struct SomeErr;
  // ///
  // /// let x: Result<Option<i32>, SomeErr> = Ok(Some(5));
  // /// let y: Option<Result<i32, SomeErr>> = Some(Ok(5));
  // /// assert_eq!(x, y.transpose());
  // /// ```
  // #[inline]
  // #[stable(feature = "transpose_result", since = "1.33.0")]
  // #[rustc_const_unstable(feature = "const_option", issue = "67441")]
  // pub const fn transpose(self) -> Result<Option<T>, E> {
  //     match self {
  //         Some(Ok(x)) => Ok(Some(x)),
  //         Some(Err(e)) => Err(e),
  //         None => Ok(None),
  //     }
  // }

  /**
   * Converts from `Option<Option<T>>` to `Option<T>`.
   *
   * # Examples
   *
   * Basic usage:
   *
   * ```ts
   * const x: Option<Option<number>> = Some(Some(6));
   * assert.deepEqual(x.flatten(), Some(6));
   *
   * const y: Option<Option<number>> = Some(None);
   * assert.deepEqual(y.flatten(), None);
   *
   * const z = None as Option<Option<number>>;
   * assert.deepEqual(z.flatten(), None);
   * ```
   *
   * Flattening only removes one level of nesting at a time:
   *
   * ```ts
   * const x: Option<Option<Option<number>>> = Some(Some(Some(6)));
   * assert.deepEqual(x.flatten(), Some(Some(6)));
   * assert.deepEqual(x.flatten().flatten(), Some(6));
   * ```
   *
   * [In Rust](https://doc.rust-lang.org/std/option/enum.Option.html#method.flatten)
   */
  flatten<U>(this: Option<Option<U>>): Option<U> {
    return this.isSome() ? this.value : this;
  }
}

/**
 * Convert `Option<T>` to `T | undefined` value
 *
 * # Example
 *
 * ```ts
 * const x: string | undefined = 'foo';
 * assert.deepEqual(Option.fromUndefinable(x), Some('foo'));
 *
 * const y: string | undefined = undefined;
 * assert.deepEqual(Option.fromUndefinable(y), None);
 *
 * const z = 'bar';
 * assert.deepEqual(Option.fromUndefinable(z), Some('bar'));
 * ```
 *
 * This is not in Rust.
 */
export const fromUndefinable = <T>(value: T | undefined): Option<T> => {
  return typeof value === 'undefined' ? None : Some(value);
};

/**
 * Convert `Option<T>` to `T | null` value
 *
 * # Example
 *
 * ```ts
 * const x: string | null = 'foo';
 * assert.deepEqual(Option.fromNullable(x), Some('foo'));
 *
 * const y: string | null = null;
 * assert.deepEqual(Option.fromNullable(y), None);
 *
 * const z = 'bar';
 * assert.deepEqual(Option.fromNullable(z), Some('bar'));
 * ```
 *
 * This is not in Rust.
 */
export const fromNullable = <T>(value: T | null): Option<T> => {
  return value === null ? None : Some(value);
};
