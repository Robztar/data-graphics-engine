import { useNavigate } from "react-router-dom";

export const Query = () =>{
     const navigate = useNavigate();

     return(
          <div className="query-cont w-1/2 bg-slate-400 h-12 rounded-3xl flex items-center justify-center">
               <input className="rounded-l-lg" type="text" placeholder="Enter Data Here" />
               <button className="rounded-r-lg rounded-l-none bg-teal-500" onClick={()=>{

                    navigate("/proj")
               }}>Enter</button>
          </div>
     )
}