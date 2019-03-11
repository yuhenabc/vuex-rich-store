import {
  capitalized,
  setterActionFactory,
  setterMutationFactory,
  toggleActionFactory,
  toggleMutationFactory,
} from './helpers'

export default function vuexRichStore(storeObj) {
  if (typeof storeObj !== 'object' || !storeObj['rich']) {
    return storeObj
  } else {
    let {
      setterList,
      setterPrefix,
      toggleList,
      togglePrefix
    } = storeObj
    delete storeObj['rich']
    delete storeObj['setterList']
    delete storeObj['setterPrefix']
    delete storeObj['toggleList']
    delete storeObj['togglePrefix']
    if (!storeObj.actions) {
      storeObj.actions = {}
    }
    if (!storeObj.mutations) {
      storeObj.mutations = {}
    }
    if (setterList) {
      if (!setterPrefix) {
        setterPrefix = 'set'
      }
      setterList.forEach(setterKey => {
        const setterName = setterPrefix + capitalized(setterKey)
        storeObj.actions[setterName] = setterActionFactory(setterName)
        storeObj.mutations[setterName] = setterMutationFactory(setterKey)
      })
    }
    if (toggleList) {
      if (!togglePrefix) {
        togglePrefix = 'toggle'
      }
      toggleList.forEach(toggleKey => {
        const toggleName = togglePrefix + capitalized(toggleKey)
        storeObj.actions[toggleName] = toggleActionFactory(toggleName)
        storeObj.mutations[toggleName] = toggleMutationFactory(toggleKey)
      })
    }
    return storeObj
  }
}
