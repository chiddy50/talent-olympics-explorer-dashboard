"use client"

import { createContext, useContext, useState, useEffect } from "react";

export const AppContext = createContext();

export function MainContext({ children }) {
    const [singleTransaction, setSingleTransaction] = useState([]);


    return (
        <AppContext.Provider value={{ 
            singleTransaction, setSingleTransaction,
            
        }}>
            {children}
        </AppContext.Provider>
    );
}