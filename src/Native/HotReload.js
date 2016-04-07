Elm.Native = Elm.Native || {};
Elm.Native.HotReload = {};
Elm.Native.HotReload.make = function(localRuntime) {
  localRuntime.Native = localRuntime.Native || {};
  localRuntime.Native.HotReload = localRuntime.Native.HotReload || {};
  if (localRuntime.Native.HotReload.values) return localRuntime.Native.HotReload.values;

  var Maybe = Elm.Maybe.make(localRuntime);
  var Signal = Elm.Native.Signal.make(localRuntime);

  var init = function init(cb) {
    var state = localStorage.getItem("state");

    if (state) {
      console.info("The model was restored from localStorage! If you find yourself getting strange errors try clearing the state using localStorage.removeItem('state') and reloading the page.");
      return Maybe.Just(JSON.parse(state));
    } else {
      return Maybe.Nothing;
    }
  };

  var saveModel = function saveModel(model) {
    localStorage.setItem("state", JSON.stringify(model));
  };

  return localRuntime.Native.HotReload.values = {
    init: init,
    saveModel: saveModel
  };
};
