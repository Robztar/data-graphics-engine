import { Dash } from "../components/Dash"
import { Nav } from "../components/Nav"

export const Dashboard = () =>{
     
     return(
          <div id="dash-page" className="h-full w-full flex items-center p-2 pt-20">
               <Nav />
               <Dash />
          </div>
     )
}