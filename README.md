# A state-persisting hot reload module for Elm
This is a small module for Elm apps built with [The Elm Architecture](https://github.com/evancz/elm-architecture-tutorial) 
which serializes and persists the state to `localStorage` whenever the model changes, and then reloads the state when the
application starts up.

Note that there is also https://github.com/fluxxu/elm-hot-loader, but if you don't use webpack then unfortunately this isn't
any use.

### Disclaimer
This uses Native modules which means it almost certainly **will** break when 0.17 comes out.

## Installation
Since Native modules are not supported in `elm-package` you will need to download the packages and add a reference to the
`src` directory in your `elm-package.json`.  You will also need to enable Native modules by adding `"native-modules": true`
in `elm-package.json`.

## How to use it
In order to enable state reloading you need to add a few snippets to your top-level `Main.elm` file.  The example below shows
the minimum code required to implement the feature.

```elm
module Main where

import Html exposing (Html)
import StartApp exposing (start, App)
import App exposing (init, update, view)
import HotReload

app : StartApp.App App.Model
app = start
    { init = HotReload.init <| init
    , update = update
    , view = view
    , inputs =
      [
      ]
    }


main : Signal Html
main =
  app.html


{-| Hot reloading
-}
port hotReloadPort : Signal ()
port hotReloadPort =
  HotReload.hotReloadPort app
```

There are two things that need to be added:

 1. You need to add a `hotReloadPort`.  This takes care of saving the model to `localStorage` whenever it changes.
 2. You need to add `HotReload.init <| ` before the value of your `init` property.  This takes care of using the saved state, if it
 exists, and otherwise using the provided init.

## Clearing the state
You can clear the state by opening a console window in your browser and typing:

`localStorage.removeItem("state")`

The next time you refresh the page it will build the model from `App.init` instead of restoring it from localStorage.
