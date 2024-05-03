import { useRef, useState, useEffect } from "react";
import * as d3 from "d3";

// Tutorial being used:
     // https://www.youtube.com/playlist?list=PLzCAqE_rafAc_2QWK8ii16m2ju4qhYAJT

const randItem = (d:any, setD:any) =>{
     const ranData = {
          name: 'aeiou',
          units: Math.floor(Math.random()*(40000 - 1000)+1000),
          fill: 'salmon'
     }
     console.log('Name: '+ranData.name+', Units: '+ ranData.units)
     setD([...d, ranData])
}
const delLastItem = (d:any, setD:any) =>{
     if (d.length === 0)
          return
     const sliced = d.slice(0, d.length-1)
     console.log("Sliced Data is"+sliced)
     setD(sliced)
}

type OldNewProps = {
     data: { name: string, units: number, fill: string }[],
     setData: any,
     dimensions:{
          [key:string]:number
     }
}

export const NewBar = (props: OldNewProps) => {
     const ref = useRef<SVGSVGElement | null>(null)
     const [sel, setSel] = useState<d3.Selection<SVGSVGElement | null, unknown, null, undefined> | null>(null)
     
     // const dimensions = {
     //      height: 600,
     //      width: 700,
     //      cHeight: 500,
     //      cWidth: 600,
     //      margin: 100,
     // }
     const dimensions = props.dimensions
     const chartDims = {
          height: dimensions.height - 100, // chart height in px
          width: dimensions.width - 100, // chart width in px
          margin: 100, // chart margins
     }
     // const [data,setData] = useState([
     //      {name: 'Afoo', units: 20000, fill: 'green'},
     //      {name: 'Efoo', units: 15000, fill: 'orange'},
     //      {name: 'Ifoo', units: 40000, fill: 'yellow'},
     //      {name: 'Ofoo', units: 6000, fill: 'purple'},
     //      {name: 'Ufoo', units: 12000, fill: 'grey'},
     // ])
     const data = props.data
     const setData = props.setData
     const maxDataVal = d3.max(data, d=> d.units)

     let yScale = d3.scaleLinear()
          .domain([0, maxDataVal!])
          .range([chartDims.height,0])
     let xScale = d3.scaleBand()
          .domain(data.map(d=>d.name))
          .range([0, chartDims.width])
          .paddingInner(0.1)
     const xAxis = d3.axisBottom(xScale)
     const yAxis = d3.axisLeft(yScale)
          .ticks(4)
          .tickFormat(d=> `${d} units`)
     useEffect(()=>{
          if(!sel)
               setSel(d3.select(ref.current))
          else{
               sel.append('g')
                    .attr('transform', `translate(${chartDims.margin +','+ chartDims.height})`)
                    .call(xAxis)
               sel.append('g')
                    .attr('transform', `translate(${chartDims.margin +', 0'})`)
                    .call(yAxis)

               sel.selectAll('rect')
                    .data(data)
                    .transition()
                    .duration(2000)
                    .attr('width', xScale.bandwidth)
                    .attr('height', d=> chartDims.height-yScale(d.units))
                    .attr('fill', d=>d.fill)
                    .attr('x', d => {
                         const x = xScale(d.name)
                         if (x)
                              return x
                         return null
                    })
                    .attr('y', d=> yScale(d.units))
               sel
                    .append('g')
                    .attr('transform', `translate(${chartDims.margin},0)`)
                    .selectAll('rect')
                    .data(data)
                    .enter()
                    .append('rect')
                    .attr('width', xScale.bandwidth)
                    .attr('height', d=> chartDims.height-yScale(d.units))
                    .attr('fill', d=>d.fill)
                    .attr('x', d => {
                         const x = xScale(d.name)
                         if (x)
                              return x
                         return null
                    })
                    .attr('y', d=> yScale(d.units))
          }
     },[sel])

     useEffect(()=>{
          if(sel){
               yScale = d3.scaleLinear()
                    .domain([0, maxDataVal!])
                    .range([chartDims.height,0])
               xScale = d3.scaleBand()
                    .domain(data.map(d=>d.name))
                    .range([0, chartDims.width])
                    .paddingInner(0.1)
               
               const rects = sel.selectAll('rect').data(data)

               // remove reference to missing data
               rects.exit().remove()

               // update existing chart
               rects
                    .attr('x', d => xScale(d.name)!)
                    .attr('y', d=> yScale(d.units))
                    .attr('width', xScale.bandwidth)
                    .attr('height', d=> chartDims.height-yScale(d.units))
                    .attr('fill', d=>d.fill)
                    
               
               // Update chart with new data
               rects
                    .enter()
                    .append('rect')
                    .attr('x', d => xScale(d.name)!)
                    .attr('y', d=> yScale(d.units))
                    .attr('width', xScale.bandwidth)
                    .attr('height', d=> chartDims.height-yScale(d.units))
                    .attr('fill', d=>d.fill)
                    
                    .attr('stroke','teal')
          }
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
                    ref={ref} 
                    className='w-full bg-white' 
                    width={dimensions.width} 
                    height={dimensions.height}
               />
          </div>
     )
}