import { Err, None, Ok, Option, Result, Some } from '@schrosis/rus-ts';
import assert from 'assert';

describe('Result', () => {
  describe('isOk', () => {
    it('Returns true if the result is Ok.', () => {
      const x: Result<number, string> = Ok(-3);
      assert.equal(x.isOk(), true);
      const y: Result<number, string> = Err('Some error message');
      assert.equal(y.isOk(), false);
    });
  });

  describe('isErr', () => {
    it('Returns true if the result is Err.', () => {
      const x: Result<number, string> = Ok(-3);
      assert.equal(x.isErr(), false);
      const y: Result<number, string> = Err('Some error message');
      assert.equal(y.isErr(), true);
    });
  });

  describe('ok', () => {
    it('Converts from Result<T, E> to Option<T>.', () => {
      const x: Result<number, string> = Ok(2);
      assert.deepEqual(x.ok(), Some(2));

      const y: Result<number, string> = Err('Nothing here');
      assert.deepEqual(y.ok(), None);
    });
  });

  describe('err', () => {
    it('Converts from Result<T, E> to Option<E>.', () => {
      const x: Result<number, string> = Ok(2);
      assert.deepEqual(x.err(), None);

      const y: Result<number, string> = Err('Nothing here');
      assert.deepEqual(y.err(), Some('Nothing here'));
    });
  });

  describe('map', () => {
    it('Maps a Result<T, E> to Result<U, E> by applying a function to a contained Ok value, leaving an Err value untouched.', () => {
      const parse = (value: string): Result<number, string> => {
        const n = parseInt(value);
        return isNaN(n) ? Err('value is not a number.') : Ok(n);
      };

      assert.deepEqual(
        parse('3').map((i) => i * 2),
        Ok(6),
      );
      assert.deepEqual(
        parse('text').map((i) => i * 2),
        Err('value is not a number.'),
      );
    });
  });

  describe('mapOr', () => {
    it('Returns the provided default (if Err), or applies a function to the contained value (if Ok)', () => {
      const x = Ok('foo') as Result<string, string>;
      assert.equal(
        x.mapOr(42, (v) => v.length),
        3,
      );
      const y = Err('bar') as Result<string, string>;
      assert.equal(
        y.mapOr(42, (v) => v.length),
        42,
      );
    });
  });

  describe('mapOrElse', () => {
    it('Maps a Result<T, E> to U by applying fallback function default to a contained Err value, or function f to a contained Ok value.', () => {
      const k = 21;

      const x = Ok('foo') as Result<string, string>;
      assert.equal(
        x.mapOrElse(
          () => k * 2,
          (v) => v.length,
        ),
        3,
      );

      const y = Err('bar') as Result<string, string>;
      assert.equal(
        y.mapOrElse(
          () => k * 2,
          (v) => v.length,
        ),
        42,
      );
    });
  });

  describe('mapErr', () => {
    it('Maps a Result<T, E> to Result<T, F> by applying a function to a contained Err value, leaving an Ok value untouched.', () => {
      const stringify = (x: number): string => `error code: ${x}`;

      const x: Result<number, number> = Ok(2);
      assert.deepEqual(x.mapErr(stringify), Ok(2));

      const y: Result<number, number> = Err(13);
      assert.deepEqual(y.mapErr(stringify), Err('error code: 13'));
    });
  });

  describe('and', () => {
    it('Returns res if the result is Ok, otherwise returns the Err value of this.', () => {
      const a: Result<number, string> = Ok(2);
      const b: Result<string, string> = Err('late error');
      assert.deepEqual(a.and(b), Err('late error'));

      const c: Result<number, string> = Err('early error');
      const d: Result<string, string> = Ok('foo');
      assert.deepEqual(c.and(d), Err('early error'));

      const e: Result<number, string> = Err('not a 2');
      const f: Result<string, string> = Err('late error');
      assert.deepEqual(e.and(f), Err('not a 2'));

      const g: Result<number, string> = Ok(2);
      const h: Result<string, string> = Ok('different result type');
      assert.deepEqual(g.and(h), Ok('different result type'));
    });
  });

  describe('andThen', () => {
    it('Calls op if the result is Ok, otherwise returns the Err value of this.', () => {
      const evenThenToString = (x: number): Result<string, string> => {
        return x % 2 === 0 ? Ok(x.toString()) : Err(`${x} is not even`);
      };

      assert.deepEqual(Ok(2).andThen(evenThenToString), Ok('2'));
      assert.deepEqual(Ok(5).andThen(evenThenToString), Err('5 is not even'));
      assert.deepEqual(
        Err('not a number').andThen(evenThenToString),
        Err('not a number'),
      );
    });
  });

  describe('or', () => {
    it('Returns res if the result is Err, otherwise returns the Ok value of this.', () => {
      const a: Result<number, string> = Ok(2);
      const b: Result<number, string> = Err('late error');
      assert.deepEqual(a.or(b), Ok(2));

      const c: Result<number, string> = Err('early error');
      const d: Result<number, string> = Ok(2);
      assert.deepEqual(c.or(d), Ok(2));

      const e: Result<number, string> = Err('not a 2');
      const f: Result<number, string> = Err('late error');
      assert.deepEqual(e.or(f), Err('late error'));

      const g: Result<number, string> = Ok(2);
      const h: Result<number, string> = Ok(100);
      assert.deepEqual(g.or(h), Ok(2));
    });
  });

  describe('orElse', () => {
    it('Calls op if the result is Err, otherwise returns the Ok value of this.', () => {
      const sq = (x: number): Result<number, number> => Ok(x * x);
      const err = (x: number): Result<number, number> => Err(x);

      assert.deepEqual(Ok(2).orElse(sq).orElse(sq), Ok(2));
      assert.deepEqual(Ok(2).orElse(err).orElse(sq), Ok(2));
      assert.deepEqual(Err(3).orElse(sq).orElse(err), Ok(9));
      assert.deepEqual(Err(3).orElse(err).orElse(err), Err(3));
    });
  });

  describe('unwrapOr', () => {
    it('Returns the contained Ok value or a provided default.', () => {
      const def = 2;
      const x: Result<number, string> = Ok(9);
      assert.equal(x.unwrapOr(def), 9);

      const y: Result<number, string> = Err('error');
      assert.equal(y.unwrapOr(def), def);
    });
  });

  describe('unwrapOrElse', () => {
    it('Returns the contained Ok value or computes it from a closure.', () => {
      const count = (x: string): number => x.length;

      assert.equal(Ok(2).unwrapOrElse(count), 2);
      assert.equal(Err('foo').unwrapOrElse(count), 3);
    });
  });

  describe('transpose', () => {
    type SomeErr = { message: string };

    const a: Result<Option<number>, SomeErr> = Ok(Some(5));
    const b: Option<Result<number, SomeErr>> = Some(Ok(5));
    assert.deepEqual(a.transpose(), b);

    const c: Result<Option<number>, SomeErr> = Ok(None);
    const d: Option<Result<number, SomeErr>> = None;
    assert.deepEqual(c.transpose(), d);

    const e: Result<Option<number>, SomeErr> = Err({ message: 'some error' });
    const f: Option<Result<number, SomeErr>> = Some(
      Err({ message: 'some error' }),
    );
    assert.deepEqual(e.transpose(), f);
  });
});
