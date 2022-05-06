# vuex-rich-store

This is the "vuex rich store" you want!

### All usable functions

```js
import vuexRichStore, { createMutationsAndActions, createActions, createMutations } from 'vuex-rich-store'
```

| Functions                            | Effect                                   | Return                                 |
| ------------------------------------ | ---------------------------------------- | -------------------------------------- |
| `vuexRichStore(richModule)`          | turn a rich store module to be effective | a common store module                  |
| `createMutationsAndActions(options)` | create mutations and actions by options  | a array contains mutations and actions |
| `createActions(options)`             | create actions by options                | a array contains actions               |
| `createMutations(options)`           | create mutations by options              | a array contains mutations             |

### How to simplify vuex module?

#### way 1: use `vuexRichStore`

After using with `vuexRichStore`, your store module will have 5 more optional keys:

- `rich`: ( boolean ) a switch to on/off "vuexRichStore"

- `setterList`: ( array ) a list of keys to turn to setter mutations/actions

- `setterPrefix`: ( string ) the prefix of setter mutation/action, default is `"set"`

- `toggleList`: ( array ) a list of keys to turn to toggle mutations/actions

- `togglePrefix`: ( string ) the prefix of toggle mutation/action, default is `"toggle"`

Notice: the `rich` to be `true` is important if you want the rich store module to be effective!

**Brfore**

module file:

```js
// store/modules/welcome.js

export default {
  namespaced: true,
  state() {
    return {
      text: 'Welcome to Your Vue.js App',
      isShown: false,
    }
  },
  actions: {
    setText({ commit }, payload) {
      commit('setText', payload)
    },
    toggleIsShown({ commit }, payload) {
      commit('toggleIsShown', payload)
    },
  },
  mutations: {
    setText(state, payload) {
      state.value = payload
    },
    toggleIsShown(state, payload) {
      state.isShown = typeof payload === 'boolean' ? payload : !state.isShown
    },
  },
}
```

index file:

```js
// store/index.js

import welcome from './modules/welcome'

export default {
  ...
  modules: {
    ...
    welcome,
  },
  ...
}
```

**After**

module file:

```js
// store/modules/welcome.js

export default {
  namespaced: true,
  rich: true,
  state() {
    return {
      text: 'Welcome to Your Vue.js App',
      isShown: false,
    }
  },
  setterList: ['text'],
  toggleList: ['isShown'],
}
```

index file:

```js
// store/index.js

import vuexRichStore from 'vuex-rich-store'
import welcome from './modules/welcome'

export default {
  ...
  modules: {
    ...
    welcome: vuexRichStore(welcome),
  },
  ...
}
```

#### way 2: use `createMutationsAndActions` / `createActions` / `createMutations`

This way is mostly adapt to the format that `Nuxt.js`'s store modules use.

**options**

- `setterList`: ( array ) same as `vuexRichStore`'s `setterList`

- `setterPrefix`: ( string ) same as `vuexRichStore`'s `setterPrefix`

- `toggleList`: ( array ) same as `vuexRichStore`'s `toggleList`

- `togglePrefix`: ( string ) same as `vuexRichStore`'s `togglePrefix`

All keys is optional!

**Brfore**

module file:

```js
// store/modules/movies.js

export const state = () => ({
  list: [],
  pagination: {
    total: 1,
    current: 1,
    pageSize: 10,
  },
})

export const mutations = {
  setList(state, payload) {
    state.list = payload
  },
  setPagination(state, payload) {
    state.pagination = payload
  },
  reset(state) {
    Object.assign(state, state())
  },
}
```

**After**

module file:

```js
// store/modules/movies.js

import { createMutations } from 'vuex-rich-store'

export const state = () => ({
  list: [],
  pagination: {
    total: 1,
    current: 1,
    pageSize: 10,
  },
})

const options = {
  setterList: ['list', 'pagination'],
}

export const mutations = {
  ...createMutations(options),
  reset(state) {
    Object.assign(state, state())
  },
}
```
