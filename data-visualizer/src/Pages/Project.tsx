import { useState, useEffect } from 'react';

import { Nav } from "../components/Nav"
import { TestLine } from '../components/TestLine';
import { TestBar } from '../components/TestBar';
// import { NewBar } from '../components/NewBar';

// import { uiStore } from "../hooks/uiStore"
import { dataStore } from "../hooks/dataStore"

const Visualizer = (props:any) =>{
     const instance = props.dataInst
     if(instance.type === 'trend')
          return (
               <TestLine
                    dataInst={instance}
                    dimensions={props.dimensions}
               />
          )
     if(instance.type === 'items')
          return (
               <TestBar
                    dataInst={instance}
                    dimensions={props.dimensions}
               />
          )
     return null
}
const DataTable = (props:any) =>{
     if(props.dataType === 'trend')
          return (
               <div className='table-ish flex flex-col gap-1'>
                    <div className="head-field flex gap-2">
                         <div className="row-1">Date</div>
                         <div className="row-2">Value</div>
                    </div>
                    {props.data.map((data:any, index: any)=>{
                         const formatDate = data.date.toLocaleString("en-GB", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                         });
                         console.log('index: '+index+' date: '+formatDate)
                         return(
                              <div className={`field-${index} flex gap-2`} key={index}>
                                   <div className="row-1">{formatDate.toString()}</div>
                                   <div className="row-2">{data.val}</div>
                              </div>
                         )
                    })}
               </div>
          )
     if(props.dataType === 'items')
          return (
               <div className='table-ish flex flex-col gap-1'>
                    <div className="head-field flex gap-2">
                         <div className="row-1">Index</div>
                         <div className="row-2">Value</div>
                    </div>
                    {props.data.map((data:any, index: any)=>{
                         // console.log('index: '+index+' value: '+data.value)
                         return(
                              <div className={`field-${index} flex gap-2`} key={index}>
                                   <div className="row-1">{index}</div>
                                   <div className="row-2">{data.value}</div>
                              </div>
                         )
                    })}
               </div>
          )
     return null
}

const DataDrivenOutput = (props:any) =>{
     const instance = props.dataInst
     if(instance){
          return(
               <div id="project-page" className="h-screen w-screen flex items-center p-2 pt-20">
                    <Nav />
                    <div className='w-full h-full bg-purple-300 flex flex-col'>
                         <h2>Project</h2>
                         <DataTable 
                              dataType={instance.type}
                              data={instance.data}
                         />
                    </div>
                    <Visualizer
                         dataInst={instance}
                         dimensions={props.dimensions}
                    />
                    {/* <NewBar /> */}
               </div>
          )
     }else{
          return(
               <div id="project-page" className="h-screen w-screen flex items-center p-2 pt-20">
                    <Nav />
                    <div className='w-full h-full bg-purple-300 flex flex-col'>
                         <p>Sorry this data does not exist :(</p>
                    </div>
               </div>
          )
     }
}
export const Project = () =>{
     // const {menu, colorScheme, switchMenu, setScheme} = uiStore()
     const {dataset, setData, setThumbnail, delDataset} = dataStore()
     const dimensions = {
          height: 600,
          width: 700,
     }

     // Query String
     const [queryId, setQueryId] = useState('')

     useEffect(()=>{
          if(window.location.search){
               let qSearch = window.location.search.substring(1)
               let qParts = qSearch.split('=')
               // console.log("key = "+qParts[0]+" value = "+qParts[1])
               setQueryId(qParts[1])
          }
     },[queryId])

     let dataInst = dataset.find((d:any) => d.key === queryId)

     return(
          <DataDrivenOutput
               dataInst={dataInst}
               dimensions={dimensions}
          />
     )
}