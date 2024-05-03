import { useState, useEffect } from 'react';

import { Nav } from "../components/Nav"
import { TestLine } from '../components/TestLine';
import { TestBar } from '../components/TestBar';
import { NewBar } from '../components/NewBar';

// import { uiStore } from "../hooks/uiStore"
// import { dataStore } from "../hooks/dataStore"

const Visualizer = (props:any) =>{
     if(props.dataset === 'trend')
          return (
               <TestLine
                    data={props.data}
                    setData={props.setData}
                    dimensions={props.dimensions}
               />
          )
     if(props.dataset === 'items')
          return (
               <TestBar
                    data={props.data}
                    setData={props.setData}
                    dimensions={props.dimensions}
               />
          )
     if(props.dataset === 'old')
          return (
               <NewBar
                    data={props.data}
                    setData={props.setData}
                    dimensions={props.dimensions}
               />
          )
     return null
}
const DataTable = (props:any) =>{
     if(props.dataset === 'trend')
          return (
               <div className='table-ish flex flex-col gap-1'>
                    <div className="head-field flex gap-2">
                         <div className="row-1">Date</div>
                         <div className="row-2">Value</div>
                    </div>
                    {props.data.map((data:any, index: any)=>{
                         const formatDate = data.date.toLocaleString("en-GB", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                         });
                         console.log('index: '+index+' date: '+formatDate)
                         return(
                              <div className={`field-${index} flex gap-2`} key={index}>
                                   <div className="row-1">{formatDate.toString()}</div>
                                   <div className="row-2">{data.val}</div>
                              </div>
                         )
                    })}
               </div>
          )
     if(props.dataset === 'items')
          return (
               <div className='table-ish flex flex-col gap-1'>
                    <div className="head-field flex gap-2">
                         <div className="row-1">Index</div>
                         <div className="row-2">Value</div>
                    </div>
                    {props.data.map((data:any, index: any)=>{
                         // console.log('index: '+index+' value: '+data.value)
                         return(
                              <div className={`field-${index} flex gap-2`} key={index}>
                                   <div className="row-1">{index}</div>
                                   <div className="row-2">{data.value}</div>
                              </div>
                         )
                    })}
               </div>
          )
     if(props.dataset === 'old')
          return (
               <div className='table-ish flex flex-col gap-1'>
                    <div className="head-field flex gap-2">
                         <div className="row-1">Name</div>
                         <div className="row-2">Value</div>
                    </div>
                    {props.data.map((data:any, index: any)=>{
                         console.log('index: '+index+' units: '+data.units)
                         return(
                              <div className={`field-${index} flex gap-2`} key={index}>
                                   <div className="row-1">{data.name}</div>
                                   <div className="row-2">{data.units} units</div>
                              </div>
                         )
                    })}
               </div>
          )
     return null
}

export const Project = () =>{
     // const {menu, colorScheme, switchMenu, setScheme} = uiStore();
     // const {dataSet, activeDataSet, addDataSet, setActiveDataSet, setModifyDate, setThumbnail, delDataSet} = dataStore();
     const dimensions = {
          height: 600,
          width: 700,
     }
     const [dataset, setDataset] = useState('items')
     const [data, setData] = useState<any[]>([])
     // const [data, setData] = useState<{ date: Date; val: number }[]>([])
     console.log('dataset at the start is '+dataset)
     
     const updateDataset = (set:string)=>{
          setDataset(set)
          if(set === 'trend'){
               console.log('useEffect has been executed (before) with: '+dataset)
               // setDataset('trend')
               setData([
                    {date: new Date('2022-01-10'), val: 100},
                    {date: new Date('2022-04-10'), val: 150},
                    {date: new Date('2022-07-10'), val: 180},
                    {date: new Date('2022-10-10'), val: 175},
                    {date: new Date('2023-01-10'), val: 200},
                    {date: new Date('2023-04-10'), val: 230},
                    {date: new Date('2023-07-10'), val: 280},
                    {date: new Date('2023-10-10'), val: 240},
               ])
               console.log('useEffect has been executed (after) with: '+dataset)
          }else if(set === 'items'){
               // setDataset('items')
               setData([ {value: 1, fill: 'green'},
                    {value: 2, fill: 'orange'},
                    {value: 3, fill: 'yellow'},
                    {value: 4, fill: 'purple'},
                    {value: 5, fill: 'red'},
                    {value: 6, fill: 'teal'},
                    {value: 7, fill: 'pink'},
                    {value: 8, fill: 'green'},
                    {value: 9, fill: 'orange'} ])
               console.log('useEffect has been executed with: '+dataset)
          }
          if(set === 'old'){
               // setDataset('old')
               setData([
                    {name: 'Afoo', units: 20000, fill: 'green'},
                    {name: 'Efoo', units: 15000, fill: 'orange'},
                    {name: 'Ifoo', units: 40000, fill: 'yellow'},
                    {name: 'Ofoo', units: 6000, fill: 'purple'},
                    {name: 'Ufoo', units: 12000, fill: 'salmon'},
                    {name: 'Yfoo', units: 12000, fill: 'steelblue'},
               ])
               // console.log('useEffect has been executed with: '+dataset)
          }
     }

     useEffect(()=>{
          updateDataset(dataset)
     },[])

     return(
          <div id="project-page" className="h-screen w-screen flex items-center p-2 pt-20">
               <Nav />
               <div className='w-full h-full bg-purple-300 flex flex-col'>
                    <h2>Project</h2>
                    <div className='flex gap-2'>
                         <button className={`${dataset === 'trend'? 'bg-yellow-200':'bg-blue-200'}`}
                              onClick={()=>{
                                   updateDataset('trend')
                                   setDataset('trend')
                                   console.log('dataset changed to: '+dataset)
                              }}
                         >Trend Data</button>
                         <button className={`${dataset === 'items'? 'bg-yellow-200':'bg-blue-200'}`}
                              onClick={()=>{
                                   updateDataset('items')
                                   setDataset('items')
                                   console.log('dataset changed to: '+dataset)
                              }}
                         >Items Relational Data</button>
                         <button className={`${dataset === 'old'? 'bg-yellow-200':'bg-blue-200'}`}
                              onClick={()=>{
                                   updateDataset('old')
                                   setDataset('old')
                              }}
                         >Old Relational Data</button>
                    </div>
                    <DataTable 
                         dataset={dataset}
                         data={data}
                         setData={setData}
                    />
               </div>
               <Visualizer
                    // ref={visRef}
                    dataset={dataset}
                    data={data}
                    setData={setData}
                    dimensions={dimensions}
               />
               {/* <TestLine /> */}
          </div>
     )
}