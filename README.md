# rusty-ts

🦀 < Something like Rust with excellent type inference.

## Install

Coming soon.

## Feature

- Rust like Option type.
- Rust like Result type. (Coming soon)
- Zero dependency
- No panic!

## Usage

### Option

Type `Option` represents an optional value: every `Option` is either `Some` and contains a value, or `None`, and does not. `Option` types are very common [in Rust](https://doc.rust-lang.org/std/option/) code, as they have a number of uses:

- Initial values
- Return value for otherwise reporting simple errors, where `None` is returned on error
- Optional struct fields
- Optional function arguments
- Swapping things out of difficult situations

`Options` are paired with pattern matching by `if` to query the presence of a value and take action, always accounting for the `None` case.

```typescript
const divide = (numerator: number, denominator: number): Option<number> => {
  if (denominator === 0) {
    return None;
  } else {
    return Some(numerator / denominator);
  }
};

// The return value of the function is an option
let result = divide(2.0, 3.0);

// Pattern match to retrieve the value
if (result.isSome()) {
  // The division was valid
  console.log(`Result: ${result.value}`);
} else {
  console.log('Cannot divide by 0');
}
```

#### Method overview

[Option implements](https://schrosis.github.io/rusty-ts/classes/_internal_.OptionImpl.html) several methods in Rust `Option`.

##### Querying the variant

The `isSome` and `isNone` methods return `true` if the `Option` is `Some` or `None`, respectively.

##### Extracting the contained value

If `Option` is type inferred as `Some`, it can be accessed by `this.value`.

\*TypeScript does not have the concept of `panic`, so references that result in a `panic` are not allowed.

##### Transforming contained values

These methods transform `Option` to `Result`:

- `okOr` transforms `Some(v)` to `Ok(v)`, and `None` to `Err(err)` using the provided default `err` value
- `okOrElse` transforms `Some(v)` to `Ok(v)`, and `None` to a value of `Err` using the provided function
- `transpose` transposes an `Option` of a `Result` into a `Result` of an `Option`

(Coming soon.)

These methods transform the `Some` variant:

- `filter` calls the provided predicate function on the contained value `t` if the `Option` is `Some(t)`, and returns `Some(t)` if the function returns `true`; otherwise, returns `None`
- `flatten` removes one level of nesting from an `Option<Option<T>>`
- `map` transforms `Option<T>` to `Option<U>` by applying the provided function to the contained value of `Some` and leaving `None` values unchanged

These methods transform `Option<T>` to a value of a possibly different type `U`:

- `mapOr` applies the provided function to the contained value of `Some`, or returns the provided default value if the `Option` is `None`
- `mapOrElse` applies the provided function to the contained value of `Some`, or returns the result of evaluating the provided fallback function if the `Option` is `None`

These methods combine the `Some` variants of two `Option` values:

- `zip` returns `Some([s, o])` if self is `Some(s)` and the provided `Option` value is `Some(o)`; otherwise, returns `None`

##### Boolean operators

These methods treat the `Option` as a boolean value, where `Some` acts like `true` and `None` acts like `false`. There are two categories of these methods: ones that take an `Option` as input, and ones that take a function as input (to be lazily evaluated).

The `and`, `or`, and `xor` methods take another `Option` as input, and produce an `Option` as output. Only the and method can produce an `Option<U>` value having a different inner type `U` than `Option<T>`.

| method | this      | input     | output    |
| ------ | --------- | --------- | --------- |
| `and`  | `None`    | (ignored) | `None`    |
| `and`  | `Some(x)` | `None`    | `None`    |
| `and`  | `Some(x)` | `Some(y)` | `Some(y)` |
| `or`   | `None`    | `None`    | `None`    |
| `or`   | `None`    | `Some(y)` | `Some(y)` |
| `or`   | `Some(x)` | (ignored) | `Some(x)` |
| `xor`  | `None`    | `None`    | `None`    |
| `xor`  | `None`    | `Some(y)` | `Some(y)` |
| `xor`  | `Some(x)` | `None`    | `Some(x)` |
| `xor`  | `Some(x)` | `Some(y)` | `None`    |

The `andThen` and `orElse` methods take a function as input, and only evaluate the function when they need to produce a new value. Only the `andThen` method can produce an `Option<U>` value having a different inner type `U` than `Option<T>`.

| method    | this      | function input | function result | output    |
| --------- | --------- | -------------- | --------------- | --------- |
| `andThen` | `None`    | (not provided) | (not evaluated) | `None`    |
| `andThen` | `Some(x)` | `x`            | `None`          | `None`    |
| `andThen` | `Some(x)` | `x`            | `Some(y)`       | `Some(y)` |
| `orElse`  | `None`    | (not provided) | `None`          | `None`    |
| `orElse`  | `None`    | (not provided) | `Some(y)`       | `Some(y)` |
| `orElse`  | `Some(x)` | (not provided) | (not evaluated) | `Some(x)` |

##### Methods not in Rust

In TypeScript, the types `T|undefined` and `T|null` are usually used.
There are methods to generate `Option` from these types.

| method                   | input          | output      |
| ------------------------ | -------------- | ----------- |
| `Option.fromUndefinable` | `T\|undefined` | `Option<T>` |
| `Option.fromNullable`    | `T\|null`      | `Option<T>` |

## For more

🦀 < See [the module level documentation](https://schrosis.github.io/rusty-ts/modules.html) for more.
