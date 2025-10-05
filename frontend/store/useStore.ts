import create from 'zustand'
type State = { history: string[]; push: (s:string)=>void }
export const useStore = create<State>(set=>({ history:[], push:(s)=>set(state=>({ history: [s,...state.history].slice(0,50) })) }))
