import { useState, useEffect } from 'react';

import { Nav } from "../components/Nav"
import { TestBar } from '../components/TestBar';
import { NewBar } from '../components/NewBar';

// import { uiStore } from "../hooks/uiStore"
// import { dataStore } from "../hooks/dataStore"



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
               <div className='w-full bg-red-300'>Project</div>
               {/* <TestBar
                    data={data}
                    dimensions={dimensions}
               /> */}
               <NewBar />

          </div>
     )
}