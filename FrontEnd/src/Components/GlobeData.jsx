import React, { useEffect, useMemo, useState } from 'react'

export const Context = React.createContext();


const GlobeData = ({children}) => {

    const [Managers,setMana] = useState([]);
    const [AUsers,setAUsers] = useState([]);
    const [Events,setEvents] = useState([]);
    const [curPage,setPage] = useState("Home");
    // const [CurPage,setCurPage] = useState("Home");
    const [Theme,setTheme] = useState(()=>{const d = localStorage.getItem("Theme");return (d)?JSON.parse(d):true});
    const [LoggedIn,setLI] = useState(()=>{const d = localStorage.getItem('LOGGEDIN');return d?JSON.parse(d):false});
    const [User,setUser] = useState(()=>{const d = localStorage.getItem('USER');return d?JSON.parse(d):null});


    const ContextData = useMemo(()=>{
    return{
        Managers,setMana,AUsers,setAUsers,Events,setEvents,LoggedIn,User,Theme,setTheme,curPage,setPage,
        LOGIN:(data)=>{setUser(data);setLI(true);},
        Update:(data)=>{setUser(data)},
        LOGOUT:()=>{
            setLI(false);
            setUser([]);
        }
    }
    },[Managers,AUsers,Events,LoggedIn,User,Theme,curPage]);

    useEffect(()=>{

      localStorage.setItem('LOGGEDIN',JSON.stringify(LoggedIn));
      localStorage.setItem('USER',JSON.stringify(User));
      localStorage.setItem('Theme', JSON.stringify(Theme));

    },[Theme,LoggedIn,User])


  return (
    <Context.Provider value={ContextData}>
        {children}
    </Context.Provider>
  )
}

export default GlobeData