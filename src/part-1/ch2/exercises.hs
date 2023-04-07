module Exercises where
  import Prelude hiding (and, or)
  import Data.Function (fix)
  -- import Random (randomIO)

  -- Exercise 1
  memoize :: (Int -> a) -> (Int -> a)
  memoize f = (map f [0..] !!)

  fib :: (Int -> Integer) -> (Int -> Integer)
  fib f 0 = 0
  fib f 1 = 1
  fib f n = f (n - 1) + f (n - 2)

  fibMemo = fix (memoize . fib)

  -- Exercise 5
  type TargetFn = Bool -> Bool
  -- not
  -- id
  always :: TargetFn
  always b = True

  never :: TargetFn
  never b = False

  and :: Bool -> Bool -> Bool
  and b1 b2 = b1 && b2

  and' = and True
  and'' = and False

  or :: Bool -> Bool -> Bool
  or b1 b2 = b1 || b2

  or' = or True
  or'' = or False
