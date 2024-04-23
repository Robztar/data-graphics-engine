// import { useState } from 'react';
import { Nav } from "../components/Nav"

import { uiStore } from "../hooks/uiStore"
import { dataStore } from "../hooks/dataStore"

export const Edit = () =>{
     // const {menu, colorScheme, switchMenu, setScheme} = uiStore();
     // const {dataSet, activeDataSet, addDataSet, setActiveDataSet, setModifyDate, setThumbnail, delDataSet} = dataStore();

     return(
          <div id="edit-page" className="h-screen w-screen flex flex-col items-center p-2 pt-20 bg-yellow-600 bg-opacity-50">
               <Nav />
               <div>Edit World</div>
          </div>
     )
}