// import { useRef, useEffect } from "react"
// import * as d3 from "d3"

import { Chart as ChartJS, Defaults, registerables } from "chart.js"
import { Line } from "react-chartjs-2"

ChartJS.register(...registerables)


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
          dValues.forEach((vals)=>{
               vals.forEach((d:any,i:number)=>{
                    if(i === 0)
                         cLabels.push(d)
               })
          })
          let cDatasets : {label: any, data: any[]}[] = []
          dValues.forEach((vals, x)=>{
               vals.forEach((d:any,i:number)=>{
                    if(i > 0){
                         if(x === 0)
                              cDatasets.push({
                                   label: dHeaders[i],
                                   data: [d]
                              })
                         else
                              cDatasets[i-1].data.push(d)

                    }
               })
          })
          console.log('chart labels')
          console.log(cLabels)
          console.log('chart datasets')
          console.log(cDatasets)

          return (
               <div className='w-full h-full bg-red-200 flex flex-col justify-end'>
                    {/* <button className="bg-blue-200"
                         onClick={()=>{
                              delLastItem(data, setData, dataID)
                              setModifyDate(new Date(), dataID)
                         }}
                    >Remove Last Item</button> */}

                    {/* <div>LineGrpah is Up!</div> */}
                    <Line
                         data={{
                              labels: cLabels,
                              datasets: cDatasets
                         }}
                    />
                    {/* Cater for single-column data */}
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