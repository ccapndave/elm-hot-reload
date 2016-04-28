//import Maybe //

//var _ccapndave$elm_hot_reload$Native_HotReload = function() {
var _user$project$Native_HotReload = function() {

  function init() {
    var state = localStorage.getItem("state");

    if (state) {
      console.info("The model was restored from localStorage! If you find yourself getting strange errors try clearing the state using localStorage.removeItem('state') and reloading the page.");
      return _elm_lang$core$Maybe$Just(JSON.parse(state));
    } else {
      return _elm_lang$core$Maybe$Nothing;
    }
  };

  function saveModel(model) {
    localStorage.setItem("state", JSON.stringify(model));
  };

  return {
    init: init,
    saveModel: saveModel
  }
}();
