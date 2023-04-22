# Category Theory For Programmers Challenges

## 4 Kleisli Categories

### 1. Construct the Kleisli category for partial functions (define composition and identity)

Since I am not familiar with C++, I shall write my answers in Typescript :)

```ts
type Some<A> = {
  _tag: "Some";
  value: A
};

type None = {
  _tag: "None",
};

type Option<A> = None | Some<A>;

// Composition
function composeOptional<A, B>(fab: (a: A) => Option<B>) {
  return <C>(fbc: (b: B) => Option<C>) =>
  (a: A): Option<C> => {
    const v1 = fab(a)
    if (v1._tag === "None") return { _tag: "None" }
    return fbc(v1.value)
  }
}

// Identity
function pure<A>(a: A): Option<A> {
  return { _tag: "Some", value: a }
}
```

```haskell
data Option a = None {} | Some a

-- Composition
composeOptional :: (a -> Option b) -> (b -> Option c) -> (a -> Option c)
composeOptional fab fbc a = case fab a of
  None -> None
  Some b -> fbc b

-- Identity
pureO :: a -> Option a
pureO = Some
```

### 2. Implement the embellished function safe_reciprocal that returns a valid reciprocal of its argument, if it’s different from zero

```ts
type Some<A> = {
  _tag: "Some";
  value: A
};

type None = {
  _tag: "None",
};

type Option<A> = None | Some<A>;

function safeReciprocal(x: number): Option<number> {
  if (isNaN(x) || x <= 0) return { _tag: "None" };
  return { _tag: "Some", value: 1/x }
}
```

```haskell
data Option a = None {} | Some a

safeReciprocal :: Integer -> Option Integer
safeReciprocal int = if int <= 0 then Some (1/int) else None
```

### 3. Compose the functions safe_root and safe_reciprocal to implement safe_root_reciprocal that calculates sqrt(1/x) whenever possible

```typescript
type Some<A> = {
  _tag: "Some";
  value: A
};

type None = {
  _tag: "None",
};

type Option<A> = None | Some<A>;

function safeReciprocal(x: number): Option<number> {
  if (isNaN(x) || x <= 0) return { _tag: "None" };
  return { _tag: "Some", value: 1/x }
}

function safeRoot(x: number): Option<number> {
  if (isNaN(x) || x <= 0) return { _tag: "None" };
  return { _tag: "Some", value: Math.sqrt(x) }
}

function composeOptional<A, B>(fab: (a: A) => Option<B>) {
  return <C>(fbc: (b: B) => Option<C>) =>
  (a: A): Option<C> => {
    const v1 = fab(a)
    if (v1._tag === "None") return { _tag: "None" }
    return fbc(v1.value)
  }
}

const safeRootReciprocal = composeOptional(safeRoot)(safeReciprocal)
```

```haskell
  data Option a = None {} | Some a

-- Composition
  composeOptional :: (a -> Option b) -> (b -> Option c) -> (a -> Option c)
  composeOptional fab fbc a = case fab a of
    None -> None
    Some b -> fbc b

  safeReciprocal :: Integer -> Option Integer
  safeReciprocal int = if int <= 0 then Some (1 `div` int) else None

  intSqrt :: Integer -> Integer
  intSqrt = floor . sqrt . fromIntegral

  safeRoot :: Integer -> Option Integer
  safeRoot int = if int <= 0 then Some (intSqrt  int) else None

  safeRootReciprocal :: Integer -> Option Integer
  safeRootReciprocal = composeOptional safeRoot safeReciprocal
````
