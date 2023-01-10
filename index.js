'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _iterableToArrayLimit(arr, i) {
  var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"];
  if (null != _i) {
    var _s,
      _e,
      _x,
      _r,
      _arr = [],
      _n = !0,
      _d = !1;
    try {
      if (_x = (_i = _i.call(arr)).next, 0 === i) {
        if (Object(_i) !== _i) return;
        _n = !1;
      } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0);
    } catch (err) {
      _d = !0, _e = err;
    } finally {
      try {
        if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return;
      } finally {
        if (_d) throw _e;
      }
    }
    return _arr;
  }
}
function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {
      _defineProperty(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function _typeof(obj) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, _typeof(obj);
}
function _defineProperty(obj, key, value) {
  key = _toPropertyKey(key);
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
function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  return target;
}
function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};
  var target = _objectWithoutPropertiesLoose(source, excluded);
  var key, i;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }
  return target;
}
function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}
function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}
function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _toPrimitive(input, hint) {
  if (typeof input !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== undefined) {
    var res = prim.call(input, hint || "default");
    if (typeof res !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
function _toPropertyKey(arg) {
  var key = _toPrimitive(arg, "string");
  return typeof key === "symbol" ? key : String(key);
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

var _excluded = ["rich", "setterList", "setterPrefix", "toggleList", "togglePrefix"];
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
    var rich = storeObj.rich,
      setterList = storeObj.setterList,
      setterPrefix = storeObj.setterPrefix,
      toggleList = storeObj.toggleList,
      togglePrefix = storeObj.togglePrefix,
      others = _objectWithoutProperties(storeObj, _excluded);
    var _createMutationsAndAc = createMutationsAndActions({
        setterList: setterList,
        setterPrefix: setterPrefix,
        toggleList: toggleList,
        togglePrefix: togglePrefix
      }),
      _createMutationsAndAc2 = _slicedToArray(_createMutationsAndAc, 2),
      actions = _createMutationsAndAc2[0],
      mutations = _createMutationsAndAc2[1];
    if (others.actions) {
      others.actions = _objectSpread2(_objectSpread2({}, others.actions), actions);
    } else {
      others.actions = actions;
    }
    if (others.mutations) {
      others.mutations = _objectSpread2(_objectSpread2({}, others.mutations), mutations);
    } else {
      others.mutations = mutations;
    }
    return others;
  }
}

exports.createActions = createActions;
exports.createMutations = createMutations;
exports.createMutationsAndActions = createMutationsAndActions;
exports.default = vuexRichStore;
