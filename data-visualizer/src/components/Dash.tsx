// import { useState } from 'react';
import {Link} from 'react-router-dom';

import { uiStore } from "../hooks/uiStore"
import { dataStore } from "../hooks/dataStore"

export const Dash = () =>{
     // const {menu, colorScheme, switchMenu, setScheme} = uiStore();
     // const {dataSet, activeDataSet, addDataSet, setActiveDataSet, setModifyDate, setThumbnail, delDataSet} = dataStore();

     return(
          <div className="dash-body h-full w-full p-2 flex items-start justify-center flex-wrap gap-12">
               <Link to="/edit" className="proj-tile-title">
                    <div className="dash-body bg-teal-400 w-56 h-56 rounded-lg cursor-pointer">Hello World</div>
               </Link>
               <div className="dash-body bg-blue-400 w-56 h-56 rounded-lg">Hello World</div>
               <div className="dash-body bg-blue-400 w-56 h-56 rounded-lg">Hello World</div>
               <div className="dash-body bg-blue-400 w-56 h-56 rounded-lg">Hello World</div>
               <div className="dash-body bg-blue-400 w-56 h-56 rounded-lg">Hello World</div>
               <div className="dash-body bg-blue-400 w-56 h-56 rounded-lg">Hello World</div>
          </div>
     )
}