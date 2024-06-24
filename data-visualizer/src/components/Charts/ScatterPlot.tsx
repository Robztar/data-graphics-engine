import { Chart as ChartJS, defaults, registerables } from "chart.js"
import { Bubble, Scatter } from "react-chartjs-2"

ChartJS.register(...registerables)
defaults.maintainAspectRatio = false
defaults.responsive = true

import { chartStore } from "../../hooks/dataStore"
import { setValOrder } from '../../functions/setValOrder'
// import { delDataRecord } from '../../functions/delDataRecord'

type ScatterProps = {
     unique: string
}

export const ScatterPlot = (props:ScatterProps) => {
     // const {chartset, setData, setModifyDate} = chartStore()
     const {chartset} = chartStore()

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
               <div className='chart-cont flex flex-col justify-end'>
                    {/* 'Scatter' is separate 'Bubble' chart */}
                    {/* <Scatter
                         data={{
                              labels: cLabels,
                              datasets: cDatasets
                         }}
                         options={{ 
                              scales: {
                                   y: {
                                        // Start graph at 0
                                        beginAtZero: true,
                                   },
                              },
                         }}
                    /> */}
                    <Bubble
                         data={{
                              labels: cLabels,
                              datasets: cDatasets
                         }}
                         options={{ 
                              scales: {
                                   y: {
                                        // Start graph at 0
                                        beginAtZero: true,
                                   },
                              },
                         }}
                    />
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