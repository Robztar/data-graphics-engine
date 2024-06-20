import { useState, useEffect } from 'react'

import { Nav } from "../components/Nav"
import { LineGraph } from '../components/Charts/LineGraph'
import { BarChart } from '../components/Charts/BarChart'

import { TestLine } from '../components/TestLine'
import { TestBar } from '../components/TestBar'
// import { NewBar } from '../components/NewBar'

// import { uiStore } from "../hooks/uiStore"
import { dataStore, chartStore } from "../hooks/dataStore"

const Visualizer = (props:any) =>{
     const instance = props.chartInst
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

     if(instance.type === 'boxwhisker')
          return (
               <div>
                    {instance.type}, {instance.data}
               </div>
          )
     if(instance.type === 'bar')
          return (
               <div>
                    <BarChart unique={instance.key} />
               </div>
          )
     if(instance.type === 'column')
          return (
               <div>
                    {instance.type}, {instance.data}
               </div>
          )
     if(instance.type === 'line'){
          console.log('Sucessful Sub')
          console.log(instance.type)
          console.log(instance.data)
          return (
               <LineGraph
                    unique={instance.key}
                    dimensions={props.dimensions}
               />
          )
     }
     if(instance.type === 'radar')
          return (
               <div>
                    {instance.type}, {instance.data}
               </div>
          )
     if(instance.type === 'scatter')
          return (
               <div>
                    {instance.type}, {instance.data}
               </div>
          )
     if(instance.type === 'venn')
          return (
               <div>
                    {instance.type}, {instance.data}
               </div>
          )
     if(instance.type === 'pie')
          return (
               <div>
                    {instance.type}, {instance.data}
               </div>
          )
     if(instance.type === 'histogram')
          return (
               <div>
                    {instance.type}, {instance.data}
               </div>
          )
     if(instance.type === 'pictograph')
          return (
               <div>
                    {instance.type}, {instance.data}
               </div>
          )
     if(instance.type === 'pyramid')
          return (
               <div>
                    {instance.type}, {instance.data}
               </div>
          )
     return null
}
const DataTable = (props:any) =>{
     const datasetType = props.dataType
     if(datasetType === 'trend')
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
     if(datasetType === 'items')
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
     if(datasetType === 'boxwhisker')
          return (
               <div className='table-ish flex flex-col gap-1'>
                    {datasetType}
               </div>
          )
     if(datasetType === 'bar')
          return (
               <div className='table-ish flex flex-col gap-1'>
                    {datasetType}
               </div>
          )
     if(datasetType === 'column')
          return (
               <div className='table-ish flex flex-col gap-1'>
                    {datasetType}
               </div>
          )
     if(datasetType === 'line')
          return (
               <div className='table-ish flex flex-col gap-1'>
                    {datasetType}
                    {/* <div className="head-field flex gap-2">
                         <div className="row-1">Index</div>
                         <div className="row-2">Value</div>
                    </div> */}
                    {/* {props.data.map((data:any, index: any)=>{
                         // console.log('index: '+index+' value: '+data.value)
                         return(
                              <div className={`field-${index} flex gap-2`} key={index}>
                                   <div className="row-1">{index}</div>
                                   <div className="row-2">{data.value}</div>
                              </div>
                         )
                    })} */}
               </div>
          )
     if(datasetType === 'radar')
          return (
               <div className='table-ish flex flex-col gap-1'>
                    {datasetType}
               </div>
          )
     if(datasetType === 'scatter')
          return (
               <div className='table-ish flex flex-col gap-1'>
                    {datasetType}
               </div>
          )
     if(datasetType === 'venn')
          return (
               <div className='table-ish flex flex-col gap-1'>
                    {datasetType}
               </div>
          )
     if(datasetType === 'pie')
          return (
               <div className='table-ish flex flex-col gap-1'>
                    {datasetType}
               </div>
          )
     if(datasetType === 'histogram')
          return (
               <div className='table-ish flex flex-col gap-1'>
                    {datasetType}
               </div>
          )
     if(datasetType === 'pictograph')
          return (
               <div className='table-ish flex flex-col gap-1'>
                    {datasetType}
               </div>
          )
     if(datasetType === 'pyramid')
          return (
               <div className='table-ish flex flex-col gap-1'>
                    {datasetType}
               </div>
          )
     return null
}

const DataDrivenOutput = (props:any) =>{
     const instance = props.chartInst
     if(instance){
          return(
               <div id="project-page" className="h-screen w-screen flex items-center p-2 pt-20">
                    <Nav />
                    <div className='w-full h-full bg-purple-300 flex flex-col'>
                         <h2>{instance.name}</h2>
                         <DataTable 
                              dataType={instance.type}
                              data={instance.data}
                         />
                    </div>
                    <Visualizer
                         chartInst={instance}
                         dimensions={props.dimensions}
                    />
                    {/* <NewBar /> */}
               </div>
          )
     }else{
          return(
               <div id="project-page" className="h-screen w-screen flex items-center p-2 pt-20">
                    <Nav />
                    <div className='w-full h-full bg-red-300 flex flex-col'>
                         <p>Sorry this data does not exist :(</p>
                    </div>
               </div>
          )
     }
}
export const Project = () =>{
     // const {menu, colorScheme, switchMenu, setScheme} = uiStore()
     // const {dataset, setData, setThumbnail, delDataset} = dataStore()
     const {chartset, delChartset} = chartStore()
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

     let chartInst = chartset.find((d:any) => d.key === queryId)
     console.log('chartInst')
     console.log(chartset)
     if(chartset !== null){
          const lastData = chartset.length-1
          const dataKey = chartset[lastData].key
          console.log('Zustand Last Data is: ' + dataKey)
     }

     return(
          <DataDrivenOutput
               chartInst={chartInst}
               dimensions={dimensions}
          />
     )
}