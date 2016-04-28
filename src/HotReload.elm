module HotReload exposing (setupInit, setupInitWithFlags, setupUpdate)

import Native.HotReload
import Task exposing (Task, andThen, succeed, sequence, map)

{-| Activate hot reloading on init for a program created using Html.program
-}
setupInit : Maybe (msg, msg) -> (model, Cmd msg) -> (model, Cmd msg)
setupInit msgs default =
  Native.HotReload.init ()
    |> Maybe.map (\restoredModel -> (restoredModel, hotReloadedCmd msgs))
    |> Maybe.withDefault default


{-| Active hot reloading on init for a program created using Html.programWithFlags
-}
setupInitWithFlags : Maybe (msg, msg) -> (flags -> (model, Cmd msg)) -> (flags -> (model, Cmd msg))
setupInitWithFlags msgs default =
  Native.HotReload.init ()
    |> Maybe.map (\restoredModel -> always (restoredModel, hotReloadedCmd msgs))
    |> Maybe.withDefault default


{-| Activate hot reloading on update
-}
setupUpdate : (msg -> model -> (model, Cmd msg)) -> (msg -> model -> (model, Cmd msg))
setupUpdate default =
  \msg model ->
    let
      -- Call the real update to get out the model and cmd
      (model, cmd) =
        default msg model

      -- Use the Native function to save the model as a side-effect
      _ =
        Native.HotReload.saveModel model
    in
    (model, cmd)


hotReloadedCmd : Maybe (msg, msg) -> Cmd msg
hotReloadedCmd msgs =
  msgs
    |> Maybe.map (\(msg, noopMsg) -> Task.perform (always noopMsg) (always msg) (Task.succeed ()))
    |> Maybe.withDefault Cmd.none
