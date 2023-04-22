module Test where


  data Option a = None {} | Some { value :: a }

  safeReciprocal :: Integer -> Option Integer
  safeReciprocal int = if int <= 0 then Some int else None

  composeOptional :: (a -> Option b) -> (b -> Option c) -> (a -> Option c)
  composeOptional fab fbc a = case fab a of
    None -> None
    Some b -> fbc b

  pureO :: a -> Option a
  pureO = Some
