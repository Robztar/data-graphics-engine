import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Query = () =>{
     const [active, setActive] = useState(false)
     const navigate = useNavigate()

     return(
          <div className='flex'>
               {/* Create Button */}
               <div className="query-btn-cont w-fit bg-cyan-400 rounded-3xl flex items-center justify-center cursor-pointer px-4 py-2 gap-4"
                    onClick={()=>{
                         setActive(true)
                    }}
               >
                    <i className="fa fa-plus-circle"></i>
                    <p>Create Chart/Graph Btn</p>
               </div>

               {/* Create Wizard */}
               <div className={`
                    query-float-cont ${active? 'h-full w-full active':'h-0 w-0'} 
                    absolute top-0 left-0`
               }>
                    <div className="float-bg-blur h-full w-full bg-slate-800 bg-opacity-60 backdrop-blur-sm"
                         onClick={()=>{
                              setActive(false)
                         }}
                    ></div>
                    {/* Wizard Body */}
                    <div className={`
                              query-float-body ${active? 'h-3/4 w-3/4 p-2 active':'h-0 w-0'} 
                              absolute bg-white rounded-3xl flex flex-col items-center justify-start gap-4`
                         }
                    >
                         {/* Wizard Head */}
                         <div className="w-full px-2 flex items-center border-b-red-200 border-b-2">
                              <h1 className={`${active? 'h-10 w-full text-2xl':'h-0 w-0'}
                                   text-right rounded-lg bg-yellow-50
                              `}> Create New Viz</h1>
                              <i className="fa fa-times-circle-o text-3xl cursor-pointer"
                                   onClick={()=>{
                                        setActive(false)
                                   }}
                              ></i>
                         </div>
                         
                         {/* Wizard I/O */}
                         <div className="w-full flex items-center justify-center gap-1">
                              <input className="rounded-l-lg border-2 border-teal-500" type="text" placeholder="Enter Data Here" />
                              <button 
                                   className="rounded-r-lg rounded-l-none border-2 border-teal-500" 
                                   onClick={()=>{
                                        // Something...
                                        setActive(false)
                                        navigate("/proj")
                                   }}
                              >Enter</button>
                         </div>
                         <button
                              onClick={()=>{
                                   setActive(false)
                                   navigate("/survey")
                              }}
                         >Create Survey</button>
                    </div>
                    
               </div>
               
          </div>
     )
}