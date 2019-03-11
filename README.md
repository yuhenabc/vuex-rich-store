# vuex-rich-store

This is the "vuex rich store" you want!

### How to simplify vuex module?

**Brfore**

module file:

``` javascript
// store/modules/Welcome.js

export default {
  namespaced: true,
  state () {
    return {
      text: 'Welcome to Your Vue.js App',
      isShown: false
    }
  },
  actions: {
    setText ({commit}) {
      commit('setText')
    },
    toggleIsShown ({commit}) {
      commit('toggleIsShown')
    }
  },
  mutations: {
    setText (state, payload) {
      state.value = payload
    },
    toggleIsShown (state, payload) {
      state.isShown = typeof payload === 'boolean' ? payload : !state.isShown
    }
  }
}
```

and index file:

``` javascript
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

``` javascript
// store/modules/Welcome.js

export default {
  namespaced: true,
  rich: true,
  state () {
    return {
      text: 'Welcome to Your Vue.js App',
      isShown: false
    }
  },
  setterList: ['text'],
  toggleList: ['isShown']
}
```

and index file:

``` javascript
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