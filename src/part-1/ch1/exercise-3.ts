import { compose } from "./exercise-2";

type A = string;

function idA(str: A): A {
  return str;
}

function toNumber(str: A): number {
  return str.split("").map(c => c.charCodeAt(0)).reduce((a, b) => a + b)
}

const h = compose(idA, toNumber)

console.log(h("abc"));
