module Exercise3 where

  anObject :: Int
  anObject = 100

  idA :: Int -> Int
  idA int = int

  toString :: Int -> String
  toString = show

  compose :: (a -> b) -> (b -> c) -> (a -> c)
  compose f g = g . f

  h = compose idA toString
