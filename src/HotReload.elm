module HotReload where

import StartApp
import Effects exposing (Effects)
import Native.HotReload

{-| Get the init for use in StartApp.  If there is a saved state that will be used, otherwise the
provided default state will be used.
-}
init : (a, Effects b) -> (a, Effects b)
init default =
  Native.HotReload.init ()
    |> Maybe.map (\model -> (model, Effects.none))
    |> Maybe.withDefault default


{-| Create a port for saving the model when it changes
-}
hotReloadPort : StartApp.App a -> Signal ()
hotReloadPort app =
  app.model
    |> Signal.map Native.HotReload.saveModel
    |> Signal.map (always ())
