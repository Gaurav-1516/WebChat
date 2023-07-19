import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase";


export const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {
    const [currentUser,setCurrentUser] = useState({});

    useEffect(() => {
        const unsub = onAuthStateChanged(auth,(user)=>{
            setCurrentUser(user);
            console.log(user);
        });

        // Whenever using the useEffect also use cleaup function as it may lead to memory leak;
        return () => {
            unsub();
        };
    },[]);

    return(
        <AuthContext.Provider value={{currentUser}}>
            {children}
        </AuthContext.Provider>
    );
};
