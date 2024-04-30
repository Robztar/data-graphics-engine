// import { useState } from 'react'
import {Link} from 'react-router-dom'

import { Query } from "./Query"
import { uiStore } from "../hooks/uiStore"
import { dataStore } from "../hooks/dataStore"

export const Dash = () =>{
     // const {menu, colorScheme, switchMenu, setScheme} = uiStore();
     // const {dataSet, activeDataSet, addDataSet, setActiveDataSet, setModifyDate, setThumbnail, delDataSet} = dataStore();

     return(
          <div className="dash-body 
               h-full w-full p-2 pl-8 flex flex-col items-start gap-4"
          >
               <div className='w-full px-8 flex items-center justify-between'>
                    <h1 className='text-4xl h-16 grid content-center'> Your Graphs / Charts</h1>
                    <Query />
               </div>
               
               <div className='dash-chart-cont w-full grid grid-cols-4 justify-items-center gap-y-8'>
                    <Link to="/proj" className="proj-tile-title">
                         <div className="dash-body bg-teal-400 w-56 h-56 rounded-lg cursor-pointer flex items-center justify-center">Hello World</div>
                    </Link>
                    <div className="bg-blue-400 w-56 h-56 rounded-lg">Hello World</div>
                    <div className="bg-blue-400 w-56 h-56 rounded-lg">Hello World</div>
                    <div className="bg-blue-400 w-56 h-56 rounded-lg">Hello World</div>
                    <div className="bg-blue-400 w-56 h-56 rounded-lg">Hello World</div>
                    <div className="bg-blue-400 w-56 h-56 rounded-lg">Hello World</div>
               </div>
               
          </div>
     )
}