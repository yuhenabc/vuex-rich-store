declare module 'vuex-rich-store' {
  interface Options {
    setterList?: string[]
    setterPrefix?: string
    toggleList?: string[]
    togglePrefix?: string
  }

  interface StoreObject {
    rich?: boolean
    setterList?: string[]
    setterPrefix?: string
    toggleList?: string[]
    togglePrefix?: string
    actions?: Record<string, Function>
    mutations?: Record<string, Function>
    [key: string]: any
  }

  export function createMutationsAndActions(options: Options): [Record<string, Function>, Record<string, Function>]

  export function createActions(options: Options): Record<string, Function>

  export function createMutations(options: Options): Record<string, Function>

  export default function vuexRichStore(storeObj: StoreObject): StoreObject
}
