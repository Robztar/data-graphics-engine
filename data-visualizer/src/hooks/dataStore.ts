import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { nanoid } from 'nanoid';

interface DataStates {
     dataset: any
     activeDataset: string
     addDataset: (n: string, t: string, d: any[]) => void
     setActiveDataset: (id: string) => void
     setData: (d: any[], id: string) => void
     setDataType: (t: string, id: string) => void
     setModifyDate: (d: Date, id: string) => void
     setThumbnail: (t: string, id: string) => void
     delDataset: (id: string) => void
}

const getOutfitData = (key:string) => localStorage.getItem(key);

export const dataStore = create<DataStates>()(
     persist(
          (set) => ({
               dataset: getOutfitData('dataset') || [], 
               activeDataset: '',

               addDataset: (name: string, type: string, inData: any[]) => {
                    set((state:any) => ({
                         dataset: [...state.dataset,
                              { 
                                   key: nanoid(),      // data field ID
                                   name: name,         // name of data
                                   type: type,         // type of data
                                   data: inData,       // the data
                                   dateCreated: new Date(),         // date created
                                   lastModified: new Date(),         // date last modified
                                   thumbnail: '',         // screenshot of the up to date project
                              },
                         ]
                    }))
               },
               setActiveDataset: (active) => {
                    set(() => ({ activeDataset : active }))
               },
               setData: (modData, id) =>{
                    set((state) =>({
                         dataset: state.dataset.map((set:any) =>
                              set.key === id
                                   ? ({...set, data: modData})
                                   : set
                         ),
                    }))
               },
               setDataType: (modDataType, id) =>{
                    set((state) =>({
                         dataset: state.dataset.map((set:any) =>
                              set.key === id
                                   ? ({...set, type: modDataType})
                                   : set
                         ),
                    }))
               },
               setModifyDate: (newDate, id) =>{
                    set((state) =>({
                         dataset: state.dataset.map((set:any) =>
                              set.key === id
                                   ? ({...set, lastModified: newDate})
                                   : set
                         ),
                    }))
               },
               setThumbnail: (newThumb, id) =>{
                    set((state) =>({
                         dataset: state.dataset.map((set:any) =>
                              set.key === id
                                   ? ({...set, thumbnail: newThumb})
                                   : set
                         ),
                    }))
               },
               delDataset: (id: string) => {
                    set((state) => ({
                         dataset: state.dataset.filter((set:any) => set.key !== id)
                    }));
               },
          }
          ),{ 
               name: 'dataset', 
               storage: createJSONStorage(() => localStorage),
          }
     )
);