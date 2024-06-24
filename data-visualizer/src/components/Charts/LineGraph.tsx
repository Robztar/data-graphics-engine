// import { useRef, useEffect } from "react"
// import * as d3 from "d3"

import { Chart as ChartJS, defaults, registerables } from "chart.js"
import { Line } from "react-chartjs-2"

ChartJS.register(...registerables)
defaults.maintainAspectRatio = false
defaults.responsive = true


import { chartStore } from "../../hooks/dataStore"
import { setValOrder } from '../../functions/setValOrder'
// import { delDataRecord } from '../../functions/delDataRecord'

// --- Guides - Line Graphs & Area Graphs:
     // Line/Area - https://sharkcoder.com/data-visualization/d3-react
     // Line - https://www.youtube.com/playlist?list=PLdJuTVexUXU1CW9IduXFtS2vjQcDAOgz7
     // Area - https://www.youtube.com/playlist?list=PLdJuTVexUXU3pShDMI9kbRJ8QjfWCLcQ1

type LineProps = {
     unique: string,
     dimensions:{
          [key:string]:number
     }
}

export const LineGraph = (props:LineProps) => {
     // const {chartset, setData, setModifyDate} = chartStore()
     const {chartset} = chartStore()

     // const dimensions = props.dimensions
     // const chartDims = {
     //      height: dimensions.height - 50, // chart height in px
     //      width: dimensions.width - 20, // chart width in px
     //      margin: {
     //           top:30,
     //           bottom:20,
     //           left:30,
     //           right:20,
     //      }, // chart margins
     // }
     const chartInst = chartset.find((d:any) => d.key === props.unique)
     
     
     if(chartInst){
          let dataID = chartInst.key
          let dHeaders: string[] = chartInst.data.header
          let dValues: any[] = chartInst.data.values
          dValues = setValOrder(dValues)
          console.log('Sorted Values')
          console.log(dValues)

          let cLabels: any[] = []
          dValues.forEach((vals, row)=>{
               vals.forEach((d:any,i:number)=>{
                    if(i === 0 && vals.length > 1)
                         cLabels.push(d)
               })
               if (vals.length === 1)
                    cLabels.push(row)
          })
          // Modify list to be longer
          const colorArr = ['rgba(255, 0, 0, 0.3)',
               'rgba(0, 128, 0, 0.3)', 
               'rgba(0, 0, 255, 0.3)', 
               'rgba(255, 166, 0, 0.3)', 
               'rgba(0, 255, 255, 0.3)', 
               'rgba(255, 192, 203, 0.3)', 
               'rgba(255, 255, 0, 0.3)', 
               'rgba(0, 128, 128, 0.3)', 
               'rgba(128, 0, 128, 0.3)', 
               'rgba(153, 205, 50, 0.3)']
          let cDatasets : {label: any, data: any[], 
               borderColor: string, backgroundColor: string, fill: any}[] = []

          dValues.forEach((vals, x)=>{
               vals.forEach((d:any,i:number)=>{
                    if(i > 0 || vals.length === 1){
                         if(x === 0){
                              // Checks for index to match with color
                              let colIndex : number
                              if(vals.length === 1)
                                   colIndex = i
                              else
                                   colIndex= i-1
                              // Current color list is 10 items
                              colIndex = colIndex % 10
                              cDatasets.push({
                                   label: dHeaders[i],
                                   data: [d],
                                   borderColor: colorArr[colIndex],
                                   backgroundColor: colorArr[colIndex],
                                   fill: 'origin'
                              })
                         }
                         else{
                              if(vals.length === 1)
                                   cDatasets[i].data.push(d)
                              else 
                                   cDatasets[i-1].data.push(d)
                         }
                    }
               })
          })
          console.log('chart labels')
          console.log(cLabels)
          console.log('chart datasets')
          console.log(cDatasets)

          return (
               <div className='chart-cont bg-red-200 flex flex-col justify-end'>
                    {/* <button className="bg-blue-200"
                         onClick={()=>{
                              delLastItem(data, setData, dataID)
                              setModifyDate(new Date(), dataID)
                         }}
                    >Remove Last Item</button> */}

                    {/* Make the color list separate file */}
                    <Line
                         data={{
                              labels: cLabels,
                              datasets: cDatasets
                         }}
                         options={{ 
                              elements:{
                                   line:{
                                        // Spline Setting
                                        tension: 0.5,
                                   },
                              },
                              scales: {
                                   y: {
                                        // Start graph at 0
                                        beginAtZero: true,
                                        
                                        // Set start value, max value, and step size
                                        // min: 100,
                                        // max: 700,
                                        // ticks: {
                                        //      stepSize: 50,
                                        // },
                                   },
                              },
                         }}
                    />
                    {/* Sort ordered labels (numbers, dates, first,second, etc.) */}
                    {/* - Chart.js Info */}
                    {/* https://www.youtube.com/watch?v=6q5d3Z1-5kQ */}
                    {/* https://www.chartjs.org/ */}
                    {/* https://react-chartjs-2.js.org/ */}
               </div>
          )
     }else{
          return (
               <div className='w-full h-full bg-red-200 flex flex-col justify-end'>
                    No data is being rendered
               </div>
               
          )
     }
}