import { useState } from 'react'
import { Nav } from "../components/Nav"

import { dataStore } from "../hooks/dataStore"

export const About = () =>{
     // const {} = dataStore();
     
     return(
          <div id="about-page">
               <Nav />
               About World
          </div>
     )
}
