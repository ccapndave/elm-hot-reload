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
    return state ? Maybe.Just(JSON.parse(state)) : Maybe.Nothing;
  };

  var saveModel = function saveModel(model) {
    localStorage.setItem("state", JSON.stringify(model));
  };

  return localRuntime.Native.HotReload.values = {
    init: init,
    saveModel: saveModel
  };
};
