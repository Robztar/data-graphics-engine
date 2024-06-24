import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom"

import { Nav } from "../components/Nav"

import { TestLine } from '../components/TestLine'
import { TestBar } from '../components/TestBar'
// import { NewBar } from '../components/NewBar'

// import { uiStore } from "../hooks/uiStore"
import { dataStore, chartStore } from "../hooks/dataStore"

import { LineGraph } from '../components/Charts/LineGraph'
import { BarChart } from '../components/Charts/BarChart'
import { ColumnChart } from '../components/Charts/ColumnChart'
import { PieChart } from '../components/Charts/PieChart'
import { RadarChart } from '../components/Charts/RadarChart'
import { ScatterPlot } from '../components/Charts/ScatterPlot'

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
               <ColumnChart unique={instance.key} />
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
               <RadarChart unique={instance.key} />
          )
     if(instance.type === 'scatter')
          return (
               <ScatterPlot unique={instance.key} />
          )
     if(instance.type === 'venn')
          return (
               <div>
                    {instance.type}, {instance.data}
               </div>
          )
     if(instance.type === 'pie')
          return (
               <PieChart unique={instance.key} />
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
     let chartHead = props.data.header
     let chartBody = props.data.values
     return(
          <div className='table-ish flex flex-col gap-1'>
               <div className="chart-head flex gap-2">
                    {chartHead.map((head:'string' , i: any) =>{
                         return(
                              <div key={i} className={`head-${i} w-32 text-center border-2 border-black`}>
                                   {head}
                              </div>
                         )
                    })}
               </div>

               <div className="chart-body flex-col flex gap-2">
                    {chartBody.map((record:any, inRow: any)=>{
                         return(
                              <div key={inRow} className={`chart-row-${inRow} flex gap-2`}>
                                   {record.map((d:any, inCol: any)=>{
                                        return(
                                             <div key={inCol} className={`chart-col-${inCol} w-32 text-center border border-black`}>
                                                  {d}
                                             </div>
                                        )
                                   })}
                              </div>
                         )

                    })}
               </div>
          </div>
     )
}

const DataDrivenOutput = (props:any) =>{
     const instance = props.chartInst
     const [chartOpts, setChartOpts] = useState(false)
     if(instance){
          let unique = instance.key
          
          const chartDS = instance.data
          let chartCols = chartDS.header.length
          let chartVals = chartDS.values
          let allChartOpts : string[] = []

          if(chartCols === 1)
               if(typeof(chartVals[0][0]) === 'number'){
                    allChartOpts.push('boxwhisker')
                    allChartOpts.push('bar')
                    allChartOpts.push('column')
                    allChartOpts.push('line')
                    allChartOpts.push('radar')
                    allChartOpts.push('scatter')
                    allChartOpts.push('venn')
               }
          if(chartCols > 1){
               let valsNum = true
               chartVals[0].forEach((v: any, i: number)=>{
                    if(i > 0)
                         if(typeof(v) !== 'number')
                              valsNum = false
               })

               if(valsNum){
                    allChartOpts.push('bar')
                    allChartOpts.push('column')
                    allChartOpts.push('line')
                    allChartOpts.push('radar')
                    allChartOpts.push('scatter')
               }
               if(chartCols < 5){
                    allChartOpts.push('venn')
                    if(valsNum){
                         if(chartCols === 2){
                              allChartOpts.push('pie')
                              allChartOpts.push('histogram')
                              allChartOpts.push('pictograph')
                              allChartOpts.push('pyramid')
                         }
                    }
               }
          }
          return(
               <div id="project-page" className="h-screen w-screen flex items-center p-2 pt-20">
                    <Nav />
                    {/* Chart-Table Nav */}
                    <div className='w-full h-full bg-purple-300 flex flex-col'>
                         <div className='bg-slate-200 w-full py-0.5 px-2 flex items-center justify-between'>
                              <input 
                                   name="text"
                                   className="h-10 text-2xl w-48 border-none bg-cyan-400 flex"
                                   defaultValue={instance.name}
                                   onChange={(e)=>{
                                        let chartName : string = e.target.value
                                        if(chartName.length === 0)
                                             chartName = instance.name
                                        props.setChartName(chartName, unique)
                                   }}
                              ></input>
                              <i className='far fa-edit fit-proj-edit'></i>
                              <div className='flex items-center justify-around gap-2'>
                                   <div className='proj-nav-btn delete'
                                        onClick={()=>{
                                             props.delChartset(unique)
                                             props.navigate('/')
                                        }}
                                   >
                                        <i className="fa-solid fa-trash"></i>
                                        <button>Delete</button>
                                   </div>
                                   <div className='proj-nav-btn'
                                        onClick={()=>{
                                             // setActive(false)
                                             props.navigate('/')
                                        }}
                                   >
                                        <i className="fa fa-times"></i>
                                        <button>Close</button>
                                   </div>
                              </div>
                         </div>
                         
                         <DataTable
                              data={instance.data}
                         />
                    </div>
                    {/* Chart Nav */}
                    <div className='w-full h-full bg-purple-300 flex flex-col'>
                         <div className='bg-slate-200 w-full py-0.5 px-2 flex items-center justify-end'>
                              <div className='proj-nav-btn'>
                                   <i className="fa-solid fa-sort"></i>
                                   <button>A</button>
                              </div>
                              <div className='proj-nav-btn'>
                                   <i className="fa-solid fa-chart-bar"></i>
                                   <button>B...</button>
                              </div>
                              {/* For the above:
                                   A - Sort (Ascending/Descending)
                                   B - Start Chart Numbering at 0 (Line/Bar)
                                   C - Area Chart (Line)
                                   D - Spline Chart (Line)
                                   E - Has field label / No label
                                   etc...
                               */}
                              <div className={`proj-nav-btn chart-mod ${chartOpts ? 'active':''}`}
                                   onClick={()=>{
                                        setChartOpts(!chartOpts)
                                   }}
                              >
                                   <i className="fa-solid fa-chart-bar"></i>
                                   <button>Change Chart</button>
                              </div>
                              <ul className={`chart-list ${chartOpts ? 'active':''}`}>
                                   {allChartOpts.map((opt) =>{
                                        if(opt === instance.type)
                                             return false
                                        
                                        let optLabel = ''
                                        if(opt === 'boxwhisker')
                                             optLabel= 'Box & Whisker'
                                        else if(opt === 'bar')
                                             optLabel= 'Bar Chart'
                                        else if(opt === 'column')
                                             optLabel= 'Column Chart'
                                        else if(opt === 'line')
                                             optLabel= 'Line Graph'
                                        else if(opt === 'radar')
                                             optLabel= 'Radar Chart'
                                        else if(opt === 'scatter')
                                             optLabel= 'Scatter Plot'
                                        else if(opt === 'venn')
                                             optLabel= 'Venn Diagram'
                                        else if(opt === 'pie')
                                             optLabel= 'Pie Chart'
                                        else if(opt === 'histogram')
                                             optLabel= 'Histogram'
                                        else if(opt === 'pictograph')
                                             optLabel= 'Pictograph'
                                        else if(opt === 'pyramid')
                                             optLabel= 'Pyramid Chart'
                                        return(
                                             <li className='chart-opt cursor-pointer'
                                                  onClick={()=>{
                                                       setChartOpts(false)
                                                       props.setChartType(opt, unique)
                                                  }}
                                             >
                                                  {optLabel}
                                             </li>
                                        )
                                        })}
                              </ul>
                         </div>
                         
                         <Visualizer
                              chartInst={instance}
                              dimensions={props.dimensions}
                         />
                    </div>
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
     const {chartset, setChartName, setChartDate, setChartType, delChartset} = chartStore()
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
               setChartName={setChartName}
               setChartType={setChartType}
               delChartset={delChartset}
               navigate={useNavigate()}
          />
     )
}