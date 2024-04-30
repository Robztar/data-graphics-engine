import { Nav } from "../components/Nav"

// import { uiStore } from "../hooks/uiStore"
// import { dataStore } from "../hooks/dataStore"

export const Survey = () =>{
     
     return(
          <div id="dash-page" className="h-screen w-screen flex items-center p-2 pt-20">
               <Nav />
               <div className="dash-body h-full w-full p-2 pl-8 flex">
                    
                    <h1 className='text-4xl w-1/4 h-16 rounded-lg'>Survey 1</h1>
                    <div className='dash-chart-cont w-full flex bg-yellow-600'>
                         here
                    </div>
               </div>
          </div>
     )
}