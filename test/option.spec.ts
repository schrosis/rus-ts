import { Err, None, Ok, Option, Result, Some } from '@schrosis/rus-ts';
import assert from 'assert';

describe('Option', () => {
  describe('isSome', () => {
    it('returns true if the option is a Some value.', () => {
      const x: Option<number> = Some(2);
      assert.equal(x.isSome(), true);

      const y: Option<number> = None;
      assert.equal(y.isSome(), false);
    });
  });

  describe('isNone', () => {
    it('Returns true if the option is a None value.', () => {
      const x: Option<number> = Some(2);
      assert.equal(x.isNone(), false);

      const y: Option<number> = None;
      assert.equal(y.isNone(), true);
    });
  });

  describe('unwrapOr', () => {
    it('Returns the contained Some value or a provided default.', () => {
      assert.equal(Some('car').unwrapOr('bike'), 'car');
      assert.equal(None.unwrapOr('bike'), 'bike');
    });
  });

  describe('unwrapOrElse', () => {
    it('Returns the contained Some value or computes it from a closure.', () => {
      const k = 10;
      assert.equal(
        Some(4).unwrapOrElse(() => 2 * k),
        4,
      );
      assert.equal(
        None.unwrapOrElse(() => 2 * k),
        20,
      );
    });
  });

  describe('map', () => {
    it('Maps an Option<T> to Option<U> by applying a function to a contained value.', () => {
      const maybeSomeString = Some('Hello, World!');
      const maybeSomeLen = maybeSomeString.map((s) => s.length);

      assert.deepEqual(maybeSomeLen, Some(13));
      assert.deepEqual(
        (None as Option<string>).map((s) => s.length),
        None,
      );
    });
  });

  describe('mapOr', () => {
    it('Returns the provided default result (if none), or applies a function to the contained value (if any).', () => {
      const x = Some('foo');
      assert.equal(
        x.mapOr(42, (v) => v.length),
        3,
      );

      const y = None as Option<string>;
      assert.equal(
        y.mapOr(42, (v) => v.length),
        42,
      );
    });
  });

  describe('mapOrElse', () => {
    it('Computes a default function result (if none), or applies a different function to the contained value (if any).', () => {
      const k = 21;

      const x = Some('foo');
      assert.equal(
        x.mapOrElse(
          () => 2 * k,
          (v) => v.length,
        ),
        3,
      );

      const y = None as Option<string>;
      assert.equal(
        y.mapOrElse(
          () => 2 * k,
          (v) => v.length,
        ),
        42,
      );
    });
  });

  describe('okOr', () => {
    it('Transforms the Option<T> into a Result<T, E>, mapping Some(v) to Ok(v) and None to Err(err).', () => {
      const x = Some('foo');
      assert.deepEqual(x.okOr(0), Ok('foo'));

      const y: Option<string> = None;
      assert.deepEqual(y.okOr(0), Err(0));
    });
  });

  describe('okOrElse', () => {
    it('Transforms the Option<T> into a Result<T, E>, mapping Some(v) to Ok(v) and None to Err(err()).', () => {
      const x = Some('foo');
      assert.deepEqual(
        x.okOrElse(() => 0),
        Ok('foo'),
      );

      const y: Option<string> = None;
      assert.deepEqual(
        y.okOrElse(() => 0),
        Err(0),
      );
    });
  });

  describe('and', () => {
    it('Returns None if the option is None, otherwise returns optb.', () => {
      const a = Some(2);
      const b = None as Option<string>;
      assert.deepEqual(a.and(b), None);

      const c = None as Option<number>;
      const d = Some('foo');
      assert.deepEqual(c.and(d), None);

      const e = Some(2);
      const f = Some('foo');
      assert.deepEqual(e.and(f), Some('foo'));

      const g = None as Option<number>;
      const h = None as Option<string>;
      assert.deepEqual(g.and(h), None);
    });
  });

  describe('andThen', () => {
    it('Returns None if the option is None, otherwise calls f with the wrapped value and returns the result.', () => {
      const evenThenToString = (x: number): Option<string> => {
        return x % 2 === 0 ? Some(x.toString()) : None;
      };

      assert.deepEqual(Some(2).andThen(evenThenToString), Some('2'));
      assert.deepEqual(Some(5).andThen(evenThenToString), None); // odd!
      assert.deepEqual(None.andThen(evenThenToString), None);
    });

    it('Often used to chain fallible operations that may return None.', () => {
      const arr2d = [
        ['A0', 'A1'],
        ['B0', 'B1'],
      ];

      const item01 = Option.fromUndefinable(arr2d.at(0)).andThen((row) => {
        return Option.fromUndefinable(row.at(1));
      });
      assert.deepEqual(item01, Some('A1'));

      const item20 = Option.fromUndefinable(arr2d.at(2)).andThen((row) => {
        return Option.fromUndefinable(row.at(0));
      });
      assert.deepEqual(item20, None);
    });
  });

  describe('filter', () => {
    it('Returns None if the option is None, otherwise calls predicate with the wrapped value and returns.', () => {
      const isEven = (n: number): boolean => n % 2 == 0;

      assert.deepEqual(None.filter(isEven), None);
      assert.deepEqual(Some(3).filter(isEven), None);
      assert.deepEqual(Some(4).filter(isEven), Some(4));
    });
  });

  describe('or', () => {
    it('Returns the option if it contains a value, otherwise returns optb.', () => {
      const a = Some(2);
      const b = None;
      assert.deepEqual(a.or(b), Some(2));

      const c = None;
      const d = Some(100);
      assert.deepEqual(c.or(d), Some(100));

      const e = Some(2);
      const f = Some(100);
      assert.deepEqual(e.or(f), Some(2));

      const g = None as Option<number>;
      const h = None;
      assert.deepEqual(g.or(h), None);
    });
  });

  describe('orElse', () => {
    it('Returns the option if it contains a value, otherwise calls f and returns the result.', () => {
      const nobody = (): Option<string> => None;
      const vikings = (): Option<string> => Some('vikings');

      assert.deepEqual(Some('barbarians').orElse(vikings), Some('barbarians'));
      assert.deepEqual(None.orElse(vikings), Some('vikings'));
      assert.deepEqual(None.orElse(nobody), None);
    });
  });

  describe('xor', () => {
    it('Returns Some if exactly one of this, optb is Some, otherwise returns None.', () => {
      const a = Some(2);
      const b = None as Option<number>;
      assert.deepEqual(a.xor(b), Some(2));

      const c = None as Option<number>;
      const d = Some(2);
      assert.deepEqual(c.xor(d), Some(2));

      const e = Some(2);
      const f = Some(2);
      assert.deepEqual(e.xor(f), None);

      const g = None as Option<number>;
      const h = None as Option<number>;
      assert.deepEqual(g.xor(h), None);
    });
  });

  describe('zip', () => {
    it('Zips this with another Option.', () => {
      const x = Some(1);
      const y = Some('hi');
      const z = None as Option<number>;

      assert.deepEqual(x.zip(y), Some([1, 'hi']));
      assert.deepEqual(x.zip(z), None);
    });
  });

  describe('transpose', () => {
    it('Transposes an Option of a Result into a Result of an Option.', () => {
      type SomeErr = { message: string };

      const a: Option<Result<number, SomeErr>> = Some(Ok(5));
      const b: Result<Option<number>, SomeErr> = Ok(Some(5));
      assert.deepEqual(a.transpose(), b);

      const c: Option<Result<number, SomeErr>> = Some(
        Err({ message: 'some error' }),
      );
      const d: Result<Option<number>, SomeErr> = Err({ message: 'some error' });
      assert.deepEqual(c.transpose(), d);

      const e: Option<Result<number, SomeErr>> = None;
      const f: Result<Option<number>, SomeErr> = Ok(None);
      assert.deepEqual(e.transpose(), f);
    });
  });

  describe('flatten', () => {
    it('Converts from Option<Option<T>> to Option<T>.', () => {
      const x: Option<Option<number>> = Some(Some(6));
      assert.deepEqual(x.flatten(), Some(6));

      const y: Option<Option<number>> = Some(None);
      assert.deepEqual(y.flatten(), None);

      const z = None as Option<Option<number>>;
      assert.deepEqual(z.flatten(), None);
    });

    it('Flattening only removes one level of nesting at a time.', () => {
      const x: Option<Option<Option<number>>> = Some(Some(Some(6)));
      assert.deepEqual(x.flatten(), Some(Some(6)));
      assert.deepEqual(x.flatten().flatten(), Some(6));
    });
  });

  describe('fromUndefinable', () => {
    it('Convert Option<T> to T | undefined value', () => {
      const x: string | undefined = 'foo';
      assert.deepEqual(Option.fromUndefinable(x), Some('foo'));

      const y: string | undefined = undefined;
      assert.deepEqual(Option.fromUndefinable(y), None);

      const z = 'bar';
      assert.deepEqual(Option.fromUndefinable(z), Some('bar'));
    });
  });

  describe('fromNullable', () => {
    it('Convert Option<T> to T | null value', () => {
      const x: string | null = 'foo';
      assert.deepEqual(Option.fromNullable(x), Some('foo'));

      const y: string | null = null;
      assert.deepEqual(Option.fromNullable(y), None);

      const z = 'bar';
      assert.deepEqual(Option.fromNullable(z), Some('bar'));
    });
  });
});
