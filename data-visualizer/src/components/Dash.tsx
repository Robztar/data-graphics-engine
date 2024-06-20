// import { useState } from 'react'
import {Link} from 'react-router-dom'

import { Query } from "./Query"
// import { uiStore } from "../hooks/uiStore"
import { dataStore, chartStore } from "../hooks/dataStore"

export const Dash = () =>{
     // const {menu, colorScheme, switchMenu, setScheme} = uiStore();
     const {dataset} = dataStore()
     const {chartset} = chartStore()

     let sortedDataList: { key: string, date: Date }[] =[]
     dataset.map((d:any) =>{
          const thisKey = d.key
          const lastModified = new Date(d.lastModified)
          sortedDataList.push({'key':thisKey, 'date':lastModified})
     })
     sortedDataList.sort((a, b) => b.date.valueOf() - a.date.valueOf())
     
     let sortedChartList: { key: string, date: Date }[] =[]
     chartset.map((c:any) =>{
          const thisKey = c.key
          const lastModified = new Date(c.lastModified)
          sortedChartList.push({'key':thisKey, 'date':lastModified})
     })
     sortedChartList.sort((a, b) => b.date.valueOf() - a.date.valueOf())

     return(
          <div className="dash-body 
               h-full w-full p-2 flex flex-col items-start gap-4"
          >
               {/* Dash Header */}
               <div className='w-full px-8 flex items-center justify-between'>
                    <h1 className='text-4xl h-16 grid content-center'> Your Graphs / Charts</h1>
                    <Query />
               </div>
               
               {/* Charts List */}
               <div className='dash-chart-cont w-full grid grid-cols-5 justify-items-center gap-y-8'>
                    {sortedChartList.map((sorted:any) =>{
                         const orderedKey = sorted.key
                         let orderedInst = chartset.find((d:any) => d.key === orderedKey)
                         const projName = 
                              orderedInst.name.charAt(0).toUpperCase() 
                              + orderedInst.name.slice(1)
                         const lastModified = new Date(sorted.date)
                         let dateString: string = ''
                         if(lastModified){
                              let day, month : string = '0'
                              day = lastModified.getDate() < 10 ? 
                                   `0${lastModified.getDate()}` :
                                   lastModified.getDate()
                              month = lastModified.getMonth() < 9 ? 
                                   `0${lastModified.getMonth()+1}` :
                                   `${lastModified.getMonth()+1}` 
                              dateString = day+"/"+ month+"/" 
                              + lastModified.getFullYear()
                         }
                         // const projThumbnail = orderedInst.thumbnail

                         console.log('Name is '+projName)
                         console.log(orderedKey + ' = ' + lastModified);
                         return(
                              <div 
                                   className="dash-card-cont"
                                   key={orderedKey}
                              >
                                   <Link to={`/${'proj?id='+orderedKey}`} className="proj-tile-title">
                                        <div className="dash-body bg-teal-400 w-56 h-56 rounded-lg cursor-pointer flex flex-col items-center justify-center">
                                             <p>{projName}</p>
                                             <small>{dateString}</small>
                                        </div>
                                   </Link>
                              </div>
                         )
                    })}
               </div>

               {/* Dataset List */}
               <div className='w-full px-8 flex items-center justify-between'>
                    <h1 className='text-4xl h-16 grid content-center'>Dataset List</h1>
               </div>
               <div className='dash-chart-cont w-full grid grid-cols-5 justify-items-center gap-y-8'>
                    {sortedDataList.map((sorted:any) =>{
                         const orderedKey = sorted.key
                         let orderedInst = dataset.find((d:any) => d.key === orderedKey)
                         const projName = 
                              orderedInst.name.charAt(0).toUpperCase() 
                              + orderedInst.name.slice(1)
                         const lastModified = new Date(sorted.date)
                         let dateString: string = ''
                         if(lastModified){
                              let day, month : string = '0'
                              day = lastModified.getDate() < 10 ? 
                                   `0${lastModified.getDate()}` :
                                   lastModified.getDate()
                              month = lastModified.getMonth() < 9 ? 
                                   `0${lastModified.getMonth()+1}` :
                                   `${lastModified.getMonth()+1}` 
                              dateString = day+"/"+ month+"/" 
                              + lastModified.getFullYear()
                         }

                         console.log('Name is '+projName)
                         console.log(orderedKey + ' = ' + lastModified);
                         return(
                              <div 
                                   className="dash-card-cont"
                                   key={orderedKey}
                              >
                                   <Link to={`/${'setup?id='+orderedKey}`} className="proj-tile-title">
                                        <div className="dash-body bg-teal-400 w-56 h-56 rounded-lg cursor-pointer flex flex-col items-center justify-center">
                                             <p>{projName}</p>
                                             <small>{dateString}</small>
                                        </div>
                                   </Link>
                              </div>
                         )
                    })}
               </div>
               
          </div>
     )
}