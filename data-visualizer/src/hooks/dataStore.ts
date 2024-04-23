import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { nanoid } from 'nanoid';

interface DataStates {
     dataSet: any
     activeDataSet: string
     addDataSet: (n: string) => void
     setActiveDataSet: (id: string) => void
     setModifyDate: (d: Date, id: string) => void
     setThumbnail: (t: string, id: string) => void
     delDataSet: (id: string) => void
}

const getOutfitData = (key:string) => localStorage.getItem(key);

export const dataStore = create<DataStates>()(
     persist(
          (set) => ({
               dataSet: getOutfitData('dataset') || [], 
               activeDataSet: '',

               addDataSet: (name: string) => {
                    set((state:any) => ({
                         dataSet: [...state.dataSet,
                              { 
                                   key: nanoid(),      // data field ID
                                   name: name,         // name of data
                                   dateCreated: new Date(),         // date created
                                   lastModified: new Date(),         // date last modified
                                   thumbnail: '',         // screenshot of the up to date project
                              },
                         ]
                    }))
               },
               setActiveDataSet: (active) => {
                    set(() => ({ activeDataSet : active }))
               },
               setModifyDate: (newDate, id) =>{
                    set((state) =>({
                         dataSet: state.dataSet.map((set:any) =>
                              set.key === id
                                   ? ({...set, lastModified: newDate})
                                   : set
                         ),
                    }))
               },
               setThumbnail: (newThumb, id) =>{
                    set((state) =>({
                         dataSet: state.dataSet.map((set:any) =>
                              set.key === id
                                   ? ({...set, thumbnail: newThumb})
                                   : set
                         ),
                    }))
               },
               delDataSet: (id: string) => {
                    set((state) => ({
                         dataSet: state.dataSet.filter((set:any) => set.key !== id)
                    }));
               },
          }
          ),{ 
               name: 'dataset', 
               storage: createJSONStorage(() => localStorage),
          }
     )
);