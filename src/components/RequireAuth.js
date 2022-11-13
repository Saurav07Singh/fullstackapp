import { useLocation,Outlet,Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";


const ReqiureAuth =()=>{
    const {auth}=useAuth();
   // console.log(auth)
    const location= useLocation();

    return (
        auth?.data 
        ? <Outlet />
        : <Navigate to="/" state={{from : location}} replace />
    )
}

export default ReqiureAuth