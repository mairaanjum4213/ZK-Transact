import React,  { createContext,useEffect, useContext, useState ,props} from "react";
const Theme = createContext()
export const useTheme = ()=> useContext(Theme)
const ThemeProvider =(props)=>{
   
 


  return(
    <Theme.Provider >
        {props.children}
    </Theme.Provider>
  )


}
export default ThemeProvider