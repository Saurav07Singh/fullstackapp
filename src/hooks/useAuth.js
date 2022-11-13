import { useContext } from "react";
import AppContext from "../context/AppProvider";

const useAuth= ()=>{
    return useContext(AppContext);
}

export default useAuth;