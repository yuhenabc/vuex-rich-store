'use strict';

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

    if (!storeObj.actions) {
      storeObj.actions = {};
    }

    if (!storeObj.mutations) {
      storeObj.mutations = {};
    }

    if (setterList) {
      if (!setterPrefix) {
        setterPrefix = 'set';
      }

      setterList.forEach(function (setterKey) {
        var setterName = setterPrefix + capitalized(setterKey);
        storeObj.actions[setterName] = setterActionFactory(setterName);
        storeObj.mutations[setterName] = setterMutationFactory(setterKey);
      });
    }

    if (toggleList) {
      if (!togglePrefix) {
        togglePrefix = 'toggle';
      }

      toggleList.forEach(function (toggleKey) {
        var toggleName = togglePrefix + capitalized(toggleKey);
        storeObj.actions[toggleName] = toggleActionFactory(toggleName);
        storeObj.mutations[toggleName] = toggleMutationFactory(toggleKey);
      });
    }

    return storeObj;
  }
}

module.exports = vuexRichStore;
