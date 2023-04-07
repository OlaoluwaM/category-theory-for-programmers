// Exercise 1
type AnyFunction = (...args: any[]) => any;

export function memoize<Fn extends AnyFunction>(fn: Fn) {
  const cache = new Map<string, ReturnType<Fn>>();

  return (...args: Parameters<Fn>): ReturnType<Fn> => {
    const stringifiedArgs = args.toString();

    if (cache.has(stringifiedArgs)) {
      console.log("Return value gotten from cache", args);
      return cache.get(stringifiedArgs)!;
    }

    const returnVal = fn(...args);
    cache.set(stringifiedArgs, returnVal);

    return returnVal;
  };
}

function double(a: number) {
  return a + a;
}

const f = memoize(double);

console.log(
  "Exercise 1",
  [5, 4, 5, 6, 7, 0, 4, 2, 4, 5, 6, 7, 1, 3, 4, 4, 5, 5, 5, 5, 6, 7, 7].map(f)
);
// -------------------------------------------------------------------

// Exercise 2
const memoizedMathRandom = memoize(Math.random);

console.log(Array.from({ length: 14 }, memoizedMathRandom));
// -------------------------------------------------------------------

// Exercise 3
function generateRandomNumberFromSeed(seed: number): number {
  return Math.floor(Math.random() * Math.floor(seed));
}

const memoizedGenerateRandomNumberFromSeed = memoize(
  generateRandomNumberFromSeed
);

console.log(
  Array.from({ length: 14 }, (_, ind) => ind + 1).map(
    memoizedGenerateRandomNumberFromSeed
  )
);
// -------------------------------------------------------------------

// Exercise 5
type TargetFn = (b: boolean) => boolean;

function not(b: boolean): boolean {
  return !b;
}

function id(b: boolean): boolean {
  return b;
}

function always(b: boolean): boolean {
  return true;
}

function never(b: boolean): boolean {
  return false;
}

function and(b1: boolean) {
  return (b2: boolean): boolean => b1 && b2;
}

function or(b1: boolean) {
  return (b2: boolean): boolean => b1 || b2;
}

const partialAnd = and(true);
const partialOr = or(false);

const partialAndPrime = and(false);
const partialOrPrime = or(true);
