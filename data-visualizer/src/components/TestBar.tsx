import * as d3 from "d3";

type BarProps = {
     data: number[],
     dimensions:{
          [key:string]:number
     }
}

// const Bars = ({...props}:any) => {
// export const TestBar = (props:BarProps) => {
//      const {data, dimensions} = props
//      const xScale = d3.scaleBand()
//           .domain(data.map((numData:any, index:any)=>index))
//           .range([0, dimensions.width])

//      const yScale = d3.scaleLinear()
//           .domain([0,1])
//           .range([0,dimensions.height])

//      return (
//           <div className='w-full h-full bg-red-200'>
//                <svg
//                     height={dimensions.height}
//                     width={dimensions.width}
//                     overflow="visible"
//                >
//                     {data.map((numData:any, index: any)=>(
//                          <rect 
//                               height={yScale(numData)}
//                               width={xScale.bandwidth()}
//                               x={xScale(index)}
//                               y={dimensions.height - yScale(numData)}
//                               stroke="teal"
//                               fill="gold"
//                          />
//                     ))}
//                </svg>
//           </div>
          
//      )
// }

export const TestBar = (props:BarProps) => {
     // const {data, dimensions} = props
     const data = [1,2,3,4,5,6,7,8,9,7,8,10,4,1]
     const dimensions = {
          height: 400, // 400px height in dom
          width: 700 // 400px width
     }
     const xScale = d3.scaleBand()
          .domain(data.map((numData:any, index:any)=>index))
          .range([0, dimensions.width])
     // domain: parse data to set number of columns
     // range: scale column widths based on number of columns and width given

     const yScale = d3.scaleLinear()
          .domain([0,1])
          .range([0, 40])
     // domain(0) is mapped to range(0) or height = 0px
     // domain(1) is mapped to range(40) or height = 40px
     // anything within the range, remains between 0 - 40px
     // anything outside the range, exceeds 40px

     return (
          <div className='w-full h-full bg-red-200 flex items-end'>
               <svg
                    height={dimensions.height}
                    width={dimensions.width}
                    overflow="visible"
                    className='w-full bg-green-200'
               >
                    {data.map((numData:any, index: any)=>{
                         console.log(index +' : Num = '+ numData)
                         return(
                         <rect 
                              height={yScale(numData)}
                              width={xScale.bandwidth()}
                              x={xScale(index)}
                              y={(dimensions.height) - yScale(numData)}
                              stroke="teal"
                              fill="gold"
                         />
                    )})}
               </svg>
          </div>
          
     )
}