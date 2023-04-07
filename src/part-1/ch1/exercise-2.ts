type AnyFunction<RT = any> = (...args: any[]) => RT;

type Last<T extends AnyFunction[]> = T extends [...infer _, infer R]
  ? R extends AnyFunction
    ? R
    : never
  : never;

type First<T extends AnyFunction[]> = T extends [infer E, ...infer _]
  ? E extends AnyFunction
    ? E
    : never
  : never;

export function compose<Fs extends AnyFunction[]>(...fs: Fs) {
  return fs.reduceRight(
    (f, g) =>
      (...args: unknown[]) =>
        g(f(...args))
  ) as (...args: Parameters<Last<Fs>>) => ReturnType<First<Fs>>;
}

const toStr = (a: number) => a.toString();
const mul = (a: number, b: number) => a * b;
