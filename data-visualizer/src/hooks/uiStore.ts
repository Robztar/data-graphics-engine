import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface UIStates {
     menu: boolean
     colorScheme: boolean
     switchMenu: () => void
     setScheme: () => void
}
// Store for the web app's UI states
export const uiStore = create<UIStates>()(
     persist(
          (set) => ({
               menu: false,
               colorScheme: true,
               switchMenu: () => {
                    set((state) => ({menu: !state.menu }))
               },
               setScheme: () => {
                    set((state) => ({colorScheme: !state.colorScheme }))
               },
          }),{ name: 'uistate' }
     )
);