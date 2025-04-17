import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
export default function AccountNavigation() {
  const { } = useSelector((state: any) => state.accountReducer);
  const { currentUser } = useSelector((state: any) => state.accountReducer);
 const { pathname } = useLocation();
 const active = (path: string) => (pathname.includes(path) ? "active" : "");
  return (
    <div id="wd-account-navigation" className="wd list-group fs-5 rounded-0">
      
      <Link to={`/Kambaz/Account/Signin`}  
      className="list-group-item active border border-0" > Signin  
      </Link>
      <Link to={`/Kambaz/Account/Signup`} 
       className="list-group-item text-danger border border-0" > Signup  
       </Link> 
      <Link to={`/Kambaz/Account/Profile`}  className="list-group-item text-danger border border-0">
       Profile </Link>
       {currentUser && currentUser.role === "ADMIN" && (
       <Link to={`/Kambaz/Account/Users`} className={`list-group-item ${active("Users")}`}> Users </Link> )}
       
       
       
    </div>
);}

  