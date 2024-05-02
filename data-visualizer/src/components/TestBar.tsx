import { useRef, useState, useEffect } from "react";
import * as d3 from "d3";

type BarProps = {
     data: number[],
     dimensions:{
          [key:string]:number
     }
}

const randItem = (d:any, setD:any) =>{
     const ranData = {
          value: Math.floor(Math.random()*20),
          fill: 'salmon'
     }
     console.log('Units: '+ ranData.value)
     setD([...d, ranData])
}
const delLastItem = (d:any, setD:any) =>{
     if (d.length === 0)
          return
     const sliced = d.slice(0, d.length-1)
     console.log("Sliced Data is"+sliced)
     setD(sliced)
}

export const TestBar = (props:BarProps) => {
     // const {data, dimensions} = props
     const svgRef = useRef<SVGSVGElement | null>(null)
     
     const [data, setData] = useState([
          {value: 1, fill: 'green'},
          {value: 2, fill: 'orange'},
          {value: 3, fill: 'yellow'},
          {value: 4, fill: 'purple'},
          {value: 5, fill: 'red'},
          {value: 6, fill: 'teal'},
          {value: 7, fill: 'pink'},
          {value: 8, fill: 'green'},
          {value: 9, fill: 'orange'},
          {value: 7, fill: 'yellow'},
          {value: 8, fill: 'red'},
          {value: 10, fill: 'teal'},
          {value: 4, fill: 'pink'},
          {value: 1, fill: 'green'}
     ])
     const dimensions = {
          height: 600, // div height in px
          width: 700, // div width in px
          cHeight: 550, // chart height in px
          cWidth: 600, // chart width in px
          marginX: 100, // chart margin left
          marginY: 20, // chart margin top
     }
     const maxDataVal = d3.max(data, d=> d.value)
     console.log('Max is: '+maxDataVal)
     const xScale = d3.scaleBand()
          .domain(data.map((_, index:any)=>index))
          .range([0, dimensions.cWidth])

     const yScale = d3.scaleLinear()
          .domain([0, maxDataVal!])
          .range([dimensions.cHeight,0])

     const xAxis = d3.axisBottom(xScale)
     const yAxis = d3.axisLeft(yScale)
          // .ticks(5)
          .tickFormat(d=> `${d} units`)
     
     // const svgGroup = d3.select("svg")
     // svgGroup.append('g')
     //      .attr("class", "x-axis")
     //      .attr('transform', `translate(${dimensions.marginX +','+ (dimensions.cHeight + dimensions.marginY)})`)
     //      .call(xAxis)
     // svgGroup.append('g')
     //      .attr("class", "y-axis")     
     //      .attr('transform', `translate(${dimensions.marginX +','+ (dimensions.marginY)})`)
     //      .call(yAxis)
     
     useEffect(()=>{
          d3.selectAll('rect').data(data)
               .attr('height', 0)
               .attr('y', dimensions.cHeight)
               .transition()
               .duration(500)
               .delay((_,i)=>i*100)
               .ease(d3.easeBounce)
               .attr('height', d=> dimensions.cHeight-yScale(d.value))
               .attr('y', d=> yScale(d.value))
     },[svgRef])

     useEffect(()=>{
          d3.selectAll('.x-axis').remove()
          d3.selectAll('.y-axis').remove()

          const rects = d3.selectAll('rect').data(data)
          rects.transition()
               .duration(500)
               .attr('height', d=> dimensions.cHeight-yScale(d.value))
               .attr('y', d=> yScale(d.value))
               .attr('width', xScale.bandwidth)
               // .attr('x', d => xScale(d.index)!)

          rects.enter().append('rect')
               .attr('height', 0)
               .attr('y', dimensions.cHeight)
               .transition()
               .duration(500)
               .ease(d3.easeBounce)
               .attr('height', d=> dimensions.cHeight-yScale(d.value))
               .attr('y', d=> yScale(d.value))

          const svg = d3.select(svgRef.current)
          svg.append('g')
               .attr('class', 'x-axis')
               .attr('transform', `translate(${dimensions.marginX +','+ (dimensions.cHeight + dimensions.marginY)})`)
               .call(xAxis)
          svg.append('g')
               .attr('class', 'y-axis')
               .attr('transform', `translate(${dimensions.marginX +','+ (dimensions.marginY)})`)
               .call(yAxis)
     },[data])

     return (
          <div className='w-full h-full bg-red-200 flex flex-col justify-end'>
               <button className="bg-blue-200"
                    onClick={()=>{
                         randItem(data, setData)
                    }}
               >Generate Random</button>
               <button className="bg-blue-200"
                    onClick={()=>{
                         delLastItem(data, setData)
                    }}
               >Remove Last Item</button>
               <svg
                    ref={svgRef}
                    height={dimensions.height}
                    width={dimensions.width}
                    overflow="visible"
                    className='w-full bg-green-200'
               >
                    <g transform={`translate(${dimensions.marginX +','+ (dimensions.marginY)})`}>
                         {data.map((data:any, index: any)=>{
                              console.log(index +' : Num = '+ data.value)
                              return(
                                   <rect 
                                        key={index}
                                        height={(dimensions.cHeight) - yScale(data.value)}
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
}