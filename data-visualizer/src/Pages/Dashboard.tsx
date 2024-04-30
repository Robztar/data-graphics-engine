import { Dash } from "../components/Dash"
import { Nav } from "../components/Nav"

export const Dashboard = () =>{
     
     return(
          <div id="dash-page" className="h-screen w-screen flex items-center p-2 pt-20">
               <Nav />
               <Dash />
          </div>
     )
}