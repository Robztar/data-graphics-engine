import { useState } from 'react'
import { Dashboard } from './Dashboard'
import { Welcome } from './Welcome'

import { dataStore } from "../hooks/dataStore"

export const Home = () =>{
     // const {} = dataStore();
     const[member, setMember] = useState(true)
     if(member){
          return(
               <Dashboard />
          )
     }else{
          return(
               <Welcome />
          )
     }
}
