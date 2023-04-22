module Test where

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
