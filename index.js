'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _typeof(obj) {
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(source, true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(source).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) {
    return;
  }

  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance");
}

function capitalized(word) {
  var str = word.toString();

  if (str.length > 0) {
    str = str[0].toUpperCase() + str.substr(1);
  }

  return str;
}

function setterActionFactory(setterName) {
  return function (_ref, payload) {
    var commit = _ref.commit;
    commit(setterName, payload);
  };
}

function setterMutationFactory(setterKey) {
  return function (state, payload) {
    state[setterKey] = payload;
  };
}

function toggleActionFactory(toggleName) {
  return function (_ref2, payload) {
    var commit = _ref2.commit;
    commit(toggleName, payload);
  };
}

function toggleMutationFactory(setterKey, keyType) {
  switch (keyType) {
    case 'number':
      // 0 or 1
      return function (state, payload) {
        state[setterKey] = typeof payload === 'number' ? payload : state[setterKey] === 0 ? 1 : 0;
      };

    case 'boolean': // true or false

    default:
      return function (state, payload) {
        state[setterKey] = typeof payload === 'boolean' ? payload : !state[setterKey];
      };
  }
}

function createMutationsAndActions(options) {
  var setterList = options.setterList,
      setterPrefix = options.setterPrefix,
      toggleList = options.toggleList,
      togglePrefix = options.togglePrefix;
  var actions = {};
  var mutations = {};
  var mySetterPrefix = setterPrefix ? setterPrefix : 'set';
  var myTogglePrefix = togglePrefix ? togglePrefix : 'toggle';

  if (setterList) {
    setterList.forEach(function (setterKey) {
      var setterName = mySetterPrefix + capitalized(setterKey);
      actions[setterName] = setterActionFactory(setterName);
      mutations[setterName] = setterMutationFactory(setterKey);
    });
  }

  if (toggleList) {
    toggleList.forEach(function (toggleKey) {
      var toggleName = myTogglePrefix + capitalized(toggleKey);
      actions[toggleName] = toggleActionFactory(toggleName);
      mutations[toggleName] = toggleMutationFactory(toggleKey);
    });
  }

  return [actions, mutations];
}
function createActions(options) {
  var r = createMutationsAndActions(options);
  return r[0];
}
function createMutations(options) {
  var r = createMutationsAndActions(options);
  return r[1];
}
function vuexRichStore(storeObj) {
  if (_typeof(storeObj) !== 'object' || !storeObj['rich']) {
    return storeObj;
  } else {
    var setterList = storeObj.setterList,
        setterPrefix = storeObj.setterPrefix,
        toggleList = storeObj.toggleList,
        togglePrefix = storeObj.togglePrefix;
    delete storeObj['rich'];
    delete storeObj['setterList'];
    delete storeObj['setterPrefix'];
    delete storeObj['toggleList'];
    delete storeObj['togglePrefix'];

    var _createMutationsAndAc = createMutationsAndActions({
      setterList: setterList,
      setterPrefix: setterPrefix,
      toggleList: toggleList,
      togglePrefix: togglePrefix
    }),
        _createMutationsAndAc2 = _slicedToArray(_createMutationsAndAc, 2),
        mutations = _createMutationsAndAc2[0],
        actions = _createMutationsAndAc2[1];

    if (storeObj.actions) {
      storeObj.actions = _objectSpread2({}, storeObj.actions, {}, actions);
    } else {
      storeObj.actions = actions;
    }

    if (storeObj.mutations) {
      storeObj.mutations = _objectSpread2({}, storeObj.mutations, {}, mutations);
    } else {
      storeObj.mutations = mutations;
    }

    return storeObj;
  }
}

exports.createActions = createActions;
exports.createMutations = createMutations;
exports.createMutationsAndActions = createMutationsAndActions;
exports.default = vuexRichStore;
