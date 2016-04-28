# A state-persisting hot reload module for Elm 0.17
This is a small module for Elm apps built with [The Elm Architecture](https://evancz.gitbooks.io/an-introduction-to-elm/content/architecture/index.html) 
which serializes and persists the state to `localStorage` whenever the model changes, and then reloads the state when the
application starts up.

## Installation
Since Native modules are not supported in the `elm-package` repository you will need to download the package  and add a reference to the
`src` directory in your `elm-package.json`.  You will also need to enable Native modules by adding `"native-modules": true`
in `elm-package.json`.  Once it is possible to access `localStorage` in pure Elm (via an effects manager?) this will no longer be necessary
and I hope it will be possible to install normally through `elm-package`.

## How to use it
In order to enable state reloading you need to add a few snippets to your top-level `Main.elm` file.  The example below shows
the minimum code required to implement the feature.

```elm
module Main exposing (..)

import Html.App as Html
import App exposing (init, update, view, subscriptions)
import HotReload

-- If you are using Html.program
main : Program App.Flags
main =
  Html.programWithFlags
    { init = init |> HotReload.setupInit Nothing
    , update = update |> HotReload.setupUpdate
    , view = view
    , subscriptions = subscriptions

-- If you are using Html.programWithFlags
main : Program App.Flags
main =
  Html.programWithFlags
    { init = init |> HotReload.setupInitWithFlags Nothing
    , update = update |> HotReload.setupUpdate
    , view = view
    , subscriptions = subscriptions
    }
```

## Custom messages
You might have noticed that there is a `Nothing` in the example as an argument to `setupInit`/`setupInitWithFlags`.  This argument allows you
to fire off a custom message if hot reloading has taken place.  You might need this if, for example, your application configures things through
a port in response to `init` or a specific message in `update` (neither of which get called during a hot-reload).

Here is an example of a configuration that fires a `HotReloaded` message if hot-reloading occured:

```elm
main : Program App.Flags
main =
  Html.programWithFlags
    { init = init |> HotReload.setupInit (Just (App.HotReloaded, App.Noop))
    , update = update |> HotReload.setupUpdate
    , view = view
    , subscriptions = subscriptions
```

Note that due to the way that commands are constructed in Elm 0.17 it is necessary to provide a `Noop` message as well; if I can figure out a way
around this it will be removed in a later version.

## Clearing the state
You can clear the state by opening a console window in your browser and typing:

`localStorage.removeItem("state")`

The next time you refresh the page it will build the model from `init` instead of restoring it from localStorage.
