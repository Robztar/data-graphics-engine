import {Link} from 'react-router-dom';

export const Nav = () =>{
     return(
          <div className="nav-cont bg-slate-500 absolute h-16 py-2 px-12 flex items-center justify-between">
               <Link to="/" className="proj-tile-title">
                    <div>Logo/Name/Home</div>
               </Link>
               <div className="flex items-center justify-around gap-8">
                    <Link to="/about" className="proj-tile-title">
                         <div>About</div>
                    </Link>
                    <Link to="/auth" className="proj-tile-title">
                         <div>Auth</div>
                    </Link>
               </div>
               
          </div>
     )
}