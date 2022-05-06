import {
  capitalized,
  setterActionFactory,
  setterMutationFactory,
  toggleActionFactory,
  toggleMutationFactory,
} from './helpers'

export function createMutationsAndActions(options) {
  const { setterList, setterPrefix, toggleList, togglePrefix } = options
  let actions = {}
  let mutations = {}
  const mySetterPrefix = setterPrefix ? setterPrefix : 'set'
  const myTogglePrefix = togglePrefix ? togglePrefix : 'toggle'
  if (setterList) {
    setterList.forEach((setterKey) => {
      const setterName = mySetterPrefix + capitalized(setterKey)
      actions[setterName] = setterActionFactory(setterName)
      mutations[setterName] = setterMutationFactory(setterKey)
    })
  }
  if (toggleList) {
    toggleList.forEach((toggleKey) => {
      const toggleName = myTogglePrefix + capitalized(toggleKey)
      actions[toggleName] = toggleActionFactory(toggleName)
      mutations[toggleName] = toggleMutationFactory(toggleKey)
    })
  }
  return [actions, mutations]
}

export function createActions(options) {
  const r = createMutationsAndActions(options)
  return r[0]
}

export function createMutations(options) {
  const r = createMutationsAndActions(options)
  return r[1]
}

export default function vuexRichStore(storeObj) {
  if (typeof storeObj !== 'object' || !storeObj['rich']) {
    return storeObj
  } else {
    let { setterList, setterPrefix, toggleList, togglePrefix } = storeObj
    delete storeObj['rich']
    delete storeObj['setterList']
    delete storeObj['setterPrefix']
    delete storeObj['toggleList']
    delete storeObj['togglePrefix']
    const [mutations, actions] = createMutationsAndActions({
      setterList,
      setterPrefix,
      toggleList,
      togglePrefix,
    })
    if (storeObj.actions) {
      storeObj.actions = {
        ...storeObj.actions,
        ...actions,
      }
    } else {
      storeObj.actions = actions
    }
    if (storeObj.mutations) {
      storeObj.mutations = {
        ...storeObj.mutations,
        ...mutations,
      }
    } else {
      storeObj.mutations = mutations
    }
    return storeObj
  }
}
