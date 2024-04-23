import { Dash } from "../components/Dash"
import { Nav } from "../components/Nav"
import { Query } from "../components/Query"

export const Dashboard = () =>{
     
     return(
          <div id="dash-page" className="h-screen w-screen flex flex-col items-center p-2 pt-20">
               <Nav />
               <Query />
               <Dash />
          </div>
     )
}