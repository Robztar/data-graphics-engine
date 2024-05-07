import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { dataStore } from "../hooks/dataStore"

export const Query = () =>{
     const [active, setActive] = useState(false)
     const [goToNewProj, setNewProj] = useState(false)
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
                    <div className="float-bg-blur h-full w-full bg-slate-800 bg-opacity-60 backdrop-blur-sm"
                         onClick={()=>{
                              setActive(false)
                         }}
                    ></div>
                    {/* Wizard Body */}
                    <div className={`
                              query-float-body ${active? 'h-3/4 w-3/4 p-2 active':'h-0 w-0'} 
                              absolute bg-white rounded-3xl flex flex-col items-center justify-start gap-4`
                         }
                    >
                         {/* Wizard Head */}
                         <div className="w-full px-2 flex items-center border-b-red-200 border-b-2">
                              <h1 className={`${active? 'h-10 w-full text-2xl':'h-0 w-0'}
                                   text-right rounded-lg bg-yellow-50
                              `}> Create New Viz</h1>
                              <i className="fa fa-times-circle-o text-3xl cursor-pointer"
                                   onClick={()=>{
                                        setActive(false)
                                   }}
                              ></i>
                         </div>
                         
                         {/* Wizard I/O */}
                         <div className="w-full flex items-center justify-center gap-1">
                              <input className="rounded-l-lg border-2 border-teal-500" type="text" placeholder="Enter Data Here" />
                              <button 
                                   className="rounded-r-lg rounded-l-none border-2 border-teal-500" 
                                   onClick={()=>{
                                        addDataset('2 dataset','trend', starterDataTrend)
                                        setNewProj(true)
                                        setActive(false)
                                   }}
                              >Enter</button>
                         </div>
                         <div className='flex gap-2'>
                              <button
                                   onClick={()=>{
                                        addDataset('Line dataset','trend', starterDataTrend)
                                        setNewProj(true)
                                        setActive(false)
                                   }}
                              >Trend Data</button>
                              <button
                                   onClick={()=>{
                                        addDataset('Bar dataset','items', starterDataItems)
                                        setNewProj(true)
                                        setActive(false)
                                   }}
                              >Items Relational Data</button>
                         </div>
                         <button
                              onClick={()=>{
                                   setActive(false)
                                   navigate("/survey")
                              }}
                         >Create Survey</button>
                    </div>
                    
               </div>
               
          </div>
     )
}