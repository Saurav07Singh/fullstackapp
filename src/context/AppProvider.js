import { createContext ,useState} from "react"

const AppContext = createContext();


export const AppProvider=({children})=>{
    const [auth,setAuth]= useState({})
    return (
        <AppContext.Provider value={{auth,setAuth}}>{children}</AppContext.Provider>
    )

}

export default AppContext