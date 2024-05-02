import { useRef, useState, useEffect } from "react";
import * as d3 from "d3";

// --- Guides - Line Graphs & Area Graphs:
     // Line/Area - https://sharkcoder.com/data-visualization/d3-react
     // Line - https://www.youtube.com/playlist?list=PLdJuTVexUXU1CW9IduXFtS2vjQcDAOgz7
     // Area - https://www.youtube.com/playlist?list=PLdJuTVexUXU3pShDMI9kbRJ8QjfWCLcQ1

// const randItem = (d:any, setD:any) =>{
//      const ranData = {
//           date: new Date(Math.floor(Math.random()*20)),
//           fill: 'salmon'
//      }
//      console.log('Units: '+ ranData.value)
//      setD([...d, ranData])
// }
// const delLastItem = (d:any, setD:any) =>{
//      if (d.length === 0)
//           return
//      const sliced = d.slice(0, d.length-1)
//      console.log("Sliced Data is"+sliced)
//      setD(sliced)
// }

export const TestLine = () => {
     // const {data, dimensions} = props
     const svgRef = useRef<SVGSVGElement | null>(null)
     
     const [data, setData] = useState<{ date: Date; val: number }[]>([
          {date: new Date('2022-01-10'), val: 100},
          {date: new Date('2022-03-10'), val: 150},
          {date: new Date('2022-06-10'), val: 180},
          {date: new Date('2022-09-10'), val: 175},
          {date: new Date('2023-01-10'), val: 200},
          {date: new Date('2023-03-10'), val: 230},
          {date: new Date('2023-06-10'), val: 280},
          {date: new Date('2023-09-10'), val: 240},
     ])
     const dimensions = {
          height: 600, // div height in px
          width: 700, // div width in px
          cHeight: 550, // chart height in px
          cWidth: 680, // chart width in px
          margin: {
               top:30,
               bottom:20,
               left:30,
               right:20,
          }, // chart margins
     }
     const maxDataVal = d3.max(data, d=> d.val)
     console.log('Max is: '+maxDataVal)
     const xScale = d3.scaleTime()
          .range([0, dimensions.cWidth])
          .domain(d3.extent(data, d => d.date) as [Date, Date]);

     const yScale = d3.scaleLinear()
          .domain([0,maxDataVal!])
          .range([dimensions.cHeight,0])
          

     const xScal = d3.scaleBand()
          .domain(data.map((_, index:any)=>index))
          .range([0, dimensions.cWidth])

     const xAxis = d3.axisBottom(xScale)
          .ticks(d3.timeMonth.every(1))
          .tickFormat(d3.timeFormat('%b %y'))
     const yAxis = d3.axisLeft(yScale)

     
     useEffect(()=>{
          const svg = d3.select(svgRef.current)

          svg.append('g')
               .attr('class', 'x-axis')
               .attr('transform', `translate(${dimensions.margin.left + ','+ dimensions.cHeight})`)
               .call(xAxis)
          svg.append('g')
               .attr('class', 'y-axis')
               .attr('transform', `translate(${dimensions.margin.left},0)`)
               .call(yAxis)

          const line = d3.line()
               .x(d => xScale(d.date))
               .y(d => yScale(d.val))
          svg.append('path').datum(data)
               .attr('transform', `translate(${dimensions.margin.left + ',0'})`)
               .attr('fill', 'none')
               .attr('stroke', 'steelblue')
               .attr('stroke-width', 1)
               .attr('d', line)
     },[svgRef])

     useEffect(()=>{
          // d3.selectAll('.x-axis').remove()
          // d3.selectAll('.y-axis').remove()
     },[data])

     return (
          <div className='w-full h-full bg-red-200 flex flex-col justify-end'>
               {/* <button className="bg-blue-200"
                    onClick={()=>{
                         randItem(data, setData)
                    }}
               >Generate Random</button>
               <button className="bg-blue-200"
                    onClick={()=>{
                         delLastItem(data, setData)
                    }}
               >Remove Last Item</button> */}
               <svg
                    ref={svgRef}
                    height={dimensions.height}
                    width={dimensions.width}
                    overflow="visible"
                    className='w-full bg-green-200'
               ></svg>
          </div>
          
     )
}