import { Chart as ChartJS, Defaults, registerables } from "chart.js"
import { Bar } from "react-chartjs-2"

ChartJS.register(...registerables)

import { chartStore } from "../../hooks/dataStore"
import { setValOrder } from '../../functions/setValOrder'
// import { delDataRecord } from '../../functions/delDataRecord'

type BarProps = {
     unique: string
}

export const BarChart = (props:BarProps) => {
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
                    <Bar
                         data={{
                              labels: cLabels,
                              datasets: cDatasets
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