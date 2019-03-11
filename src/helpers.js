function capitalized(word) {
  let str = word.toString()
  if (str.length > 0) {
    str = str[0].toUpperCase() + str.substr(1)
  }
  return str
}

function setterActionFactory(setterName) {
  return function ({commit}, payload) {
    commit(setterName, payload)
  }
}

function setterMutationFactory(setterKey) {
  return function (state, payload) {
    state[setterKey] = payload
  }
}

function toggleActionFactory(toggleName) {
  return function ({commit}, payload) {
    commit(toggleName, payload)
  }
}

function toggleMutationFactory(setterKey, keyType) {
  switch (keyType) {
    case 'number': // 0 or 1
      return function (state, payload) {
        state[setterKey] = typeof payload === 'number' ? payload : state[setterKey] === 0 ? 1 : 0
      }
    case 'boolean': // true or false
    default:
      return function (state, payload) {
        state[setterKey] = typeof payload === 'boolean' ? payload : !state[setterKey]
      }
  }
}

export {
  capitalized,
  setterActionFactory,
  setterMutationFactory,
  toggleActionFactory,
  toggleMutationFactory,
}
