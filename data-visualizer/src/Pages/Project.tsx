import { useState, useEffect } from 'react';
import * as d3 from "d3";

import { Nav } from "../components/Nav"

// import { uiStore } from "../hooks/uiStore"
// import { dataStore } from "../hooks/dataStore"

type BarProps = {
     data: number[],
     dimensions:{
          [key:string]:number
     }
}

// const Bars = ({...props}:any) => {
const Bars = (props:BarProps) => {
     const {data, dimensions} = props;
     const xScale = d3.scaleBand()
          .domain(data.map((numData:any, index:any)=>index))
          .range([0, dimensions.width])
     const yScale = d3.scaleLinear()
          .domain([0,1])
          .range([0,dimensions.height])

     return (
          <div className='w-full h-full bg-red-200'>
               <svg
                    // x={dimensions.marginLeft}
                    // y={dimensions.marginTop}
                    height={dimensions.height}
                    width={dimensions.width}
                    overflow="visible"
               >
                    {data.map((numData:any, index: any)=>(
                         <rect 
                              height={yScale(numData)}
                              width={xScale.bandwidth()}
                              x={xScale(index)}
                              y={dimensions.height - yScale(numData)}
                              stroke="teal"
                              fill="gold"
                         />
                    ))}
               </svg>
          </div>
          
     )
}

export const Project = () =>{
     // const {menu, colorScheme, switchMenu, setScheme} = uiStore();
     // const {dataSet, activeDataSet, addDataSet, setActiveDataSet, setModifyDate, setThumbnail, delDataSet} = dataStore();
     const dimensions = {
          height: 600,
          width:800,
     }
     const [count, setCount] = useState(0)
     const [data, setData] = useState<number[]>([])
     
     useEffect(()=>{
          const timer = setTimeout(()=> setCount(count+1), 1000)
          if(data.length < 100){
               data.push(Math.random())
          }else{
               const newData = data.splice(1,10)
               setData(newData)
          }
          return ()=>clearTimeout(timer)
     },[count, setCount])

     return(
          <div id="project-page" className="h-screen w-screen flex items-center p-2 pt-20">
               <Nav />
               <div className='w-full bg-red-200'>Project</div>
               <Bars
                    data={data}
                    dimensions={dimensions}
               />
          </div>
     )
}