import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { DataInputBox } from "./DataInputBox"

import { dataStore } from "../hooks/dataStore"




export const Query = () =>{
     const [active, setActive] = useState(false)
     const [goToNewProj, setNewProj] = useState(false)
     const [dataEntry, setDataEntry] = useState<{ entry: string; entryData: any[] | string }>({ entry: 'raw', entryData: []})
     const navigate = useNavigate()

     const {dataset, addDataset} = dataStore()
     const starterDataTrend = [
          {date: new Date('2022-01-10'), val: 100},
          {date: new Date('2022-04-10'), val: 150},
          {date: new Date('2022-07-10'), val: 180},
          {date: new Date('2022-10-10'), val: 175},
          {date: new Date('2023-01-10'), val: 200},
          {date: new Date('2023-04-10'), val: 230},
          {date: new Date('2023-07-10'), val: 280},
          {date: new Date('2023-10-10'), val: 240},
     ]
     const starterDataItems = [ {value: 1, fill: 'green'},
          {value: 2, fill: 'orange'},
          {value: 3, fill: 'yellow'},
          {value: 4, fill: 'purple'},
          {value: 5, fill: 'red'},
          {value: 6, fill: 'teal'},
          {value: 7, fill: 'pink'},
          {value: 8, fill: 'green'},
          {value: 9, fill: 'orange'} 
     ]

     if(goToNewProj){
          if(dataset !== null){
               const lastData = dataset.length-1
               const dataKey = dataset[lastData].key
               console.log('Zustand Last Data is: ' + dataKey) 
               navigate(`/proj?id=${dataKey}`)
          }
          setNewProj(false)
     }else{
          console.log('Not true')
     }
     return(
          <div className='flex'>
               {/* Create Button */}
               <div className="query-btn-cont w-fit bg-cyan-400 rounded-3xl flex items-center justify-center cursor-pointer px-4 py-2 gap-4"
                    onClick={()=>{
                         setActive(true)
                    }}
               >
                    <i className="fa fa-plus-circle"></i>
                    <p>Create Chart/Graph Btn</p>
               </div>

               {/* Create Wizard */}
               <div className={`
                    query-float-cont ${active? 'h-full w-full active':'h-0 w-0'} 
                    absolute top-0 left-0`
               }>
                    {/* Blur Overlay */}
                    <div className="float-bg-blur h-full w-full bg-slate-800 bg-opacity-60 backdrop-blur-sm"
                         onClick={()=>setActive(false)}
                    ></div>
                    {/* Wizard Body */}
                    <div className={`
                              query-float-body ${active? 'h-3/4 w-3/4 p-2 active':'h-0 w-0'} 
                              absolute bg-white rounded-3xl flex flex-col items-center justify-start gap-4`
                         }
                    >
                         {/* Wizard Head */}
                         <div className="w-full px-2 flex items-center justify-between border-b-red-200 border-b-2">
                              <h1 className={`${active? 'h-10 text-2xl':'h-0 w-0'}`}> Create New Viz</h1>
                              <i className="fa fa-times-circle-o text-3xl cursor-pointer"
                                   onClick={()=>{
                                        setActive(false)
                                   }}
                              ></i>
                         </div>
                         
                         {/* Wizard I/O */}
                         <div className="w-3/4 h-full px-6 flex flex-col items-center justify-center gap-1">
                              <label className="pl-8">Dataset Name:</label>
                              <input 
                                   id='create-dataset-name'
                                   className="w-1/2 px-1 rounded-md border-2 border-teal-500"
                                   type='text'
                                   defaultValue={'untitled '+(dataset.length+1)}
                              />
                              <hr className="bg-green-500 h-0.5 w-full mt-4" />
                              
                              {/* Data Entry Type */}
                              <div className="w-full flex items-center justify-around">
                                   <button
                                        className={`${dataEntry.entry === 'raw' || dataEntry.entry === ''
                                             ? 'bg-cyan-500':''}`}
                                        onClick={()=> setDataEntry({entry: 'raw', entryData:[]})}
                                   >Enter Raw Data</button>
                                   <button
                                        className={`${dataEntry.entry === 'defLine'?'bg-cyan-500':''}`}
                                        onClick={()=>setDataEntry(({entry: 'defLine', entryData: starterDataTrend}))}
                                   >Generate Line Graph</button>
                                   <button
                                        className={`${dataEntry.entry === 'defBar'?'bg-cyan-500':''}`}
                                        onClick={()=>setDataEntry(({entry: 'defBar', entryData: starterDataItems}))}
                                   >Generate Bar Graph</button>
                                   <button
                                        className={`${dataEntry.entry === 'file'?'bg-cyan-500':''}`}
                                        onClick={()=> setDataEntry({entry: 'file', entryData:[]})}
                                   >Add File</button>
                                   <button
                                        onClick={()=>{
                                             let name : string
                                             name = (document.getElementById('create-dataset-name') as HTMLInputElement).value
                                             if(name.length === 0){
                                                  name = 'untitled '+(dataset.length+1)
                                             }
                                             addDataset(name,'survey', [])
                                             setActive(false)
                                             navigate("/survey")
                                        }}
                                   >Create Survey</button>
                              </div>
                              <hr className="bg-red-500 h-0.5 w-full mb-4" />

                              {/* Data Entry Box */}
                              <DataInputBox
                                   dataEntry={dataEntry}
                                   setDataEntry={setDataEntry}
                              />
                              
                              <button 
                                   className={`${dataEntry.entry === 'file'? 'inactive':'rounded-lg px-2 py-0.5 border-2 border-teal-500'}`} 
                                   onClick={()=>{
                                        let name : string
                                        name = (document.getElementById('create-dataset-name') as HTMLInputElement).value
                                        if(name.length === 0){
                                             name = 'untitled '+(dataset.length+1)
                                        }

                                        if(dataEntry.entry === 'raw' || dataEntry.entry === ''){
                                             let rawData = (document.getElementById('create-dataset-data') as HTMLInputElement).value
                                             // pData : any[] = processyMagic(rawData)
                                             // pDataType : string = typingMagic(pData)
                                             // addDataset(name, pDataType, pData)
                                             // setNewProj(true)
                                             // setActive(false)
                                        }else if(dataEntry.entry === 'defLine'){
                                             addDataset(name,'trend', dataEntry.entryData as any[])
                                             setNewProj(true)
                                             setActive(false)
                                        }else if(dataEntry.entry === 'defBar'){
                                             addDataset(name,'items', dataEntry.entryData as any[])
                                             setNewProj(true)
                                             setActive(false)
                                        }
                                        // setNewProj(true)
                                        // setActive(false)
                                   }}
                              >{dataEntry.entry === 'file'? '':'Enter'}</button>
                         </div>
                    </div>
                    
               </div>
               
          </div>
     )
}