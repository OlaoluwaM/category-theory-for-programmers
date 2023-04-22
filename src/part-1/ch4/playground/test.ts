type Some<A> = {
  _tag: "Some";
  value: A;
};

type None = {
  _tag: "None";
};

type Option<A> = None | Some<A>;

function safeReciprocal(x: number): Option<number> {
  if (isNaN(x) || x <= 0) return { _tag: "None" };
  return { _tag: "Some", value: 1 / x };
}

function safeRoot(x: number): Option<number> {
  if (isNaN(x) || x <= 0) return { _tag: "None" };
  return { _tag: "Some", value: Math.sqrt(x) };
}

function composeOptional<A, B>(fab: (a: A) => Option<B>) {
  return <C>(fbc: (b: B) => Option<C>) =>
    (a: A): Option<C> => {
      const v1 = fab(a);
      if (v1._tag === "None") return { _tag: "None" };
      return fbc(v1.value);
    };
}

const safeRootReciprocal = composeOptional(safeRoot)(safeReciprocal);
