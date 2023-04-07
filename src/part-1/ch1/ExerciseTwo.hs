module ExerciseTwo where

  compose :: (a -> b) -> (b -> c) -> (a -> c)
  compose f g = g . f
