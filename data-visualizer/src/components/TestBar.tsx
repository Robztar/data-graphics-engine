import { useRef, useEffect } from "react";
import * as d3 from "d3";

import { dataStore } from "../hooks/dataStore"

type BarProps = {
     dataInst: any,
     dimensions:{
          [key:string]:number
     }
}

const randItem = (d:any, setD:any, id:string) =>{
     const ranData = {
          value: Math.floor(Math.random()*20),
          fill: 'salmon'
     }
     console.log('Units: '+ ranData.value)
     setD([...d, ranData], id)
}
const delLastItem = (d:any, setD:any, id:string) =>{
     if (d.length === 0)
          return
     const sliced = d.slice(0, d.length-1)
     // console.log("Sliced Data is"+sliced)
     setD(sliced, id)
}

// ---- Change BarProps
export const TestBar = (props:BarProps) => {
     const {dataset, setData, setModifyDate} = dataStore()
     const svgRef = useRef<SVGSVGElement | null>(null)
     
     const dimensions = props.dimensions
     const chartDims = {
          height: dimensions.height - 50, // chart height in px
          width: dimensions.width - 100, // chart width in px
          margin: {
               top:20,
               bottom:20,
               left:100,
               right:20,
          }, // chart margins
     }

     const dataInst = dataset.find((d:any) => d.key === props.dataInst.key)
     if(dataInst){
          let dataID = dataInst.key
          let data = dataInst.data as { value: number, fill: string }[]

          const maxDataVal = d3.max(data, d=> d.value)
          console.log('Max is: '+maxDataVal)
          const xScale = d3.scaleBand()
               .domain(data.map((_, index:any)=>index))
               .range([0, chartDims.width])

          const yScale = d3.scaleLinear()
               .domain([0, maxDataVal!])
               .range([chartDims.height,0])

          const xAxis = d3.axisBottom(xScale)
          const yAxis = d3.axisLeft(yScale)
               // .ticks(5)
               .tickFormat(d=> `${d} units`)
          
          useEffect(()=>{
               d3.selectAll('rect').data(data)
                    .attr('height', 0)
                    .attr('y', chartDims.height)
                    .transition()
                    .duration(500)
                    .delay((_,i)=>i*100)
                    .ease(d3.easeBounce)
                    .attr('height', d=> chartDims.height-yScale(d.value))
                    .attr('y', d=> yScale(d.value))
          },[svgRef])

          useEffect(()=>{
               d3.selectAll('.x-axis').remove()
               d3.selectAll('.y-axis').remove()

               const rects = d3.selectAll('rect').data(data)
               rects.transition()
                    .duration(500)
                    .attr('height', d=> chartDims.height-yScale(d.value))
                    .attr('y', d=> yScale(d.value))
                    .attr('width', xScale.bandwidth)
                    // .attr('x', d => xScale(d.index)!)

               rects.enter().append('rect')
                    .attr('height', 0)
                    .attr('y', chartDims.height)
                    .transition()
                    .duration(500)
                    .ease(d3.easeBounce)
                    .attr('height', d=> chartDims.height-yScale(d.value))
                    .attr('y', d=> yScale(d.value))

               const svg = d3.select(svgRef.current)
               svg.append('g')
                    .attr('class', 'x-axis')
                    .attr('transform', `translate(${chartDims.margin.left +','+ (chartDims.height + chartDims.margin.top)})`)
                    .call(xAxis)
               svg.append('g')
                    .attr('class', 'y-axis')
                    .attr('transform', `translate(${chartDims.margin.left +','+ (chartDims.margin.top)})`)
                    .call(yAxis)
          },[data])

          return (
               <div className='w-full h-full bg-red-200 flex flex-col justify-end'>
                    <button className="bg-blue-200"
                         onClick={()=>{
                              randItem(data, setData, dataID)
                              setModifyDate(new Date(), dataID)
                         }}
                    >Generate Random</button>
                    <button className="bg-blue-200"
                         onClick={()=>{
                              delLastItem(data, setData, dataID)
                              setModifyDate(new Date(), dataID)
                         }}
                    >Remove Last Item</button>
                    <svg
                         ref={svgRef}
                         height={dimensions.height}
                         width={dimensions.width}
                         overflow="visible"
                         className='w-full bg-green-200'
                    >
                         <g transform={`translate(${chartDims.margin.left +','+ (chartDims.margin.top)})`}>
                              {data.map((data:any, index: any)=>{
                                   // console.log(index +' : Num = '+ data.value)
                                   return(
                                        <rect 
                                             key={index}
                                             height={(chartDims.height) - yScale(data.value)}
                                             width={xScale.bandwidth()}
                                             x={xScale(index)}
                                             y={yScale(data.value)}
                                             stroke="white"
                                             fill={data.fill}
                                        />
                                   )
                              })}
                         </g>
                    </svg>
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