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
    const { rich, setterList, setterPrefix, toggleList, togglePrefix, ...others } = storeObj
    const [actions, mutations] = createMutationsAndActions({
      setterList,
      setterPrefix,
      toggleList,
      togglePrefix,
    })
    if (others.actions) {
      others.actions = {
        ...others.actions,
        ...actions,
      }
    } else {
      others.actions = actions
    }
    if (others.mutations) {
      others.mutations = {
        ...others.mutations,
        ...mutations,
      }
    } else {
      others.mutations = mutations
    }
    return others
  }
}
